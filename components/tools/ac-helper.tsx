"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Thermometer, RotateCcw } from "lucide-react"

export function ACHelper() {
  const [roomType, setRoomType] = useState("living")
  const [length, setLength] = useState("5")
  const [width, setWidth] = useState("4")
  const [insulation, setInsulation] = useState("average")
  const [occupants, setOccupants] = useState("2")

  const roomTypes = {
    bedroom: { name: "Bedroom", factor: 20 },
    living: { name: "Living Room", factor: 25 },
    kitchen: { name: "Kitchen", factor: 35 },
    office: { name: "Office", factor: 30 },
    server: { name: "Server Room", factor: 50 },
  }

  const insulationFactors = {
    poor: { name: "Poor", multiplier: 1.3 },
    average: { name: "Average", multiplier: 1.0 },
    good: { name: "Good", multiplier: 0.8 },
    excellent: { name: "Excellent", multiplier: 0.6 },
  }

  const result = useMemo(() => {
    const l = Number.parseFloat(length)
    const w = Number.parseFloat(width)
    const occ = Number.parseFloat(occupants) || 0

    if (isNaN(l) || isNaN(w) || !roomType || !insulation) return null

    const area = l * w
    const roomFactor = roomTypes[roomType as keyof typeof roomTypes].factor
    const insulationMultiplier = insulationFactors[insulation as keyof typeof insulationFactors].multiplier

    // Base BTU from room size and type
    const baseBtu = area * roomFactor * 3.412

    // Adjust for insulation
    const insulationAdjustedBtu = baseBtu * insulationMultiplier

    // Add BTU for occupants (300 BTU per person)
    const occupantBtu = occ * 300
    let totalBtu = insulationAdjustedBtu + occupantBtu

    // Add 10% for safety margin
    totalBtu *= 1.1

    const tons = totalBtu / 12000
    const watts = totalBtu / 3.412

    return {
      btu: totalBtu,
      tons: tons,
      watts: watts,
    }
  }, [length, width, occupants, roomType, insulation])

  const handleReset = () => {
    setRoomType("living")
    setLength("")
    setWidth("")
    setInsulation("average")
    setOccupants("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            <CardTitle>A/C Cooling Calculator</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>Calculate BTU requirements for air conditioning systems</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="room-type">Room Type</Label>
            <Select value={roomType} onValueChange={(value) => setRoomType(value as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roomTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="insulation">Insulation Quality</Label>
            <Select value={insulation} onValueChange={(value) => setInsulation(value as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Select insulation" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(insulationFactors).map(([key, factor]) => (
                  <SelectItem key={key} value={key}>
                    {factor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="occupants">Occupants</Label>
            <Input
              id="occupants"
              type="number"
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              placeholder="Number of people"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">BTU/hr Required</Label>
            <p className="text-2xl font-bold text-primary">{result?.btu.toLocaleString("en-US", { maximumFractionDigits: 0 }) ?? "..."}</p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Tons Required</Label>
            <p className="text-2xl font-bold text-primary">{result?.tons.toFixed(2) ?? "..."}</p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center">
            <Label className="text-sm font-medium text-muted-foreground">Watts Required</Label>
            <p className="text-2xl font-bold text-primary">
              {result?.watts.toLocaleString("en-US", { maximumFractionDigits: 0 }) ?? "..."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
