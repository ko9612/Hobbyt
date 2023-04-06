import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
// import NoticeModal from "../src/components/Modal/NoticeModal";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <RecoilRoot>
      <div
        className={`${
          !router.pathname.includes("/oauth") &&
          "max-w-[80rem] md:w-full sm:w-full sm:border-purple-500 md:border-black h-screen"
        } m-auto border-4`}
      >
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
