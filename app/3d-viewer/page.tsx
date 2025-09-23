import { ViewerPageClient } from "@/app/3d-viewer/viewer-page-client"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Free Online 3D Model Viewer (STL, GLB, GLTF, 3DS)",
  description:
    "Upload and view your 3D models online for free. Our powerful, browser-based 3D viewer supports STL, GLB, GLTF, and 3DS files. Perfect for design review, 3D printing, and presentations.",
  keywords: [
    "3d viewer",
    "stl viewer",
    "glb viewer",
    "obj viewer",
    "step viewer",
    "gltf viewer",
    "3ds viewer",
    "online 3d viewer",
    "free 3d model viewer",
    "webgl viewer",
    "3d file viewer",
    "cad viewer",
    "engineering model viewer",
    "3d print preview",
    "view stl files online",
    "browser 3d viewer",
    "3d model inspector",
  ],
}

export default function ViewerPage() {
  return <ViewerPageClient />
}
