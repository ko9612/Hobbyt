import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import TopButton from "../src/components/Button/TopButton";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <div
        className={`${
          !router.pathname.includes("/oauth") &&
          "max-w-[80rem] md:w-full sm:w-full h-screen"
        } m-auto`}
      >
        <Component {...pageProps} />
        <TopButton />
      </div>
    </RecoilRoot>
  );
}
