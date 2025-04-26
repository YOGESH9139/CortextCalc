"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, ArrowLeft, Gamepad2, Trophy, Brain, History } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MathBattlesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const router = useRouter()

  // Get quiz history from localStorage
  const [quizHistory, setQuizHistory] = useState<any[]>([])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (!storedUser) {
      window.location.href = "/"
      return
    }

    const user = JSON.parse(storedUser)
    setUserName(user.name)

    // Get quiz history
    const history = localStorage.getItem("cortexCalcQuizHistory")
    if (history) {
      setQuizHistory(JSON.parse(history))
    }

    // Remove artificial delay - load immediately
    setIsLoading(false)
  }, [])

  const startQuiz = (difficulty: string) => {
    router.push(`/math-battles/quiz?difficulty=${difficulty}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md bg-blue-500/10 animate-pulse mr-4"></div>
            <div className="h-8 w-48 bg-blue-500/10 rounded-md animate-pulse"></div>
          </div>

          <div className="glass-card border border-white/10 h-64 animate-pulse mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card border border-white/10 h-32 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-mint-500 to-blue-500 bg-clip-text text-transparent">
            Math Battles
          </h1>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quizzes Section */}
          <Card className="glass-card border border-mint-500/20 col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-mint-500">
                <Calculator className="h-5 w-5" />
                <span>Quizzes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Challenge yourself with math problems of varying difficulty levels.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Easy Difficulty */}
                <Card
                  className="glass-card border border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer"
                  onClick={() => startQuiz("easy")}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-blue-500">Easy</h3>
                      <Brain className="h-6 w-6 text-blue-500" />
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        Basic BODMAS questions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        10 questions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        10 seconds per question
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Start Quiz</Button>
                  </CardContent>
                </Card>

                {/* Medium Difficulty */}
                <Card
                  className="glass-card border border-mint-500/20 hover:border-mint-500/50 transition-all cursor-pointer"
                  onClick={() => startQuiz("medium")}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-mint-500">Medium</h3>
                      <Calculator className="h-6 w-6 text-mint-500" />
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-mint-500"></span>8 BODMAS questions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-mint-500"></span>2 word problems
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-mint-500"></span>
                        10-20 seconds per question
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-mint-500 hover:bg-mint-600 text-background">Start Quiz</Button>
                  </CardContent>
                </Card>

                {/* Hard Difficulty */}
                <Card
                  className="glass-card border border-violet-500/20 hover:border-violet-500/50 transition-all cursor-pointer"
                  onClick={() => startQuiz("hard")}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-violet-500">Hard</h3>
                      <Trophy className="h-6 w-6 text-violet-500" />
                    </div>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500"></span>5 complex BODMAS questions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500"></span>5 challenging word problems
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                        10-20 seconds per question
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-violet-500 hover:bg-violet-600">Start Quiz</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Multiplayer Section */}
          <Card className="glass-card border border-gold-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold-500">
                <Gamepad2 className="h-5 w-5" />
                <span>Multiplayer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Challenge your friends or random opponents in real-time math battles.</p>
              <Button className="w-full bg-gold-500/20 text-gold-500 hover:bg-gold-500/30" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* Puzzles Section */}
          <Card className="glass-card border border-fuchsia-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-fuchsia-500">
                <Brain className="h-5 w-5" />
                <span>Puzzles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Solve challenging math puzzles that require creative thinking.</p>
              <Button className="w-full bg-fuchsia-500/20 text-fuchsia-500 hover:bg-fuchsia-500/30" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="glass-card border border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-500">
                <History className="h-5 w-5" />
                <span>Quiz History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizHistory.length > 0 ? (
                <div className="space-y-3">
                  {quizHistory.slice(0, 5).map((quiz, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 glass-card border border-blue-500/10"
                    >
                      <div>
                        <p className="font-medium">{quiz.difficulty} Quiz</p>
                        <p className="text-xs text-muted-foreground">{new Date(quiz.date).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            quiz.difficulty === "easy"
                              ? "text-blue-500"
                              : quiz.difficulty === "medium"
                                ? "text-mint-500"
                                : "text-violet-500"
                          }`}
                        >
                          {quiz.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                  {quizHistory.length > 5 && (
                    <Button variant="ghost" className="w-full text-blue-500 hover:bg-blue-500/10">
                      View All History
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No quiz history yet.</p>
                  <p className="text-sm text-blue-500 mt-1">Complete a quiz to see your history!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
