"use client"

import { useEffect, useState } from "react"
import { Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    // Hide preloader when progress reaches 100%
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 500)
      return () => clearTimeout(timeout)
    }

    return () => clearInterval(interval)
  }, [progress])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <Brain className="h-16 w-16 text-blue-500 animate-pulse" />
          <div className="absolute -inset-2 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-mint-500 to-violet-500 bg-clip-text text-transparent">
          CortexCalc Brain Trainer
        </h1>
        <div className="w-64 mb-2">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">Loading resources... {Math.round(progress)}%</p>
      </div>
    </div>
  )
}
