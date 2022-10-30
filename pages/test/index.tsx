import { Layout } from "components/layout";
import { UploadImage } from "components/uploadImage";

export default function TestPage() {
  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Layout />
      <UploadImage />
    </div>
  );
}
