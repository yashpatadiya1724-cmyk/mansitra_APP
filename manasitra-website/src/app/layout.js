import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "./providers/i18n-provider";
import SmoothScroll from "../components/animations/SmoothScroll";
import CustomCursor from "../components/animations/CustomCursor";
import MobileBottomBar from "../components/ui/MobileBottomBar";
import { ThemeProvider } from "../context/ThemeContext";
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/site-config";
import { faqData } from "@/lib/faq-data";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Mansitra" },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Yash Patadiya", url: "https://www.linkedin.com/in/yash-patadiya-973161272/" }],
  creator: "Yash Patadiya",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: SITE_NAME, url: SITE_URL, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, locale: "en_IN", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mansitra private AI companion" }] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: ["/twitter-image"] },
};

const jsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, description: DEFAULT_DESCRIPTION, inLanguage: ["en"], publisher: { "@id": `${SITE_URL}/#organization` } },
  { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png`, description: "A student wellbeing platform offering supportive AI tools and practical resources.", founder: { "@type": "Person", name: "Yash Patadiya", url: "https://github.com/yashpatadiya1724-cmyk" }, sameAs: ["https://www.linkedin.com/in/yash-patadiya-973161272/", "https://github.com/yashpatadiya1724-cmyk", "https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5"] },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: SITE_NAME, operatingSystem: "Web, Android", applicationCategory: "HealthApplication", downloadUrl: `${SITE_URL}/mansitra.apk`, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, description: DEFAULT_DESCRIPTION, author: { "@type": "Person", name: "Yash Patadiya", url: "https://github.com/yashpatadiya1724-cmyk" }, inLanguage: ["en"] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqData.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
];

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        {gaId ? <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}</Script>
        </> : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <I18nProvider><ThemeProvider><SmoothScroll><CustomCursor /><MobileBottomBar />{children}</SmoothScroll></ThemeProvider></I18nProvider>
      </body>
    </html>
  );
}
