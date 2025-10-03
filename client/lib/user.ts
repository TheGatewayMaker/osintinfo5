import { getDbInstance } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  increment,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export type UserProfile = {
  uid: string;
  email: string | null;
  name: string | null;
  username?: string;
  role?: "user" | "admin";
  uniquePurchaseId: string;
  freeSearches: number;
  purchasedSearches: number;
  usedSearches: number;
  totalSearchesRemaining: number;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function db() {
  return getDbInstance();
}

function baseFromEmail(email: string) {
  const local = email.split("@")[0] || "user";
  const cleaned = local.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return cleaned || "user";
}

async function findUniqueUsername(base: string): Promise<string> {
  const _db = db();
  let candidate = base;
  let i = 1;
  // Check existence by querying username equality
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const q = collection(_db, "users");
    const { getDocs, where, query, limit } = await import("firebase/firestore");
    const snap = await getDocs(query(q, where("username", "==", candidate), limit(1)));
    if (snap.empty) return candidate;
    i += 1;
    candidate = `${base}${i}`;
    if (i > 1000) return `${base}-${cryptoRandomSuffix()}`;
  }
}

function cryptoRandomSuffix() {
  try {
    const arr = new Uint32Array(1);
    // @ts-ignore
    (globalThis.crypto || (window as any).crypto).getRandomValues(arr);
    return (arr[0] % 100000).toString().padStart(5, "0");
  } catch {
    return Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  }
}

export async function ensureUserDoc(
  uid: string,
  email: string | null,
  name: string | null,
) {
  const _db = db();
  const ref = doc(collection(_db, "users"), uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const uniquePurchaseId = uuidv4();
    let username: string | undefined = undefined;
    if (email) {
      const base = baseFromEmail(email);
      username = await findUniqueUsername(base);
    }
    const profile: UserProfile = {
      uid,
      email,
      name,
      username,
      role: "user",
      uniquePurchaseId,
      freeSearches: 3,
      purchasedSearches: 0,
      usedSearches: 0,
      totalSearchesRemaining: 3,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, profile);
    return profile;
  } else {
    const existing = snap.data() as UserProfile;
    if (!existing.username && email) {
      const base = baseFromEmail(email);
      const username = await findUniqueUsername(base);
      await updateDoc(ref, { username, updatedAt: serverTimestamp() });
      return { ...existing, username } as UserProfile;
    }
  }
  return snap.data() as UserProfile;
}

export async function incrementPurchasedSearches(uid: string, amount: number) {
  const _db = db();
  const ref = doc(_db, "users", uid);
  await updateDoc(ref, {
    purchasedSearches: increment(amount),
    totalSearchesRemaining: increment(amount),
    updatedAt: serverTimestamp(),
  });
}

export async function consumeSearchCredit(uid: string, count = 1) {
  const _db = db();
  const ref = doc(_db, "users", uid);
  await updateDoc(ref, {
    usedSearches: increment(count),
    totalSearchesRemaining: increment(-count),
    updatedAt: serverTimestamp(),
  });
}
