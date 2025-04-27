"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Calculator,
  Award,
  Brain,
  Gamepad2,
  ArrowRight,
  Plus,
  Minus,
  Divide,
  Percent,
  History,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [quizHistory, setQuizHistory] = useState<any[]>([])

  // Sample data - now with placeholder values
  const [stats, setStats] = useState({
    totalScore: null as number | null,
    currentStreak: null as number | null,
    highestScore: null as number | null,
    xpProgress: 0,
  })

  const leaderboard = [
    { name: "MathWiz99", score: 245 },
    { name: "BrainMaster", score: 230 },
    { name: "NumberNinja", score: 215 },
    { name: "LogicLord", score: 200 },
    { name: "CalculusKing", score: 185 },
  ]

  const quotes = [
    "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding. – William Paul Thurston",
    "Pure mathematics is, in its way, the poetry of logical ideas. – Albert Einstein",
    "Mathematics is the music of reason. – James Joseph Sylvester",
    "The only way to learn mathematics is to do mathematics. – Paul Halmos",
  ]

  const [randomQuote, setRandomQuote] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (!storedUser) {
      window.location.href = "/"
      return
    }

    const user = JSON.parse(storedUser)
    setUserName(user.name)

    // Set user stats
    setStats({
      totalScore: user.totalScore || null,
      currentStreak: user.streak || null,
      highestScore: user.highestScore || null,
      xpProgress: user.totalScore ? Math.min(Math.floor(user.totalScore / 2), 100) : 0,
    })

    // Get quiz history
    const history = localStorage.getItem("cortexCalcQuizHistory")
    if (history) {
      setQuizHistory(JSON.parse(history))
    }

    // Set random quote
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuote(quotes[randomIndex])

    // Remove artificial delay - load immediately
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="h-8 w-64 bg-blue-500/10 rounded-md animate-pulse mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card border border-white/10 h-24 animate-pulse"></div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="glass-card border border-white/10 h-64 col-span-1 lg:col-span-2 animate-pulse"></div>
            <div className="glass-card border border-white/10 h-64 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card border border-white/10 h-64 animate-pulse"></div>
            <div className="glass-card border border-white/10 h-64 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-mint-500 bg-clip-text text-transparent">
          Welcome, {userName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card border border-gold-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold-500" />
                Total Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gold-500">{stats.totalScore !== null ? stats.totalScore : "-"}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border border-mint-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4 text-mint-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-mint-500">
                {stats.currentStreak !== null ? stats.currentStreak : "-"}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border border-violet-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-violet-500" />
                Highest Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-violet-500">
                {stats.highestScore !== null ? stats.highestScore : "-"}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-500" />
                XP Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={stats.xpProgress} className="h-2" />
                <span className="text-sm text-blue-500">{stats.xpProgress}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border border-blue-500/20 col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-500">Math Problem Generator</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="glass-card p-4 border border-blue-500/20">
                  <Plus className="h-8 w-8 text-blue-500" />
                </div>
                <div className="glass-card p-4 border border-mint-500/20">
                  <Minus className="h-8 w-8 text-mint-500" />
                </div>
                <div className="glass-card p-4 border border-violet-500/20">
                  <Calculator className="h-8 w-8 text-violet-500" />
                </div>
                <div className="glass-card p-4 border border-fuchsia-500/20">
                  <Divide className="h-8 w-8 text-fuchsia-500" />
                </div>
                <div className="glass-card p-4 border border-gold-500/20">
                  <Percent className="h-8 w-8 text-gold-500" />
                </div>
              </div>
              <Link href="/math-battles">
                <Button className="bg-blue-500 hover:bg-blue-600 font-bungee">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Start a Math Battle
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card border border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gold-500">Top 5 CortexCalc Masters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                          index === 0
                            ? "border-gold-500/50 text-gold-500"
                            : index === 1
                              ? "border-mint-500/50 text-mint-500"
                              : index === 2
                                ? "border-violet-500/50 text-violet-500"
                                : "border-blue-500/50 text-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <span
                      className={`font-bold ${
                        index === 0
                          ? "text-gold-500"
                          : index === 1
                            ? "text-mint-500"
                            : index === 2
                              ? "text-violet-500"
                              : "text-blue-500"
                      }`}
                    >
                      {user.score}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card border border-mint-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-mint-500 flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Quiz History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizHistory.length > 0 ? (
                <div className="space-y-4">
                  {quizHistory.slice(0, 5).map((quiz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between glass-card p-3 border border-mint-500/10"
                    >
                      <div>
                        <p className="font-medium">
                          {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)} Quiz
                        </p>
                        <p className="text-sm text-muted-foreground">{new Date(quiz.date).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`glass-card px-2 py-1 text-sm font-bold ${
                            quiz.difficulty === "easy"
                              ? "text-blue-500 border-blue-500/20"
                              : quiz.difficulty === "medium"
                                ? "text-mint-500 border-mint-500/20"
                                : "text-violet-500 border-violet-500/20"
                          } border`}
                        >
                          {quiz.score}%
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-mint-500">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {quizHistory.length > 5 && (
                    <Link href="/math-battles">
                      <Button variant="ghost" className="w-full text-mint-500 hover:bg-mint-500/10">
                        View All History
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="glass-card p-4 border border-mint-500/20 mb-4">
                    <Calculator className="h-8 w-8 text-mint-500" />
                  </div>
                  <p className="text-muted-foreground">You haven't completed any quizzes yet.</p>
                  <p className="text-mint-500 text-sm mt-2">Start a Math Battle to see your progress here!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border border-fuchsia-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-fuchsia-500">Math Inspiration</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="italic text-lg border-l-4 border-fuchsia-500/30 pl-4 py-2">
                {randomQuote}
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
