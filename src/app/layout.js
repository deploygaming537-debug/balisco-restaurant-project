import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthGuard from "./_components/auth/AuthGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./_components/layout/Header";
// import Footer from "./_components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "Restaurant",
  description: "Food Delivery App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
         <head>
         <link rel="stylesheet" href="/app/bootstrap/css/bootstrap.css" />
      <link rel="stylesheet" href="/app/dist/app.css" />
    </head>

      <body>
       <AuthGuard>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
       </AuthGuard>
        </body>
    </html>
  );
}
