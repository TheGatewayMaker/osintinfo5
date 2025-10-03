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
    const profile: UserProfile = {
      uid,
      email,
      name,
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
