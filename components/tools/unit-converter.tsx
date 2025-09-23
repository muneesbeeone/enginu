"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Ruler, RotateCcw, ArrowRightLeft } from "lucide-react"

const conversions = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeters", factor: 1 },
      cm: { name: "Centimeters", factor: 10 },
      m: { name: "Meters", factor: 1000 },
      km: { name: "Kilometers", factor: 1000000 },
      in: { name: "Inches", factor: 25.4 },
      ft: { name: "Feet", factor: 304.8 },
      yd: { name: "Yards", factor: 914.4 },
    },
  },
  area: {
    name: "Area",
    units: {
      "mm²": { name: "Square Millimeters", factor: 1 },
      "cm²": { name: "Square Centimeters", factor: 100 },
      "m²": { name: "Square Meters", factor: 1000000 },
      "km²": { name: "Square Kilometers", factor: 1000000000000 },
      "in²": { name: "Square Inches", factor: 645.16 },
      "ft²": { name: "Square Feet", factor: 92903.04 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      "mm³": { name: "Cubic Millimeters", factor: 1 },
      "cm³": { name: "Cubic Centimeters", factor: 1000 },
      "m³": { name: "Cubic Meters", factor: 1000000000 },
      "in³": { name: "Cubic Inches", factor: 16387.064 },
      "ft³": { name: "Cubic Feet", factor: 28316846.592 },
      L: { name: "Liters", factor: 1000000 },
      gal: { name: "Gallons (US)", factor: 3785411.784 },
    },
  },
}

export function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof conversions>("length")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("ft")
  const [inputValue, setInputValue] = useState("1")

  useEffect(() => {
    const unitKeys = Object.keys(conversions[category].units)
    setFromUnit(unitKeys[2] || unitKeys[0]) // Default to meters or first available
    setToUnit(unitKeys[5] || unitKeys[1]) // Default to feet or second available
    setInputValue("1")
  }, [category])

  const result = useMemo(() => {
    if (!inputValue || !fromUnit || !toUnit) return null

    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return null

    const units = conversions[category].units
    const fromFactor = (units as Record<string, { factor: number }>)[fromUnit]?.factor
    const toFactor = (units as Record<string, { factor: number }>)[toUnit]?.factor

    if (!fromFactor || !toFactor) return null

    const convertedValue = (value * fromFactor) / toFactor
    return convertedValue
  }, [inputValue, fromUnit, toUnit, category])

  const handleReset = () => {
    setCategory("length")
    setFromUnit("m")
    setToUnit("ft")
    setInputValue("")
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            <CardTitle>Unit Converter</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <CardDescription>Convert between different units of measurement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value: keyof typeof conversions) => {
              setCategory(value)
              setFromUnit("")
              setToUnit("")
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conversions).map(([key, conv]) => (
                <SelectItem key={key} value={key}>
                  {conv.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          {/* From */}
          <div className="space-y-2">
            <Label htmlFor="from-unit">From</Label>
            <Input
              id="input-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions[category].units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name} ({key})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <Button variant="outline" size="icon" className="self-end" onClick={handleSwap}>
            <ArrowRightLeft className="h-4 w-4" />
            <span className="sr-only">Swap units</span>
          </Button>

          {/* To */}
          <div className="space-y-2">
            <Label htmlFor="to-unit">To</Label>
            <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-2xl font-bold text-primary">
              {result?.toLocaleString(undefined, { maximumFractionDigits: 6 }) ?? "..."}
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions[category].units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name} ({key})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
