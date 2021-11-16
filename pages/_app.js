import "../styles/globals.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "../context/Context";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import { ToastContainer, toast } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Header />
      <ToastContainer position="bottom-center" />
      <Component {...pageProps} />
      <Footer />
    </ContextProvider>
  );
}

export default MyApp;
