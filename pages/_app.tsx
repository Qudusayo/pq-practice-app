import { SwitchProvider } from "../context/shuffleContext";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SwitchProvider>
        <Component {...pageProps} />
      </SwitchProvider>
    </>
  );
}
