import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);


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

          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="grid gap-4">
            <Button
              variant="secondary"
              className="w-full bg-white text-black hover:opacity-90 border border-border dark:bg-white dark:text-black flex items-center justify-center gap-2"
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
              {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
