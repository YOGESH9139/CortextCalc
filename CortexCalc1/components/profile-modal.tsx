"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Trophy, Calculator, Award, Brain, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileModalProps {
  userName: string
  score: number
  streak: number
  onClose: () => void
}

export function ProfileModal({ userName, score, streak, onClose }: ProfileModalProps) {
  const router = useRouter()

  // Get user data from localStorage
  const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cortexCalcUser") || "{}") : {}

  // Sample data for the profile - with placeholder values
  const totalGames = userData.totalGames || 0
  const bestScore = userData.highestScore || null
  const level = userData.totalScore ? Math.floor(userData.totalScore / 50) + 1 : 1
  const xpProgress = userData.totalScore ? (userData.totalScore % 50) * 2 : 0

  const badges = [
    { name: "Quick Thinker", color: "blue", earned: true },
    { name: "Math Wizard", color: "violet", earned: userData.totalScore > 100 },
    { name: "Streak Master", color: "gold", earned: userData.streak >= 3 },
    { name: "Perfect Score", color: "mint", earned: userData.highestScore >= 100 },
    { name: "Brain Trainer", color: "fuchsia", earned: totalGames >= 5 },
  ]

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("cortexCalcUser")

    // Close modal
    onClose()

    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="glass-card w-full max-w-md p-6 relative animate-in fade-in-50 zoom-in-95 border border-white/10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-muted-foreground hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Profile
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border border-gold-500/30 flex items-center justify-center text-2xl font-bold text-gold-500">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold">{userName}</h3>
              <p className="text-muted-foreground">
                {totalGames > 0 ? `Level ${level} Math Trainer` : "New Math Trainer"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">XP Progress</span>
              <span className="text-sm text-blue-500">{xpProgress}%</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-3 flex flex-col items-center border border-gold-500/20">
              <Trophy className="h-6 w-6 text-gold-500 mb-1" />
              <span className="text-sm text-muted-foreground">Total Score</span>
              <span className="text-xl font-bold text-gold-500">{score || "-"}</span>
            </div>
            <div className="glass-card p-3 flex flex-col items-center border border-mint-500/20">
              <Calculator className="h-6 w-6 text-mint-500 mb-1" />
              <span className="text-sm text-muted-foreground">Current Streak</span>
              <span className="text-xl font-bold text-mint-500">{streak || "-"}</span>
            </div>
            <div className="glass-card p-3 flex flex-col items-center border border-violet-500/20">
              <Award className="h-6 w-6 text-violet-500 mb-1" />
              <span className="text-sm text-muted-foreground">Best Score</span>
              <span className="text-xl font-bold text-violet-500">{bestScore !== null ? bestScore : "-"}</span>
            </div>
            <div className="glass-card p-3 flex flex-col items-center border border-fuchsia-500/20">
              <Brain className="h-6 w-6 text-fuchsia-500 mb-1" />
              <span className="text-sm text-muted-foreground">Total Games</span>
              <span className="text-xl font-bold text-fuchsia-500">{totalGames}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Badges</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`glass-card px-3 py-1.5 border ${
                    badge.earned
                      ? `border-${badge.color}-500/30 text-${badge.color}-500`
                      : "opacity-50 text-muted-foreground border-white/5"
                  }`}
                >
                  <span className="text-sm font-bungee">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full border border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}
