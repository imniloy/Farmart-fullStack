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
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Farmart - Leading Grocery App",
  description:
    "Farmart - Leading Grocery App in Bangladesh developed by Niloy Kumar Das",
  icons: "./favicon.ico",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
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

export default RootLayout;
