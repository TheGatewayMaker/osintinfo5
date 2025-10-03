import Layout from "@/components/layout/Layout";
import { useSearchParams } from "react-router-dom";

export default function Databases() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  return (
    <Layout>
      <section className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-black">Databases</h1>
        {q && (
          <p className="mt-2">
            Searching for: <span className="font-bold">{q}</span>
          </p>
        )}
        <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
          Search functionality requires configuring the LeakOSINT API token and
          enabling Firestore to track remaining searches. Connect your
          credentials and I will wire this page to fetch and display structured
          results with PDF export.
        </p>
      </section>
    </Layout>
  );
}
