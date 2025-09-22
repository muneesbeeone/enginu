import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enginu - Engineering Utilities for Everyone",
    description: "Professional engineering tools for civil engineers, draftsmen, plumbers, and A/C workers.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
