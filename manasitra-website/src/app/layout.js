import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Mansitra — Your Private AI Emotional Companion",
  description: "Mansitra (Mann Ka Mitra) is a 100% anonymous, judgment-free, and multilingual AI emotional companion built specifically for Indian students to navigate exam pressure, placement anxiety, and mental health challenges.",
  keywords: [
    "Mansitra",
    "Mann Ka Mitra",
    "AI Companion",
    "Mental Health AI",
    "Student Mental Health India",
    "Anonymous AI Chatbot",
    "Viksit Bharat Ideathon",
    "Indian Student Support",
    "Stress Relief Mini Games",
    "Multilingual AI Companion",
    "Yash Patadiya",
    "utkarsh barad"
  ],
  authors: [{ name: "Yash Patadiya", url: "https://github.com/yashpatadiya1724-cmyk" }],
  creator: "Yash Patadiya",
  publisher: "Yash Patadiya",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Mansitra — Your Private AI Emotional Companion",
    description: "An anonymous, judgment-free, and multilingual AI companion built specifically for Indian students to navigate exam pressure, placement anxiety, and mental health challenges.",
    url: "https://mansitra-app.vercel.app",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Mansitra Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mansitra — Your Private AI Emotional Companion",
    description: "An anonymous, judgment-free, and multilingual AI companion built specifically for Indian students.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mansitra",
    "operatingSystem": "Android",
    "applicationCategory": "HealthApplication",
    "downloadUrl": "https://mansitra-app.vercel.app/mansitra.apk",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "An anonymous, judgment-free, and multilingual AI emotional companion built specifically for Indian students to navigate exam pressure, placement anxiety, and mental health challenges.",
    "author": {
      "@type": "Person",
      "name": "Yash Patadiya",
      "url": "https://github.com/yashpatadiya1724-cmyk"
    }
  };

  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BHJWHETVNT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BHJWHETVNT');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
