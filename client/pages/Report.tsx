import Layout from "@/components/layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const query: string | undefined = state?.query;
  const result: any = state?.result;

  if (!state) {
    // If accessed directly, go back to home
    navigate("/");
    return null;
  }

  const hasResults = Array.isArray(result)
    ? result.length > 0
    : result && typeof result === "object"
      ? Object.keys(result).length > 0
      : typeof result === "string"
        ? result.trim().length > 0 && !/no results/i.test(result)
        : false;

  function downloadJson() {
    const data = { query, result, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `osint-info-report-${query ?? "report"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Layout>
      <section className="container mx-auto py-8">
        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-foreground/60">Osint Info Report</div>
              <h1 className="text-2xl font-black mt-1">Query results</h1>
              <p className="mt-1 text-foreground/70">Query: <span className="font-mono">{query}</span></p>
              <p className="mt-1 text-sm text-foreground/60">Generated: {new Date().toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate(-1)} variant={"secondary"} className="h-10">
                Back
              </Button>
              <Button onClick={downloadJson} className="h-10">
                Download JSON
              </Button>
            </div>
          </div>

          <div className="mt-6">
            {hasResults ? (
              typeof result === "string" ? (
                <pre className="overflow-auto rounded-xl border border-border bg-card/80 p-4 text-left whitespace-pre-wrap">
                  {result}
                </pre>
              ) : (
                <pre className="overflow-auto rounded-xl border border-border bg-card/80 p-4 text-left">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-semibold">No results found</p>
                <p className="mt-2 text-sm text-foreground/60">Try refining your query or check other data sources.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
