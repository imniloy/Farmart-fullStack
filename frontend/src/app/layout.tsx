import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/redux/provider";
import { inter, poppins } from "./fonts";
import Header from "@/components/Header";
import DownloadBanner from "@/components/DownloadBanner";
import Footer from "@/components/Footer";
import AuthMadal from "@/components/madal/AuthMadal";
import CartSlider from "@/components/madal/Cart";
import { ToastContainer } from "react-toastify";
// if the react-toastify gives any error just comment out ReactToastify.css file and comment the ReactToastify.min.css file ...
// import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
  title: "Farmart - Leading Grocery App",
  description:
    "Farmart - Leading Grocery App in Bangladesh developed by Niloy Kumar Das",
  icons: "./favicon.ico",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${poppins.className} ${inter.variable}`}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="relative">
            <AuthMadal />
            <CartSlider />
            <Header />
            {children}
            <DownloadBanner />
            <Footer />
            <ToastContainer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
