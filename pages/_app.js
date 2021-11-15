import "../styles/globals.css";
import "antd/dist/antd.css";
import { ContextProvider } from "../context/Context";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ContextProvider>
  );
}

export default MyApp;
