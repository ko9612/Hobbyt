import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-[80rem] m-auto border-4 border-blue-500">
      <Component {...pageProps} />
    </div>
  );
}
