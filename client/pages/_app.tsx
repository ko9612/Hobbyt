import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import * as gtag from "../src/util/gtag";
// import NoticeModal from "../src/components/Modal/NoticeModal";

export default function App({ Component, pageProps }: AppProps) {
  // GA 설정 시작
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  // GA 설정 끝

  return (
    <RecoilRoot>
      {/* GA 설정 시작 */}
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      {/* GA 설정 끝 */}
      <div
        className={`${
          !router.pathname.includes("/oauth") && "max-w-[80rem]"
        } m-auto`}
      >
        {/* <NoticeModal /> */}
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
