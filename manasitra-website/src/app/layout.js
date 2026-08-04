import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "./providers/i18n-provider";
import SmoothScroll from "../components/animations/SmoothScroll";
import CustomCursor from "../components/animations/CustomCursor";
import MobileBottomBar from "../components/ui/MobileBottomBar";
import { ThemeProvider } from "../context/ThemeContext";

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
    url: "https://mansitra.in",
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mansitra",
      "operatingSystem": "Android",
      "applicationCategory": "HealthApplication",
      "downloadUrl": "https://mansitra.in/mansitra.apk",
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
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Yash Patadiya",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "ManSitra"
      },
      "url": "https://mansitra.in/about",
      "sameAs": [
        "https://linkedin.com/",
        "https://github.com/yashpatadiya1724-cmyk",
        "https://instagram.com/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ManSitra",
      "url": "https://mansitra.in",
      "logo": "https://mansitra.in/logo.svg",
      "founder": {
        "@type": "Person",
        "name": "Yash Patadiya"
      },
      "sameAs": [
        "https://linkedin.com/",
        "https://github.com/yashpatadiya1724-cmyk",
        "https://instagram.com/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "About Us",
          "url": "https://mansitra.in/about"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Features & Tools",
          "url": "https://mansitra.in/services"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Contact Us",
          "url": "https://mansitra.in/contact"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Privacy Policy",
          "url": "https://mansitra.in/privacy-policy"
        }
      ]
    }
  ];

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
        <I18nProvider>
          <ThemeProvider>
            <SmoothScroll>
              <CustomCursor />
              <MobileBottomBar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
