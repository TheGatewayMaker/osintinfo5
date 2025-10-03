import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(name, email, password);
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed");
    }
  }

  return (
    <Layout>
      <section className="container mx-auto py-12">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded p-1 bg-accent">
              <button
                onClick={() => setMode("signin")}
                className={`px-3 py-1 rounded ${mode === "signin" ? "bg-background shadow" : ""}`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`px-3 py-1 rounded ${mode === "signup" ? "bg-background shadow" : ""}`}
              >
                Sign up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === "signup" && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-md border border-input bg-background px-3 py-2" />
              </div>
            )}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="rounded-md border border-input bg-background px-3 py-2" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">{mode === "signin" ? "Sign in" : "Create account"}</Button>
          </form>

          <div className="my-4 h-px bg-border" />
          <Button variant="secondary" className="w-full" onClick={() => signInWithGoogle()}>Continue with Google</Button>
        </div>
      </section>
    </Layout>
  );
}
