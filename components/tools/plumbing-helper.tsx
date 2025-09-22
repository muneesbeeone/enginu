"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Droplets, RotateCcw } from "lucide-react"

export function PlumbingHelper() {
  const [flowRate, setFlowRate] = useState("50")
  const [velocity, setVelocity] = useState("2")
  const [pipeType, setPipeType] = useState("pvc")

  const pipeTypes = {
    copper: { name: "Copper", roughness: 0.0015 },
    pvc: { name: "PVC", roughness: 0.0015 },
    steel: { name: "Steel", roughness: 0.045 },
    cast_iron: { name: "Cast Iron", roughness: 0.26 },
  }

  const nominalSizes = [
    { size: '1/2"', diameter: 12.7 },
    { size: '3/4"', diameter: 19.05 },
    { size: '1"', diameter: 25.4 },
    { size: '1 1/4"', diameter: 31.75 },
    { size: '1 1/2"', diameter: 38.1 },
    { size: '2"', diameter: 50.8 },
    { size: '2 1/2"', diameter: 63.5 },
    { size: '3"', diameter: 76.2 },
    { size: '4"', diameter: 101.6 },
    { size: '6"', diameter: 152.4 },
  ]

  const result = useMemo(() => {
    const flow = Number.parseFloat(flowRate) // L/min
    const vel = Number.parseFloat(velocity) // m/s

    if (isNaN(flow) || isNaN(vel)) return null

    // Convert flow rate from L/min to m³/s
    const flowM3s = flow / 60000

    // Calculate required diameter using Q = A × V
    // A = π × (D/2)²
    // D = √(4Q/πV)
    const diameter = Math.sqrt((4 * flowM3s) / (Math.PI * vel)) * 1000 // in mm

    // Find closest nominal size
    const closestSize = nominalSizes.reduce((prev, curr) => {
      return Math.abs(curr.diameter - diameter) < Math.abs(prev.diameter - diameter) ? curr : prev
    })

    return {
      diameter: diameter,
      nominalSize: closestSize.size,
      flowM3s: flowM3s,
    }
  }, [flowRate, velocity])

  const handleReset = () => {
    setFlowRate("")
    setVelocity("")
    setPipeType("pvc")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            <CardTitle>Plumbing Helper</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>
          Calculate the required internal pipe diameter based on flow rate and velocity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="pipe-type">Pipe Material</Label>
          <Select value={pipeType} onValueChange={setPipeType}>
            <SelectTrigger>
              <SelectValue placeholder="Select pipe material" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(pipeTypes).map(([key, type]) => (
                <SelectItem key={key} value={key}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="flow-rate">Flow Rate (L/min)</Label>
            <Input
              id="flow-rate"
              type="number"
              value={flowRate}
              onChange={(e) => setFlowRate(e.target.value)}
              placeholder="Enter flow rate"
            />
          </div>
          <div>
            <Label htmlFor="velocity">Velocity (m/s)</Label>
            <Input
              id="velocity"
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(e.target.value)}
              placeholder="Recommended: 1.5-3.0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Required Diameter</Label>
            <p className="text-2xl font-bold text-primary">{result?.diameter.toFixed(1) ?? "..."} mm</p>
            <p className="text-xs text-muted-foreground/80">
              Based on Q = A × V
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Recommended Nominal Size</Label>
            <p className="text-2xl font-bold text-primary">{result?.nominalSize ?? "..."}</p>
            <p className="text-xs text-muted-foreground/80">
              Closest standard size
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
