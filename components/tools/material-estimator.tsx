"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Building2, RotateCcw } from "lucide-react"

export function MaterialEstimator() {
  const [projectType, setProjectType] = useState("slab")
  const [length, setLength] = useState("10")
  const [width, setWidth] = useState("5")
  const [height, setHeight] = useState("0.15")

  const results = useMemo(() => {
    const l = Number.parseFloat(length)
    const w = Number.parseFloat(width)
    const h = Number.parseFloat(height)

    if (isNaN(l) || isNaN(w) || isNaN(h) || !projectType) return null

    const volume = l * w * h // cubic meters

    let steelRatio = 80 // kg steel per m³ concrete

    switch (projectType) {
      case "foundation":
        concreteRatio = 1
        steelRatio = 60
        break
      case "slab":
        steelRatio = 50
        break
      case "beam":
        steelRatio = 120
        break
      case "column":
        steelRatio = 150
        break
    }

    const concrete = volume
    const steel = concrete * steelRatio

    return {
      concrete: concrete,
      steel: steel,
      volume: volume,
      steelRatio: steelRatio,
    }
  }, [length, width, height, projectType])

  const handleReset = () => {
    setProjectType("slab")
    setLength("")
    setWidth("")
    setHeight("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Material Estimator</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>Calculate concrete and steel requirements for construction projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="project-type">Project Type</Label>
          <Select value={projectType} onValueChange={(value) => setProjectType(value as string)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="slab">Slab</SelectItem>
              <SelectItem value="beam">Beam</SelectItem>
              <SelectItem value="column">Column</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="length">Length (m)</Label>
            <Input
              id="length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Enter length"
            />
          </div>
          <div>
            <Label htmlFor="width">Width (m)</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Enter width"
            />
          </div>
          <div>
            <Label htmlFor="height">Height/Thickness (m)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Total Volume</Label>
            <p className="text-2xl font-bold text-primary">{results?.volume.toFixed(2) ?? "..."} m³</p>
            <p className="text-xs text-muted-foreground/80">
              {length || "L"} × {width || "W"} × {height || "H"}
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Concrete Required</Label>
            <p className="text-2xl font-bold text-primary">{results?.concrete.toFixed(2) ?? "..."} m³</p>
            <p className="text-xs text-muted-foreground/80">Equal to volume</p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Steel Required</Label>
            <p className="text-2xl font-bold text-primary">{results?.steel.toFixed(1) ?? "..."} kg</p>
            <p className="text-xs text-muted-foreground/80">
              {results?.concrete.toFixed(2) ?? "..."} m³ × {results?.steelRatio ?? "..."} kg/m³
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
