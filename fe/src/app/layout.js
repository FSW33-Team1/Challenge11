"use client";
import Footer from "@/components/layouts/footer/page";
import Navbar from "@/components/layouts/navbar/page";
import { SessionProvider } from "@/lib/session-provider";
import { Inter } from "next/font/google";
import "../css/custom.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FSW33 Team 1 - Challenge 10",
  description: "Redux & SSR",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
