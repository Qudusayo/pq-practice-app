import NProgress from "nprogress";
import { Router } from "next/router";
import type { AppProps } from "next/app";

import { SwitchProvider } from "../context/shuffleContext";

import "../styles/globals.scss";
import "../styles/Nprogress.scss";

// Router Events
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SwitchProvider>
        <Component {...pageProps} />
      </SwitchProvider>
    </>
  );
}
