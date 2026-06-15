import { Quicksand } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Manasitra | Your Private AI Companion",
  description: "Manasitra is your anonymous, judgment-free AI companion designed to help you navigate life's challenges.",
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
