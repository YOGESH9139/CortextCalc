"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface AuthModalProps {
  type: "quickStart" | "login"
  onClose: () => void
  onSuccess: (name: string) => void
}

export function AuthModal({ type, onClose, onSuccess }: AuthModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      password?: string
    } = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (type === "login") {
      if (!email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid"
      }

      if (!password.trim()) {
        newErrors.password = "Password is required"
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSuccess(name)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="glass-card w-full max-w-md p-6 relative animate-in fade-in-50 zoom-in-95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-muted-foreground hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-mint-500 bg-clip-text text-transparent">
          {type === "quickStart" ? "Quick Start" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-card border-blue-500/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 neon-blue-glow"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {type === "login" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-card border-mint-500/30 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 neon-mint-glow"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-card border-violet-500/30 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 neon-violet-glow"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
            </>
          )}

          <Button
            type="submit"
            className={`w-full ${
              type === "quickStart"
                ? "bg-blue-500 hover:bg-blue-600 neon-blue-glow"
                : "bg-mint-500 hover:bg-mint-600 text-background neon-mint-glow"
            } animate-pulse-glow`}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}
