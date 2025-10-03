import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const { signInWithGoogle, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.500/10),transparent_50%)]" />
        <div className="container mx-auto">
          <div className="mx-auto max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-black tracking-tight">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm text-foreground/60">
                {mode === "signin"
                  ? "Sign in to continue your searches"
                  : "Sign up to start searching securely"}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10 backdrop-blur p-6">
              <div className="flex justify-center mb-5">
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

              {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

              <form onSubmit={onSubmit} className="grid gap-4">
                {mode === "signup" && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 rounded-xl"
                >
                  {loading
                    ? "Please wait…"
                    : mode === "signin"
                      ? "Sign in"
                      : "Sign up"}
                </Button>
              </form>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-3">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-black hover:opacity-90 border border-border dark:bg-white dark:text-black flex items-center justify-center gap-2 h-11 rounded-xl"
                  onClick={() => signInWithGoogle()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303C33.173,32.659,29.005,36,24,36c-6.627,0-12-5.373-12-12  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,16.041,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.005,0,9.787-1.997,13.303-5.243l-6.146-5.195C29.109,35.091,26.66,36,24,36  c-5.005,0-9.173-3.341-10.651-7.917l-6.571,5.061C9.656,39.663,16.318,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.083,3.163-3.313,5.658-6.146,7.043l0.001-0.001l6.146,5.195  C33.707,41.637,44,36,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  {mode === "signin"
                    ? "Sign in with Google"
                    : "Sign up with Google"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
