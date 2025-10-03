import Layout from "@/components/layout/Layout";

export default function Shop() {
  return (
    <Layout>
      <section className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-black">Shop</h1>
        <p className="mt-2 text-foreground/70 max-w-2xl mx-auto">
          Packages and purchase flow will appear here. After connecting
          Firebase, purchases will auto-increase credits and auto-fill your
          Unique Purchase ID.
        </p>
      </section>
    </Layout>
  );
}
