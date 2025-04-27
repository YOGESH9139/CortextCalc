"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AuthModal } from "@/components/auth-modal"
import { ProfileModal } from "@/components/profile-modal"
import { Calculator, Brain, Trophy, MessageSquare, Home, Calendar } from "lucide-react"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState<"quickStart" | "login">("quickStart")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const pathname = usePathname()

  // Check if user is on dashboard page
  const isDashboard = pathname === "/dashboard"

  // Simulate login from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setIsLoggedIn(true)
      setUserName(user.name)
      setScore(user.score || 0)
      setStreak(user.streak || 0)
    }
  }, [])

  const handleQuickStart = () => {
    setAuthType("quickStart")
    setShowAuthModal(true)
  }

  const handleLogin = () => {
    setAuthType("login")
    setShowAuthModal(true)
  }

  const handleAuthSuccess = (name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
    setShowAuthModal(false)

    // Save to localStorage
    localStorage.setItem("cortexCalcUser", JSON.stringify({ name, score: 0, streak: 0 }))

    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 glass-card px-4 py-2 mb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl md:text-2xl bg-gradient-to-r from-blue-500 via-mint-500 to-violet-500 bg-clip-text text-transparent font-bold">
            CortexCalc Brain Trainer
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                className="text-blue-500 hover:text-white hover:bg-blue-500/20"
                onClick={handleQuickStart}
              >
                Quick Start
              </Button>
              <Button
                variant="ghost"
                className="text-mint-500 hover:text-white hover:bg-mint-500/20"
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-blue-500 hover:text-white hover:bg-blue-500/20">
                  <Home className="h-5 w-5 mr-1" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>

              <Link href="/daily-challenges">
                <Button variant="ghost" className="text-gold-500 hover:text-white hover:bg-gold-500/20">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span className="hidden md:inline">Challenges</span>
                </Button>
              </Link>

              {isDashboard && (
                <>
                  <div className="hidden md:flex items-center gap-1 mr-2">
                    <Trophy className="h-5 w-5 text-gold-500" />
                    <span className="text-gold-500">{score || "-"}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1 mr-4">
                    <Calculator className="h-5 w-5 text-mint-500" />
                    <span className="text-mint-500">{streak || "-"} streak</span>
                  </div>
                </>
              )}

              <Link href="/feedback">
                <Button variant="ghost" className="text-violet-500 hover:text-white hover:bg-violet-500/20">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span className="hidden md:inline">Feedback</span>
                </Button>
              </Link>

              <Button variant="ghost" className="p-0 w-10 h-10 rounded-full" onClick={handleProfileClick}>
                <Avatar>
                  <AvatarFallback className="bg-background text-gold-500">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal type={authType} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
      )}

      {showProfileModal && (
        <ProfileModal userName={userName} score={score} streak={streak} onClose={() => setShowProfileModal(false)} />
      )}
    </>
  )
}
