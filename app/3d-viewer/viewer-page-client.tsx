"use client"

import { Suspense, useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, TorusKnot, useGLTF, Bounds, Text } from "@react-three/drei"
import { useControls, folder } from "leva"
import { STLLoader } from "three-stdlib"
import { TDSLoader } from "three-stdlib"

import { ArrowLeft, Upload } from "lucide-react"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Helper components for loading different model types
function GltfModel({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url)
  // This applies the selected color to meshes that don't have a texture,
  // preserving existing materials and textures.
  useMemo(() => {
    scene.traverse(child => {
      if (child instanceof THREE.Mesh && child.material && !Array.isArray(child.material) && !child.material.map) {
        child.material = new THREE.MeshStandardMaterial({ color })
      }
    })
  }, [scene, color])
  return <primitive object={scene} />
}

function StlModel({ url, color }: { url: string; color: string }) {
  const geom = useLoader(STLLoader, url)
  // STL files can be uncentered, so we center the geometry to help with positioning and viewing.
  useMemo(() => geom.center(), [geom])
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function TdsModel({ url, color }: { url: string; color: string }) {
  const model = useLoader(TDSLoader, url)
  // 3DS files can have multiple meshes, and materials might not load correctly from a blob URL
  // (e.g., missing textures). We traverse the loaded model and ensure every mesh has a
  // visible material. This replaces any existing materials to guarantee visibility.
  useMemo(() => {
    model.traverse(child => {
      if (child instanceof THREE.Mesh && child.material && !Array.isArray(child.material) && !child.material.map) {
        child.material = new THREE.MeshStandardMaterial({ color })
      }
    })
  }, [model, color])
  return <primitive object={model} />
}

function Model({
  url,
  extension,
  color,
}: {
  url: string | null
  extension: string | null
  color: string
}) {
  let ModelComponent
  if (!url) {
    // Default model if no file is uploaded
    ModelComponent = () => (
      <TorusKnot args={[1, 0.4, 256, 32]} scale={1.5}>
        <meshStandardMaterial color={color} />
      </TorusKnot>
    )
  } else if (extension === "gltf" || extension === "glb") {
    ModelComponent = () => <GltfModel url={url} color={color} />
  } else if (extension === "stl") {
    ModelComponent = () => <StlModel url={url} color={color} />
  } else if (extension === "3ds") {
    ModelComponent = () => <TdsModel url={url} color={color} />
  } else {
    // Fallback for unsupported formats
    ModelComponent = () => (
      <Text color="red" fontSize={0.3} maxWidth={4} textAlign="center">
        Unsupported file format. Please use .glb, .gltf, .stl, or .3ds
      </Text>
    )
  }

  // Wrap uploaded models in Bounds to auto-fit them to the view
  if (url) {
    return (
      <Bounds fit clip observe margin={1.2}>
        <ModelComponent />
      </Bounds>
    )
  }

  return <ModelComponent />
}

function Loader() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-muted-foreground">Loading 3D Viewer...</p>
    </div>
  )
}

export function ViewerPageClient() {
  const [model, setModel] = useState<{ url: string; extension: string } | null>(null)
  const { ambientIntensity, directionalIntensity, modelColor, showGrid, showAxes } = useControls({
    "Scene Controls": folder({
      ambientIntensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: "Ambient Light" },
      directionalIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: "Directional Light" },
      showGrid: { value: true, label: "Show Grid" },
      showAxes: { value: true, label: "Show Axes" },
    }),
    "Model Controls": folder({
      modelColor: {
        value: "#ff7f50", // A nice default like coral
        label: "Color",
      },
    }),
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const extension = file.name.split(".").pop()?.toLowerCase()
      if (extension) {
        setModel({ url, extension })
      }
    }
  }

  // Clean up the object URL to avoid memory leaks
  useEffect(() => {
    // This cleanup function will run when the component unmounts, or
    // before the effect runs again (i.e., when modelUrl changes).
    return () => {
      if (model) {
        URL.revokeObjectURL(model.url)
      }
    }
  }, [model])

  return (
    <div className="relative h-screen w-screen bg-background">
      {/* UI Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="icon">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload Model
              </label>
            </Button>
            <Input
              id="file-upload"
              type="file"
              className="sr-only"
              accept=".glb,.gltf,.stl,.3ds"
              onChange={handleFileChange}
            />
          </div>
          <div className="pointer-events-none max-w-md rounded-md bg-background/50 p-2 text-xs text-muted-foreground backdrop-blur-sm">
            <h1 className="font-bold text-foreground">Interactive 3D Viewer</h1>
            <p>
              Upload, view, and interact with your 3D models directly in the browser. Supports GLB, GLTF, STL, and
              3DS files. Perfect for quick design reviews, client presentations, or visualizing 3D print files.
            </p>
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="absolute inset-0">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={ambientIntensity} />
            <directionalLight position={[10, 10, 5]} intensity={directionalIntensity} />
            {showGrid && <gridHelper args={[100, 100]} />}
            {showAxes && <axesHelper args={[5]} />}
            <Model url={model?.url ?? null} extension={model?.extension ?? null} color={modelColor} />
            <OrbitControls makeDefault />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}