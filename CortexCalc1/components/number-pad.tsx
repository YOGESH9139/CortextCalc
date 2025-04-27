"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace } from "lucide-react"

interface NumberPadProps {
  onSubmit: (value: string) => void
  disabled?: boolean
}

export function NumberPad({ onSubmit, disabled = false }: NumberPadProps) {
  const [value, setValue] = useState("")

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return

      // Allow numbers
      if (/^[0-9]$/.test(e.key)) {
        setValue((prev) => prev + e.key)
      }
      // Allow backspace
      else if (e.key === "Backspace") {
        setValue((prev) => prev.slice(0, -1))
      }
      // Allow enter to submit
      else if (e.key === "Enter" && value.length > 0) {
        onSubmit(value)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [value, onSubmit, disabled])

  const handleNumberClick = (num: string) => {
    if (disabled) return
    setValue((prev) => prev + num)
  }

  const handleBackspace = () => {
    if (disabled) return
    setValue((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    if (disabled) return
    setValue("")
  }

  const handleSubmit = () => {
    if (disabled || value.length === 0) return
    onSubmit(value)
  }

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="glass-card border border-blue-500/30 p-3 mb-4 text-right h-14 flex items-center justify-end">
        <span className="text-2xl font-mono">{value}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Numbers 1-9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            className="h-12 glass-card border border-blue-500/20 hover:bg-blue-500/20 text-xl font-mono"
            onClick={() => handleNumberClick(num.toString())}
            disabled={disabled}
          >
            {num}
          </Button>
        ))}

        {/* Clear button */}
        <Button
          className="h-12 glass-card border border-red-500/20 hover:bg-red-500/20 text-red-500"
          onClick={handleClear}
          disabled={disabled}
        >
          C
        </Button>

        {/* Zero */}
        <Button
          className="h-12 glass-card border border-blue-500/20 hover:bg-blue-500/20 text-xl font-mono"
          onClick={() => handleNumberClick("0")}
          disabled={disabled}
        >
          0
        </Button>

        {/* Backspace */}
        <Button
          className="h-12 glass-card border border-amber-500/20 hover:bg-amber-500/20 text-amber-500"
          onClick={handleBackspace}
          disabled={disabled}
        >
          <Backspace className="h-5 w-5" />
        </Button>

        {/* Submit */}
        <Button
          className="h-12 col-span-3 bg-mint-500 hover:bg-mint-600 text-background"
          onClick={handleSubmit}
          disabled={disabled || value.length === 0}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
