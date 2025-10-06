"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Wind, RotateCcw, Calculator } from "lucide-react"

export function HVACDuctCalculator() {
  const [airflow, setAirflow] = useState("1000") // CFM
  const [velocity, setVelocity] = useState("900") // FPM
  const [ductType, setDuctType] = useState("round")
  const [aspectRatio, setAspectRatio] = useState("1:1") // For rectangular ducts
  const [width, setWidth] = useState("12") // For rectangular ducts
  const [height, setHeight] = useState("8") // For rectangular ducts
  const [diameter, setDiameter] = useState("12") // For round ducts

  const results = useMemo(() => {
    const cfm = Number.parseFloat(airflow)
    const fpm = Number.parseFloat(velocity)
    const w = Number.parseFloat(width)
    const h = Number.parseFloat(height)
    const d = Number.parseFloat(diameter)

    if (isNaN(cfm) || isNaN(fpm) || cfm <= 0 || fpm <= 0) return null

    let area, equivalentDiameter, perimeter, hydraulicDiameter

    if (ductType === "round") {
      // Calculate diameter from CFM and velocity
      const calculatedDiameter = Math.sqrt((cfm * 4) / (fpm * Math.PI)) * 12 // Convert to inches
      area = (Math.PI * Math.pow(calculatedDiameter, 2)) / 4 // Square inches
      equivalentDiameter = calculatedDiameter
      perimeter = Math.PI * calculatedDiameter
      hydraulicDiameter = calculatedDiameter
    } else {
      // Rectangular duct
      if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null
      
      area = w * h // Square inches
      equivalentDiameter = 1.3 * Math.pow((w * h), 0.625) / Math.pow((w + h), 0.25)
      perimeter = 2 * (w + h)
      hydraulicDiameter = (4 * area) / perimeter
    }

    // Calculate actual velocity based on area
    const actualVelocity = cfm / (area / 144) // Convert area to square feet

    // Calculate friction loss (simplified)
    const frictionLoss = Math.pow(cfm / 1000, 1.85) * 0.1 // Inches of water per 100 ft

    // Calculate static pressure drop
    const staticPressure = (actualVelocity / 4005) ** 2 * 0.5 // Inches of water

    return {
      area: area,
      equivalentDiameter: equivalentDiameter,
      perimeter: perimeter,
      hydraulicDiameter: hydraulicDiameter,
      actualVelocity: actualVelocity,
      frictionLoss: frictionLoss,
      staticPressure: staticPressure,
      calculatedDiameter: ductType === "round" ? Math.sqrt((cfm * 4) / (fpm * Math.PI)) * 12 : null
    }
  }, [airflow, velocity, ductType, width, height, diameter])

  const handleReset = () => {
    setAirflow("1000")
    setVelocity("900")
    setDuctType("round")
    setAspectRatio("1:1")
    setWidth("12")
    setHeight("8")
    setDiameter("12")
  }

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio)
    const [w, h] = ratio.split(":").map(Number)
    if (w && h) {
      const currentArea = Number.parseFloat(width) * Number.parseFloat(height)
      const newWidth = Math.sqrt(currentArea * w / h)
      const newHeight = Math.sqrt(currentArea * h / w)
      setWidth(newWidth.toFixed(1))
      setHeight(newHeight.toFixed(1))
    }
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <CardTitle>HVAC Duct Calculator</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>Calculate duct sizing, velocity, and pressure drop for HVAC systems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor="airflow" className="text-sm font-medium">Airflow (CFM)</Label>
            <Input
              id="airflow"
              type="number"
              value={airflow}
              onChange={(e) => setAirflow(e.target.value)}
              placeholder="Enter airflow"
              className="w-full border-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="velocity" className="text-sm font-medium">Target Velocity (FPM)</Label>
            <Input
              id="velocity"
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              placeholder="Enter velocity"
              className="w-full border-2"
            />
          </div>
        </div>

        {/* Duct Type Selection */}
        <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
          <Label htmlFor="duct-type" className="text-sm font-medium">Duct Type</Label>
          <Select value={ductType} onValueChange={setDuctType}>
            <SelectTrigger className="w-full border-2">
              <SelectValue placeholder="Select duct type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="round">Round Duct</SelectItem>
              <SelectItem value="rectangular">Rectangular Duct</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Round Duct Inputs */}
        {ductType === "round" && (
          <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/30">
            <Label htmlFor="diameter" className="text-sm font-medium">Diameter (inches)</Label>
            <Input
              id="diameter"
              type="number"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              placeholder="Enter diameter"
              className="w-full border-2"
            />
            <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted/50 rounded-md border border-muted-foreground/20">
              <strong>Calculated diameter:</strong> {results?.calculatedDiameter?.toFixed(1) || "..."} inches
            </p>
          </div>
        )}

        {/* Rectangular Duct Inputs */}
        {ductType === "rectangular" && (
          <div className="space-y-6 p-4 border border-border rounded-lg bg-muted/30">
            <div className="space-y-2">
              <Label htmlFor="aspect-ratio" className="text-sm font-medium">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                <SelectTrigger className="w-full border-2">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="2:1">2:1</SelectItem>
                  <SelectItem value="3:1">3:1</SelectItem>
                  <SelectItem value="4:1">4:1</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="width" className="text-sm font-medium">Width (inches)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter width"
                  className="w-full border-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height"
                  className="w-full border-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground">Calculation Results</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Duct Area</Label>
              <p className="text-2xl font-bold text-primary">{results.area.toFixed(1)} in²</p>
              <p className="text-xs text-muted-foreground/80">
                {(results.area / 144).toFixed(2)} ft²
              </p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Equivalent Diameter</Label>
              <p className="text-2xl font-bold text-primary">{results.equivalentDiameter.toFixed(1)} in</p>
              <p className="text-xs text-muted-foreground/80">Round equivalent</p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Actual Velocity</Label>
              <p className="text-2xl font-bold text-primary">{results.actualVelocity.toFixed(0)} FPM</p>
              <p className="text-xs text-muted-foreground/80">
                {results.actualVelocity > 1200 ? "High velocity" : 
                 results.actualVelocity < 600 ? "Low velocity" : "Good velocity"}
              </p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Friction Loss</Label>
              <p className="text-2xl font-bold text-primary">{results.frictionLoss.toFixed(3)} in wg</p>
              <p className="text-xs text-muted-foreground/80">Per 100 ft</p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Static Pressure</Label>
              <p className="text-2xl font-bold text-primary">{results.staticPressure.toFixed(3)} in wg</p>
              <p className="text-xs text-muted-foreground/80">Velocity pressure</p>
            </div>
            
            <div className="rounded-lg bg-muted p-4 text-center border border-border">
              <Label className="text-sm font-medium text-muted-foreground">Hydraulic Diameter</Label>
              <p className="text-2xl font-bold text-primary">{results.hydraulicDiameter.toFixed(1)} in</p>
              <p className="text-xs text-muted-foreground/80">Flow efficiency</p>
            </div>
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-6 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-base">Design Guidelines</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span><strong>Supply ducts:</strong> 600-900 FPM velocity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span><strong>Return ducts:</strong> 500-700 FPM velocity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span><strong>Exhaust ducts:</strong> 700-1000 FPM velocity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span><strong>Friction loss:</strong> should be &lt; 0.1 in wg per 100 ft</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span><strong>Aspect ratio:</strong> maintain &lt; 4:1 for rectangular ducts</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
