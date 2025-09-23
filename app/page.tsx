import type { Metadata } from "next"
import { HomePageClient } from "./3d-viewer/homepage-client"


// SEO Metadata for the Homepage
export const metadata: Metadata = {
  title: "Enginu - Essential Engineering Utilities for Every Trade",
  description:
    "The ultimate hub for engineering professionals. Access a free suite of tools including a 3D model viewer (GLB, STL), unit converters, and specialized calculators for civil, mechanical, and architectural trades.",
  keywords: [
    "engineering calculators",
    "free 3d viewer",
    "online unit converter",
    "civil engineering tools",
    "mechanical engineering software",
    "architectural design tools",
    "HVAC calculator",
    "plumbing calculator",
  ],
}

export default function HomePage() {
  return <HomePageClient />
}
