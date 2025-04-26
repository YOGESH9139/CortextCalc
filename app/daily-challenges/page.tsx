"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, CheckCircle, Clock, Award, Zap, Target, RefreshCw, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Challenge type definition
interface Challenge {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  target: number
  progress: number
  color: string
  reward: string
  completed: boolean
}

export default function DailyChallengesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [lastReset, setLastReset] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (!storedUser) {
      window.location.href = "/"
      return
    }

    const user = JSON.parse(storedUser)
    setUserName(user.name)

    // Check if challenges need to be reset (new day)
    const today = new Date().toDateString()
    const storedLastReset = localStorage.getItem("cortexCalcChallengesLastReset")

    if (storedLastReset !== today) {
      // Reset challenges for a new day
      resetChallenges(today)
    } else {
      // Load existing challenges
      loadChallenges()
    }

    setLastReset(storedLastReset)

    // Remove artificial delay - load immediately
    setIsLoading(false)
  }, [])

  const resetChallenges = (today: string) => {
    // Create new challenges for the day
    const newChallenges: Challenge[] = [
      {
        id: "correct-answers",
        title: "Answer Master",
        description: "Answer 15 questions correctly in any quiz",
        icon: <CheckCircle className="h-5 w-5 text-mint-500" />,
        target: 15,
        progress: 0,
        color: "mint",
        reward: "+25 XP",
        completed: false,
      },
      {
        id: "easy-quiz",
        title: "Easy Starter",
        description: "Complete 2 easy difficulty quizzes",
        icon: <Zap className="h-5 w-5 text-blue-500" />,
        target: 2,
        progress: 0,
        color: "blue",
        reward: "+15 XP",
        completed: false,
      },
      {
        id: "medium-quiz",
        title: "Medium Challenge",
        description: "Complete 1 medium difficulty quiz",
        icon: <Target className="h-5 w-5 text-gold-500" />,
        target: 1,
        progress: 0,
        color: "gold",
        reward: "+20 XP",
        completed: false,
      },
      {
        id: "hard-quiz",
        title: "Hard Conqueror",
        description: "Complete 1 hard difficulty quiz",
        icon: <Award className="h-5 w-5 text-violet-500" />,
        target: 1,
        progress: 0,
        color: "violet",
        reward: "+30 XP",
        completed: false,
      },
      {
        id: "time-challenge",
        title: "Speed Demon",
        description: "Complete a quiz with at least 80% score in under 2 minutes",
        icon: <Clock className="h-5 w-5 text-fuchsia-500" />,
        target: 1,
        progress: 0,
        color: "fuchsia",
        reward: "+40 XP",
        completed: false,
      },
    ]

    // Save new challenges
    localStorage.setItem("cortexCalcChallenges", JSON.stringify(newChallenges))
    localStorage.setItem("cortexCalcChallengesLastReset", today)
    setChallenges(newChallenges)
    setLastReset(today)
  }

  const loadChallenges = () => {
    const storedChallenges = localStorage.getItem("cortexCalcChallenges")
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges))
    } else {
      // If no challenges exist, create new ones
      resetChallenges(new Date().toDateString())
    }
  }

  const handleManualReset = () => {
    resetChallenges(new Date().toDateString())
  }

  const getCompletedCount = () => {
    return challenges.filter((challenge) => challenge.completed).length
  }

  const getTotalXP = () => {
    let totalXP = 0
    challenges.forEach((challenge) => {
      if (challenge.completed) {
        // Extract XP value from reward string (e.g., "+25 XP" -> 25)
        const xp = Number.parseInt(challenge.reward.match(/\d+/)?.[0] || "0")
        totalXP += xp
      }
    })
    return totalXP
  }

  // Simulate completing a challenge (for demo purposes)
  const simulateProgress = (challengeId: string) => {
    setChallenges((prevChallenges) => {
      const updatedChallenges = prevChallenges.map((challenge) => {
        if (challenge.id === challengeId && !challenge.completed) {
          const newProgress = Math.min(challenge.progress + 1, challenge.target)
          const completed = newProgress >= challenge.target

          return {
            ...challenge,
            progress: newProgress,
            completed,
          }
        }
        return challenge
      })

      // Save updated challenges
      localStorage.setItem("cortexCalcChallenges", JSON.stringify(updatedChallenges))
      return updatedChallenges
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md bg-blue-500/10 animate-pulse mr-4"></div>
            <div className="h-8 w-48 bg-blue-500/10 rounded-md animate-pulse"></div>
          </div>

          <div className="glass-card border border-white/10 h-32 animate-pulse mb-8"></div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-card border border-white/10 h-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-500 to-mint-500 bg-clip-text text-transparent">
            Daily Challenges
          </h1>
        </div>

        {/* Daily Summary */}
        <Card className="glass-card border border-gold-500/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold-500" />
              <span>Today's Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Complete daily challenges to earn XP and improve your skills!
                </p>
                <p className="text-sm text-gold-500 mt-1">Challenges reset daily at midnight.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-500">
                    {getCompletedCount()}/{challenges.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-500">+{getTotalXP()}</div>
                  <div className="text-xs text-muted-foreground">XP Earned</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenge Cards */}
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`glass-card border border-${challenge.color}-500/20 ${
                challenge.completed ? `bg-${challenge.color}-500/10` : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-full bg-${challenge.color}-500/10 border border-${challenge.color}-500/30`}
                    >
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold text-${challenge.color}-500 flex items-center gap-2`}>
                        {challenge.title}
                        {challenge.completed && <CheckCircle className="h-4 w-4 text-mint-500" />}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className={`text-${challenge.color}-500`}>
                            {challenge.progress}/{challenge.target}
                          </span>
                        </div>
                        <Progress
                          value={(challenge.progress / challenge.target) * 100}
                          className="h-2"
                          // Custom styling for the progress indicator based on challenge color
                          style={
                            {
                              "--progress-background": `var(--${challenge.color}-500)`,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold text-${challenge.color}-500 mb-1`}>{challenge.reward}</div>
                    {/* Demo button to simulate progress - would be removed in production */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-${challenge.color}-500 hover:bg-${challenge.color}-500/10`}
                      onClick={() => simulateProgress(challenge.id)}
                      disabled={challenge.completed}
                    >
                      {challenge.completed ? "Completed" : "Simulate Progress"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Challenge Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            variant="outline"
            className="border-gold-500/20 text-gold-500 hover:bg-gold-500/10"
            onClick={handleManualReset}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Challenges
          </Button>

          <div className="flex gap-4">
            <Link href="/math-battles">
              <Button className="bg-mint-500 hover:bg-mint-600 text-background">
                Start a Quiz
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
