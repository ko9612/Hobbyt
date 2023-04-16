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
          "max-w-[80rem] md:w-full sm:max-w-[80rem] sm:border-yellow-500 md:border-green-500 lg:border-blue-500 xl:border-purple-500 h-screen"
        } m-auto border-4 border-red-500`}
        // className="max-w-[24rem] sm:max-w-[40rem] sm:border-purple-500 md:border-black h-screen m-auto border-4 border-orange-500"
      >
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
