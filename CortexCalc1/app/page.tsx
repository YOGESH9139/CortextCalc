"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import Link from "next/link"
import { Home, Gamepad2, MessageSquare, Brain, TrendingUp, Trophy, BarChart, Zap, Lightbulb } from "lucide-react"

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState<"quickStart" | "login">("quickStart")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (storedUser) {
      setIsLoggedIn(true)
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
    // Save to localStorage
    localStorage.setItem("cortexCalcUser", JSON.stringify({ name, score: 0, streak: 0 }))

    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <main className="container mx-auto px-4 py-6 flex flex-col">
      <div className="text-center max-w-4xl mx-auto mt-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-mint-500 to-violet-500 bg-clip-text text-transparent animate-pulse-glow">
          CortexCalc Brain Trainer
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-blue-500">Sharpen Your Mind, One Question at a Time!</p>

        {/* Navigation buttons below the heading */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-blue-500 hover:text-white hover:bg-blue-500/20 border border-blue-500/20"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/math-battles">
                <Button
                  variant="ghost"
                  className="text-mint-500 hover:text-white hover:bg-mint-500/20 border border-mint-500/20"
                >
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Math Battles
                </Button>
              </Link>
              <Link href="/feedback">
                <Button
                  variant="ghost"
                  className="text-violet-500 hover:text-white hover:bg-violet-500/20 border border-violet-500/20"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Feedback
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-blue-500 hover:text-white hover:bg-blue-500/20 border border-blue-500/20"
                onClick={handleQuickStart}
              >
                Quick Start
              </Button>
              <Button
                variant="ghost"
                className="text-mint-500 hover:text-white hover:bg-mint-500/20 border border-mint-500/20"
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          )}
        </div>

        {/* Information Section */}
        <div className="glass-card p-6 md:p-8 mb-8 text-left border border-white/10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-mint-500 to-blue-500 bg-clip-text text-transparent">
            About CortexCalc Brain Trainer
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <p>
                CortexCalc Brain Trainer is a comprehensive mental arithmetic application designed to sharpen students'
                math skills through engaging, adaptive challenges. Our platform offers a variety of quizzes on basic
                math operations including addition, subtraction, multiplication, and division, all with progressively
                increasing difficulty levels.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-mint-500 mt-1 flex-shrink-0" />
              <p>
                As you progress through the challenges, the application intelligently adapts to your skill level,
                providing problems that are optimally challenging – not too easy to be boring, yet not too difficult to
                be discouraging. This adaptive learning approach is based on research into how popular brain-training
                tools adjust question difficulty to maximize learning outcomes.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Trophy className="h-6 w-6 text-gold-500 mt-1 flex-shrink-0" />
              <p>
                Track your performance with our comprehensive scoring system. CortexCalc records your scores, tracks
                your streaks, and shows your position on the leaderboard. Compete with friends or challenge yourself to
                beat your personal best as you climb the ranks of CortexCalc Masters.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <BarChart className="h-6 w-6 text-violet-500 mt-1 flex-shrink-0" />
              <p>
                Our detailed analytics provide insights into your progress over time. Identify your strengths and areas
                for improvement with visualizations that break down your performance by operation type, difficulty
                level, and response time. Watch as your mental math abilities grow with consistent practice.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-fuchsia-500 mt-1 flex-shrink-0" />
              <p>
                Whether you're a student looking to improve your arithmetic skills, a teacher seeking an engaging
                educational tool, or anyone wanting to keep their mind sharp, CortexCalc Brain Trainer offers a fun,
                effective way to enhance your mathematical abilities. Start your journey to faster, more accurate mental
                calculations today!
              </p>
            </div>
          </div>
        </div>
        {/* Research Section */}
        <div className="glass-card p-6 md:p-8 mb-12 text-left border border-violet-500/10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Research Background
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-violet-500 mt-1 flex-shrink-0" />
              <p>
                <span className="font-bold text-violet-500">Brief research on adaptive learning models</span> used in
                platforms like Lumosity or Elevate has informed the development of CortexCalc Brain Trainer. These
                platforms utilize sophisticated algorithms that adjust difficulty based on user performance, creating a
                personalized learning experience.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-fuchsia-500 mt-1 flex-shrink-0" />
              <p>
                Our application implements similar adaptive techniques, analyzing response time, accuracy, and pattern
                recognition to tailor questions to each user's skill level. This approach maximizes cognitive engagement
                and learning efficiency, ensuring users are consistently challenged without becoming frustrated.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <p>
                Research indicates that adaptive learning systems can improve knowledge retention by up to 15% and
                reduce learning time by 30% compared to traditional methods. CortexCalc applies these findings to
                mathematical skill development, creating an optimized path to numeracy proficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal type={authType} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />
      )}
    </main>
  )
}
