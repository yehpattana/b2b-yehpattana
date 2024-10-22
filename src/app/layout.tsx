"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "../recoil/recoilContextProvider";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "B2B Yehpattana",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          {children}
          <ToastContainer />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
