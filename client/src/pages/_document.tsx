import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { NextPageContext } from "next";
import { darkTheme, lightTheme } from "src/assets/styles/colors.css";
import { GA_TRACKING_ID } from "src/lib/gtag";
import { IncomingMessage } from "http";

class MyDocument extends Document {
  state = {
    isDarkTheme: false,
  };
  static async getInitialProps(ctx: DocumentContext) {
    const { req } = ctx;
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className={this.state.isDarkTheme ? darkTheme : lightTheme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
