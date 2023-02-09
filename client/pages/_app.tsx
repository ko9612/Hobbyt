import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
// import NoticeModal from "../src/components/Modal/NoticeModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="max-w-[80rem] m-auto border-4 border-blue-500">
        {/* <NoticeModal /> */}
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
