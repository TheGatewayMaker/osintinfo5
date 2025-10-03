import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PLANS = [
  { searches: 30, prices: { inr: "₹132", pkr: "₨432", usd: "$2" } },
  { searches: 50, prices: { inr: "₹224", pkr: "₨734", usd: "$3" } },
  { searches: 100, prices: { inr: "₹449", pkr: "₨1,454", usd: "$5" } },
  { searches: 150, prices: { inr: "₹674", pkr: "₨2,174", usd: "$8" } },
  { searches: 200, prices: { inr: "₹899", pkr: "₨2,894", usd: "$10" } },
  { searches: 300, prices: { inr: "₹1,349", pkr: "₨4,349", usd: "$16" } },
];

export default function Shop() {
  return (
    <Layout>
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.500/10),transparent_50%)]" />
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Shop</h1>
            <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">
              Choose a searches package to increase your remaining searches instantly after purchase.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((p) => (
              <Card key={p.searches} className="rounded-2xl border border-border bg-card/80 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10 backdrop-blur">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {p.searches} searches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-center text-foreground/80">
                    <div>
                      <span className="font-semibold">{p.prices.inr}</span> <span className="text-foreground/60">/ INR</span>
                    </div>
                    <div>
                      <span className="font-semibold">{p.prices.pkr}</span> <span className="text-foreground/60">/ PKR</span>
                    </div>
                    <div>
                      <span className="font-semibold">{p.prices.usd}</span> <span className="text-foreground/60">/ USD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
