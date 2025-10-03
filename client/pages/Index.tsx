import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

export default function Index() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSearch() {
    if (!query.trim()) return;
    navigate(`/databases?q=${encodeURIComponent(query.trim())}`);
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
            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl border border-border bg-card/80 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10 backdrop-blur p-2 md:p-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter an email, phone, IP, domain, keyword…"
                  className="w-full rounded-xl bg-transparent px-4 py-5 text-lg outline-none"
                />
              </div>
              <Button
                onClick={onSearch}
                className="h-14 text-base rounded-xl hover:scale-[1.02]"
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
