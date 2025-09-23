import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  // TODO: Make sure this is your production URL
  metadataBase: new URL("https://enginu.munees.co.in"),
  title: "Enginu - Engineering Utilities for Everyone",
  description:
    "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers. Unit converters, material estimators, 3D viewer, and more.",
  generator: "Enginu",
  keywords: [
    "engineering",
    "utilities",
    "civil engineering",
    "drafting",
    "plumbing",
    "HVAC",
    "tools",
    "calculators",
    "material estimation",
    "3D viewer",
    "A/C",
    "air conditioning",
    "mechanical engineering",
    "electrical engineering",
    "construction",
    "building",
    "architecture",
    "design",
    "estimation",
    "calculation",
    "converter",
    "unit converter",
    "measurement",
    "conversion",
  ],
  authors: [{ name: "Muhammed Munees" }],
  openGraph: {
    title: "Enginu - Engineering Utilities for Everyone",
    description: "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers.",
    url: "https://enginu.munees.co.in",
    siteName: "Enginu",
    images: [
      {
        url: "/og_image.png", // Relative to metadataBase
        width: 1200,
        height: 630,
        alt: "Enginu - A suite of online tools for engineers.",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Enginu - Engineering Utilities for Everyone",
    description: "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers.",
    images: ["/og_image.png"], // Relative to metadataBase
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Enginu",
      url: "https://enginu.munees.co.in",
      logo: "https://enginu.munees.co.in/og-image.png",
      description:
        "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers. Unit converters, material estimators, 3D viewer, and more.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Enginu",
      url: "https://enginu.munees.co.in",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://enginu.munees.co.in/tools?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ]

  return (
    <html lang="en">
       <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4391323106927085"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
