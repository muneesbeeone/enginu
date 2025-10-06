import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { UnitConverter } from "@/components/tools/unit-converter"
import { MaterialEstimator } from "@/components/tools/material-estimator"
import { ScaleCalculator } from "@/components/tools/drafting-helper"
import { PlumbingHelper } from "@/components/tools/plumbing-helper"
import { ACHelper } from "@/components/tools/ac-helper"
import { HVACDuctCalculator } from "@/components/tools/hvac-duct-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Building2, Ratio, Droplets, Thermometer, Wind } from "lucide-react"
import AdSense from "@/components/AdSense"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Engineering Tools - Unit Converter, Materials, Scale, Plumbing, HVAC | Enginu",
  description:
    "Explore Enginu's suite of engineering tools: unit converter, material estimator, scale calculator, plumbing helper, and HVAC duct sizing calculator.",
  keywords: [
    "engineering tools",
    "unit converter",
    "material estimator",
    "scale calculator",
    "plumbing calculator",
    "pipe sizing calculator",
    "hvac duct calculator",
    "duct sizing calculator",
    "engineering calculators",
    "construction calculators",
  ],
  alternates: { canonical: "/tools" },
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Engineering Tools</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional calculators and utilities for civil engineers, draftsmen, plumbers, and A/C workers
            </p>
          </div>

          <Tabs defaultValue="converter" className="w-full">
            <div className="w-full overflow-x-auto pb-2">
              <TabsList className="mb-8">
                <TabsTrigger value="converter" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>Unit Converter</span>
                </TabsTrigger>
                <TabsTrigger value="materials" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>Materials</span>
                </TabsTrigger>
                <TabsTrigger value="scale" className="flex items-center gap-2">
                  <Ratio className="h-4 w-4" />
                  <span>Scale Calculator</span>
                </TabsTrigger>
                <TabsTrigger value="plumbing" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>Plumbing</span>
                </TabsTrigger>
                <TabsTrigger value="ac" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span>A/C Helper</span>
                </TabsTrigger>
                <TabsTrigger value="hvac" className="flex items-center gap-2">
                  <Wind className="h-4 w-4" />
                  <span>HVAC Duct</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="converter" className="space-y-6">
              <UnitConverter />
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <MaterialEstimator />
            </TabsContent>

            <TabsContent value="scale" className="space-y-6">
              <ScaleCalculator />
            </TabsContent>

            <TabsContent value="plumbing" className="space-y-6">
              <PlumbingHelper />
            </TabsContent>

            <TabsContent value="ac" className="space-y-6">
              <ACHelper />
            </TabsContent>

            <TabsContent value="hvac" className="space-y-6">
              <HVACDuctCalculator />
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex justify-center">
          <AdSense
            slot="9783500294"
            className="max-w-728px w-full"
            adType="banner"
          />
        </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
