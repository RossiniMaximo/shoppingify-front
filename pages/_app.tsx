import "../styles/global.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
}

export default MyApp;
