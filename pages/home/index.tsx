import { Layout } from "components/layout";
import { HomeContent } from "components/homeContent";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ minHeight: "700px" }}>
        <Layout />
      </div>
      <HomeContent />
    </div>
  );
}
