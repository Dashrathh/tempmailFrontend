import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.tempmail.sbs"),
  title: {
    default:
      "Free Temp Mail | Instant Disposable Email Address - No Signup | TempMail.sbs",
    template: "%s | TempMail.sbs",
  },
  description:
    "Create a FREE temporary email at TempMail.sbs in 5 seconds! Avoid spam, protect your privacy, and stay anonymous. No registration required - 100% secure.",
  keywords: [
    "temp mail",
    "disposable email",
    "temporary email",
    "free temporary email",
    "10 minute mail",
    "burner email",
    "anonymous email",
    "fake email generator",
    "spam protection email",
    "email forwarder",
    "private email",
    "secure temp mail",
    "instant email",
    "no signup email",
    "throwaway email",
    "one-time email",
    "email masking",
    "privacy email service",
    "temporary inbox",
    "email verification bypass",
    "temp mail for signup",
    "disposable email address",
    "free anonymous email",
    "temp-gmail",
    "temporary email service",
  ],
  openGraph: {
    type: "website",
    title: "Free Temp Mail  Best Disposable Email Service",
    description:
      "Get a temporary email instantly. No signup, no spam!",
    images: [
      {
        url: "https://www.tempmail.sbs/tempu.png",
        alt: "tempMail",
      },
    ],
    url: "https://www.tempmail.sbs",
    siteName: "TempMail.sbs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Temp Mail in 5 Seconds",
    images: {
      url: "https://www.tempmail.sbs/tempu.png",
      alt: "tempMail",
    },
  },
  alternates: {
    canonical: "https://www.tempmail.sbs/",
  },
  verification: {
    other: {
      "msvalidate.01": "21A410411AE22B61FE6ABC7FFB317820",
    },
  },
  icons: {
    icon: "/faviconEmail.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "TempMail.sbs",
              description:
                "Instant disposable email service for spam-free signups.",
              url: "https://www.tempmail.sbs",
              offers: {
                "@type": "Offer",
                price: "0",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-white`}>
        <Header />
        {children}
        <Footer />




        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103959166', 'ym');
          ym(103959166, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GGW0XK9H77"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GGW0XK9H77');`}
        </Script>
      </body>
    </html>
  );
}
