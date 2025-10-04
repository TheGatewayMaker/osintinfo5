import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Index() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  async function onSearch() {
    if (!query.trim()) return;
    if (!user) {
      toast.error("Please sign in to search.");
      navigate("/auth");
      return;
    }

    const remaining = profile?.totalSearchesRemaining ?? 0;
    if (!Number.isFinite(remaining) || remaining <= 0) {
      toast.error("No searches remaining. Please purchase more.");
      navigate("/shop");
      return;
    }

    try {
      const r = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const contentType = r.headers.get("content-type") || "";
      if (!r.ok) {
        const text = await r.text();
        toast.error(text || `Search failed (${r.status}).`);
        return;
      }
      let data: any = null;
      if (contentType.includes("application/json")) {
        data = await r.json();
      } else {
        data = await r.text();
      }

      // determine if there are results and consume credit if so
      const hasResults = Array.isArray(data)
        ? data.length > 0
        : data && typeof data === "object"
          ? Object.keys(data).length > 0
          : typeof data === "string"
            ? data.trim().length > 0 && !/no results/i.test(data)
            : false;

      if (hasResults) {
        try {
          const { consumeSearchCredit } = await import("@/lib/user");
          await consumeSearchCredit(user.uid, 1);
        } catch (e) {
          console.warn("Failed to deduct search credit:", e);
        }
      }

      navigate("/report", { state: { query: query.trim(), result: data } });
    } catch (e: any) {
      toast.error(e?.message || "Search error.");
    }
  }

  return (
    <Layout>
      <section className="relative flex items-center justify-center py-24 md:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.500/10),transparent_50%)]" />
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Check if your data has been leaked
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              You can search Phone Numbers, Emails, Full Names, IP addresses,
              Domains, Keywords…
            </p>
            <p className="mt-2 text-sm text-foreground/60">
              Privacy-first search. We don’t store queries. Try emails, phones,
              usernames, IPs, or domains.
            </p>
            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl border border-border bg-card/80 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10 backdrop-blur p-2 md:p-3">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter an email, phone, IP, domain, keyword…"
                  className="w-full h-11 md:h-12 rounded-xl bg-transparent px-4 text-base outline-none"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") onSearch();
                  }}
                />
              </div>
              <Button
                onClick={onSearch}
                className="h-12 text-base rounded-xl hover:scale-[1.02]"
              >
                Search
              </Button>
              <p className="text-xs text-foreground/60">
                1 request/second per IP. Complex queries may take longer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto pb-16">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              title: "Secure",
              desc: "Modern security best-practices with auth and role-based access.",
            },
            {
              title: "Accurate",
              desc: "Aggregated breach indexes for reliable results.",
            },
            {
              title: "Fast",
              desc: "Optimized queries and caching for snappy performance.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card/80 p-6 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10 backdrop-blur"
            >
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
