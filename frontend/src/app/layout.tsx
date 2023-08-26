import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/redux/provider";
import { inter, poppins } from "./fonts";
import Header from "@/components/Header";
import DownloadBanner from "@/components/DownloadBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Farmart - Leading Grocery App",
  description:
    "Farmart - Leading Grocery App in Bangladesh developed by Niloy Kumar Das",
  icons: "./favicon.ico",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${poppins.className} ${inter.variable}`}>
    <body>
      <Providers>
        <Header />
        {children}
        <DownloadBanner />
        <Footer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;