import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import "src/assets/styles/styles.css";
import React from "react";
import wrapper from "src/store/configureStore";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { useRouter } from "next/router";
import * as gtag from "src/lib/gtag";

function MyApp(ctx: AppProps) {
  const { Component, pageProps } = ctx;

  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);

  return { ...appProps, localeCustom: "en" };
};

export default wrapper.withRedux(appWithTranslation(MyApp));
