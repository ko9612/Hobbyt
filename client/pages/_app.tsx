import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="max-w-[80rem] m-auto border-4 border-blue-500">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
