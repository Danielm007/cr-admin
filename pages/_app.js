import "../styles/globals.css";
import "antd/dist/antd.css";
import { ContextProvider } from "../context/Context";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ContextProvider>
  );
}

export default MyApp;
