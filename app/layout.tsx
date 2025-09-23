import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

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
        url: "/og_image.png", // Must be an absolute URL. Will be resolved using metadataBase.
        width: 1200,
        height: 630,
        alt: "Enginu - A suite of online tools for engineers.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enginu - Engineering Utilities for Everyone",
    description: "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers.",
    images: ["/og_image.png"], // Must be an absolute URL. Will be resolved using metadataBase.
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers." />
        <meta name="keywords" content="engineering calculators, online unit converter, civil engineering tools, mechanical engineering software, architectural design tools, HVAC calculator, plumbing calculator" />
        <meta name="author" content="Muhammed Munees" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1A1D23" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
