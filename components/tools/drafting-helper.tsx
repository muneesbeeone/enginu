"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Ratio, RotateCcw } from "lucide-react"

export function ScaleCalculator() {
  const [scale, setScale] = useState("1:100")
  const [realDimension, setRealDimension] = useState("1000")
  const [scaledDimensionInput, setScaledDimensionInput] = useState("10")

  const commonScales = {
    "1:1": { name: "1:1 (Full Size)", ratio: 1 },
    "1:2": { name: "1:2 (Half Size)", ratio: 0.5 },
    "1:5": { name: "1:5", ratio: 0.2 },
    "1:10": { name: "1:10", ratio: 0.1 },
    "1:20": { name: "1:20", ratio: 0.05 },
    "1:50": { name: "1:50", ratio: 0.02 },
    "1:100": { name: "1:100", ratio: 0.01 },
    "1:200": { name: "1:200", ratio: 0.005 },
    "1:500": { name: "1:500", ratio: 0.002 },
  }

  const scaleRatio = useMemo(() => {
    return commonScales[scale as keyof typeof commonScales]?.ratio ?? 0
  }, [scale])

  const calculatedScaledDimension = useMemo(() => {
    const real = Number.parseFloat(realDimension)
    if (!isNaN(real) && scaleRatio > 0) {
      return real * scaleRatio
    }
    return null
  }, [realDimension, scaleRatio])

  const calculatedRealDimension = useMemo(() => {
    const scaled = Number.parseFloat(scaledDimensionInput)
    if (!isNaN(scaled) && scaleRatio > 0) {
      return scaled / scaleRatio
    }
    return null
  }, [scaledDimensionInput, scaleRatio])

  const handleReset = () => {
    setScale("1:100")
    setRealDimension("")
    setScaledDimensionInput("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ratio className="h-5 w-5 text-primary" />
            <CardTitle>Scale Calculator</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>
          Instantly convert dimensions between real-world size and a scaled representation (e.g., for models, maps, or
          drawings).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="scale">Scale</Label>
          <Select value={scale} onValueChange={setScale}>
            <SelectTrigger id="scale">
              <SelectValue placeholder="Select a scale" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(commonScales).map(([key, scaleInfo]) => (
                <SelectItem key={key} value={key}>
                  {scaleInfo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real to Paper */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold text-foreground">Real-World to Scaled</h3>
            <div>
              <Label htmlFor="real-dimension">Real-World Dimension (mm)</Label>
              <Input
                id="real-dimension"
                type="number"
                value={realDimension}
                onChange={(e) => setRealDimension(e.target.value)}
                placeholder="e.g., 1000"
              />
            </div>
            <div className="min-h-[90px] rounded-lg bg-muted p-4">
              <Label className="text-sm font-medium text-muted-foreground">Calculated Scaled Dimension</Label>
              <p className="text-2xl font-bold text-primary">{calculatedScaledDimension?.toFixed(3) ?? "..."} mm</p>
              <p className="text-xs text-muted-foreground/80">
                Logic: {realDimension || "Real"} mm × {scaleRatio} = {calculatedScaledDimension?.toFixed(3) ?? "..."} mm
              </p>
            </div>
          </div>

          {/* Paper to Real */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold text-foreground">Scaled to Real-World</h3>
            <div>
              <Label htmlFor="scaled-dimension-input">Scaled Dimension (mm)</Label>
              <Input
                id="scaled-dimension-input"
                type="number"
                value={scaledDimensionInput}
                onChange={(e) => setScaledDimensionInput(e.target.value)}
                placeholder="e.g., 10"
              />
            </div>
            <div className="min-h-[90px] rounded-lg bg-muted p-4">
              <Label className="text-sm font-medium text-muted-foreground">Calculated Real-World Dimension</Label>
              <p className="text-2xl font-bold text-primary">{calculatedRealDimension?.toFixed(2) ?? "..."} mm</p>
              <p className="text-xs text-muted-foreground/80">
                Logic: {scaledDimensionInput || "Scaled"} mm / {scaleRatio} ={" "}
                {calculatedRealDimension?.toFixed(2) ?? "..."} mm
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
