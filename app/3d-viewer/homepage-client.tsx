"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Calculator,
  Building2,
  Droplets,
  Wind,
  Ratio,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Shield,
} from "lucide-react"
import AdSense from "@/components/AdSense"

function Homepage3DViewer() {
  // This component assumes a file named `gear.glb` is in your `/public` directory.
  // You can download a sample gear model or use your own.
  const { scene } = useGLTF("/los_angeles_building_v2.glb")
  const ref = useRef<THREE.Group>(null!)

  // Auto-rotate the model for a dynamic presentation
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    // Adjust scale and position to fit your model
    <primitive ref={ref} object={scene} scale={0.06} position={[0, -1.8, 0]} />
  )
}

export function HomePageClient() {
  const professions = [
    {
      title: "Civil Engineers",
      description:
        "Access powerful tools for structural analysis, concrete and steel material estimation, and comprehensive project planning.",
      icon: Building2,
      tools: ["Material Estimator", "Load Calculator", "Unit Converter", "Project Planner"],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Designers & Planners",
      description:
        "Utilize our scale calculator for architectural models and technical drawings, and visualize complex designs with our interactive 3D viewer.",
      icon: Ratio,
      tools: ["Scale Calculator", "Grid Reference", "3D Model Viewer", "Unit Converter"],
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Plumbers",
      description:
        "Simplify complex plumbing tasks with calculators for pipe sizing based on flow rate, water pressure analysis, and drainage system design.",
      icon: Droplets,
      tools: ["Pipe Sizing", "Flow Calculator", "Pressure Tools", "Material Guide"],
      color: "bg-chart-3/10 text-chart-3",
    },
    {
      title: "A/C Workers",
      description:
        "Perform accurate HVAC calculations, including cooling load (BTU) estimation, duct sizing, and overall system efficiency analysis.",
      icon: Wind,
      tools: ["BTU Calculator", "Load Estimator", "Duct Sizing", "Efficiency Tools"],
      color: "bg-chart-2/10 text-chart-2",
    },
  ]

  const features = [
    {
      icon: Calculator,
      title: "Professional Tools",
      description: "Industry-standard calculators and utilities designed by engineers for engineers",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our interactive tools provide real-time results as you type, speeding up your workflow.",
    },
    {
      icon: Shield,
      title: "Reliable & Accurate",
      description: "Built on tested formulas and industry standards you can trust for critical engineering work.",
    },
    {
      icon: Users,
      title: "Multi-Trade Support",
      description:
        "Whether you're in civil, mechanical, or architectural fields, our versatile toolset supports a wide range of disciplines.",
    },
  ]

  const faqs = [
    {
      question: "What is Enginu?",
      answer:
        "Enginu is a free, web-based suite of professional utilities designed for engineers, draftsmen, and technicians across various trades. It includes tools like a 3D model viewer, unit converters, and specialized calculators.",
    },
    {
      question: "Are the tools on Enginu free to use?",
      answer:
        "Yes, all tools currently available on Enginu are completely free to use. Our goal is to provide accessible and high-quality utilities for professionals and students.",
    },
    {
      question: "Do you store my uploaded 3D models?",
      answer:
        "No, we do not. The 3D viewer is a client-side tool, meaning your files are processed directly in your browser. Your models are never uploaded to or stored on our servers, ensuring your intellectual property remains private.",
    },
    {
      question: "What file formats does the 3D viewer support?",
      answer:
        "Our 3D viewer supports several common formats, including GLB (.glb), GLTF (.gltf), STL (.stl), and 3DS (.3ds). We are always working to expand support for more formats.",
    },
    {
      question: "Can I use these tools for professional work?",
      answer:
        "While our tools are built with industry standards in mind, they are provided 'as is' without warranty. They are excellent for quick estimations, visualizations, and educational purposes. For critical applications, we always recommend verifying results with a certified professional or primary-source documentation.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-background to-muted/50 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 text-sm font-medium">
                Professional Engineering Utilities
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
                Essential Engineering Utilities for <span className="text-primary">Every Trade</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 text-pretty">
                From civil engineers and draftsmen to plumbers and HVAC technicians, Enginu provides a comprehensive
                suite of calculators, converters, and viewers. All your essential tools in one professional, accessible
                platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/tools">
                    Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/3d-viewer">Try 3D Viewer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Every Trade</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Enginu offers specialized tools and calculators meticulously designed for your specific engineering
                discipline, ensuring you have the right utility for every task.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {professions.map((profession, index) => {
                const IconComponent = profession.icon
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${profession.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{profession.title}</CardTitle>
                          <CardDescription className="text-base">{profession.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {profession.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{tool}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
        <div className="mt-6 flex mx-auto justify-center">
          <AdSense
            slot="9783500294"
            className="max-w-[728px] w-full"
            adType="banner"
          />
        </div>
        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Enginu?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We focus on creating professional-grade tools designed with three core principles: precision, speed,
                and reliability. Here’s why professionals trust Enginu for their daily tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-primary/10 text-primary p-4 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Featured Tool
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful 3D Model Viewer</h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Upload and interact with your 3D designs directly in the browser. Our viewer is built for speed and
                  supports a wide range of file formats, making it perfect for quick design reviews, client
                  presentations, or visualizing CAD files on the go.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Supports GLB, GLTF, STL, and 3DS files.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Interactive controls: orbit, zoom, and pan.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Adjustable lighting, colors, and scene grid.</span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/3d-viewer">
                    Launch Viewer <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-muted rounded-lg border border-border aspect-video overflow-hidden">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-muted-foreground">Loading 3D Preview...</p>
                    </div>
                  }
                >
                  <Canvas camera={{ position: [0, -1, 5], fov: 50 }}>
                    <ambientLight intensity={2.5} />
                    <directionalLight position={[10, 10, 5]} intensity={3} />
                    <Homepage3DViewer />
                    <OrbitControls enableZoom={true} enablePan={false} />
                  </Canvas>
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of engineering professionals who trust Enginu for their daily calculations and project
              needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/tools">
                  Start Using Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <div className="mt-6 flex justify-center">
          <AdSense
            slot="9783500294"
            className="max-w-[728px] w-full"
            adType="banner"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}