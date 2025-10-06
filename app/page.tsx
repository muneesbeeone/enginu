import type { Metadata } from "next"
import { HomePageClient } from "./3d-viewer/homepage-client"


// SEO Metadata for the Homepage
export const metadata: Metadata = {
  title: "Enginu - Essential Engineering Utilities for Every Trade",
  description:
    "The ultimate hub for engineering professionals. Free tools: 3D model viewer (GLB, STL), unit converter, duct sizing, plumbing, materials, scale calculator, and more.",
  keywords: [
    "engineering calculators",
    "engineering software",
    "3d viewer online",
    "glb viewer",
    "stl viewer",
    "online unit converter",
    "civil engineering tools",
    "mechanical engineering software",
    "architectural design tools",
    "hvac duct calculator",
    "duct sizing calculator",
    "btu calculator",
    "plumbing calculator",
    "pipe sizing calculator",
    "construction calculator",
    "scale calculator",
    "material estimator",
    "engineering web app",
    "free engineering tools",
  ],
}

export default function HomePage() {
  return <HomePageClient />
}
