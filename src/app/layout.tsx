import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PrimeNest Realty | Premium Real Estate Properties",
  description: "Find your dream property with PrimeNest Realty. Premium apartments, villas, and plots in top locations. Trusted by 10,000+ customers.",
  keywords: ["real estate", "property", "apartments", "villas", "luxury homes", "PrimeNest Realty"],
  authors: [{ name: "PrimeNest Realty" }],
  creator: "PrimeNest Realty",
  publisher: "PrimeNest Realty",
  robots: "index, follow",
  openGraph: {
    title: "PrimeNest Realty | Premium Real Estate Properties",
    description: "Find your dream property with PrimeNest Realty. Premium apartments, villas, and plots in top locations.",
    type: "website",
    locale: "en_US",
    siteName: "PrimeNest Realty",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeNest Realty | Premium Real Estate Properties",
    description: "Find your dream property with PrimeNest Realty. Premium apartments, villas, and plots in top locations.",
  },
  alternates: {
    canonical: "https://primenestrealty.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#fafaf9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "PrimeNest Realty",
              description: "Premium real estate properties and services",
              url: "https://primenestrealty.com",
              logo: "https://primenestrealty.com/logo.png",
              sameAs: [
                "https://facebook.com/primenestrealty",
                "https://twitter.com/primenestrealty",
                "https://instagram.com/primenestrealty",
                "https://linkedin.com/company/primenestrealty",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-PRIMENEST",
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
