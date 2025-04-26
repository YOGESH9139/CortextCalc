"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, X, Check, Calculator } from "lucide-react"
import generateQuestions, { type Question } from "@/lib/quiz-generator"
import { NumberPad } from "@/components/number-pad"
import { MotivationalQuote } from "@/components/motivational-quote"

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = searchParams.get("difficulty") || "easy"

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [numericAnswer, setNumericAnswer] = useState<string | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [userName, setUserName] = useState("")
  const [timerPercentage, setTimerPercentage] = useState(100)
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null)
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const maxTime = useRef(0)

  // Initialize quiz
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (!storedUser) {
      router.push("/")
      return
    }

    const user = JSON.parse(storedUser)
    setUserName(user.name)

    // Generate questions based on difficulty
    const generatedQuestions = generateQuestions(difficulty)
    setQuestions(generatedQuestions)

    // Start the quiz
    setQuizStarted(true)
    setQuizStartTime(Date.now())
  }, [difficulty, router])

  // Current question
  const currentQuestion = questions[currentQuestionIndex]

  // Set timer for current question
  useEffect(() => {
    if (!quizStarted || quizFinished || !currentQuestion) return

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Set timer based on question type
    const timer = currentQuestion.type === "word" ? 20 : 10
    maxTime.current = timer
    setTimeLeft(timer)
    setTimerPercentage(100)

    // Start the timer
    const startTime = Date.now()
    timerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      const remaining = maxTime.current - elapsedSeconds

      if (remaining <= 0) {
        clearInterval(timerRef.current!)
        setTimeLeft(0)
        setTimerPercentage(0)
        // Auto-submit if time runs out
        if (selectedAnswer === null && numericAnswer === null) {
          handleAnswerSubmit(null)
        }
      } else {
        setTimeLeft(remaining)
        setTimerPercentage((remaining / maxTime.current) * 100)
      }
    }, 100) // Update more frequently for smoother animation

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentQuestionIndex, quizStarted, quizFinished, currentQuestion])

  // Handle answer selection for multiple choice
  const handleAnswerSelect = (answer: string) => {
    if (isAnswerCorrect !== null) return // Prevent changing answer after submission
    setSelectedAnswer(answer)
  }

  // Handle numeric answer submission
  const handleNumericSubmit = (answer: string) => {
    if (isAnswerCorrect !== null) return // Prevent changing answer after submission
    setNumericAnswer(answer)
    handleAnswerSubmit(answer)
  }

  // Handle answer submission
  const handleAnswerSubmit = useCallback(
    (answer: string | null) => {
      if (!currentQuestion) return

      const isCorrect = answer === currentQuestion.correctAnswer
      setIsAnswerCorrect(isCorrect)

      if (isCorrect) {
        setScore((prev) => prev + 1)
      }

      // Move to next question after 1.5 seconds
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1)
          setSelectedAnswer(null)
          setNumericAnswer(null)
          setIsAnswerCorrect(null)
        } else {
          // Quiz finished
          setQuizEndTime(Date.now())
          finishQuiz()
        }
      }, 1500)
    },
    [currentQuestion, currentQuestionIndex, questions.length],
  )

  // Finish quiz and save results
  const finishQuiz = () => {
    setQuizFinished(true)

    // Calculate percentage score
    const percentage = Math.round((score / questions.length) * 100)

    // Update user stats
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)

      // Update total score
      const newTotalScore = (user.totalScore || 0) + score

      // Update streak
      const newStreak = percentage >= 60 ? (user.streak || 0) + 1 : 0

      // Update highest score
      const newHighestScore = Math.max(percentage, user.highestScore || 0)

      // Update total games
      const newTotalGames = (user.totalGames || 0) + 1

      // Save updated user data
      const updatedUser = {
        ...user,
        totalScore: newTotalScore,
        streak: newStreak,
        highestScore: newHighestScore,
        totalGames: newTotalGames,
      }

      localStorage.setItem("cortexCalcUser", JSON.stringify(updatedUser))

      // Save quiz history
      const quizResult = {
        difficulty,
        score: percentage,
        date: new Date().toISOString(),
        questionsCount: questions.length,
        correctAnswers: score,
      }

      const storedHistory = localStorage.getItem("cortexCalcQuizHistory")
      const history = storedHistory ? JSON.parse(storedHistory) : []
      history.unshift(quizResult) // Add to beginning of array

      localStorage.setItem("cortexCalcQuizHistory", JSON.stringify(history))
    }
  }

  // Exit quiz
  const exitQuiz = () => {
    router.push("/math-battles")
  }

  // Restart quiz
  const restartQuiz = () => {
    // Generate new questions
    const newQuestions = generateQuestions(difficulty)
    setQuestions(newQuestions)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setNumericAnswer(null)
    setIsAnswerCorrect(null)
    setScore(0)
    setQuizFinished(false)
    setQuizStartTime(Date.now())
    setQuizEndTime(null)
  }

  // Calculate quiz duration in seconds
  const getQuizDuration = () => {
    if (!quizStartTime || !quizEndTime) return 0
    return Math.round((quizEndTime - quizStartTime) / 1000)
  }

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // If quiz is finished, show results
  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100)
    const quizDuration = getQuizDuration()

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <Card className="glass-card border border-mint-500/20 w-full max-w-2xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-mint-500 bg-clip-text text-transparent">
              Quiz Results
            </h1>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2 text-mint-500">{percentage}%</div>
              <p className="text-lg text-muted-foreground">
                You got {score} out of {questions.length} questions correct
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span>Performance:</span>
                <span
                  className={
                    percentage >= 80
                      ? "text-mint-500"
                      : percentage >= 60
                        ? "text-blue-500"
                        : percentage >= 40
                          ? "text-gold-500"
                          : "text-red-500"
                  }
                >
                  {percentage >= 80
                    ? "Excellent!"
                    : percentage >= 60
                      ? "Good!"
                      : percentage >= 40
                        ? "Fair"
                        : "Needs Improvement"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Difficulty:</span>
                <span
                  className={
                    difficulty === "easy"
                      ? "text-blue-500"
                      : difficulty === "medium"
                        ? "text-mint-500"
                        : "text-violet-500"
                  }
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Time:</span>
                <span>{formatTime(quizDuration)}</span>
              </div>
            </div>

            {/* Motivational Quote Section */}
            <MotivationalQuote score={percentage} />

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={restartQuiz}>
                Try Again
              </Button>
              <Button className="flex-1 bg-mint-500 hover:bg-mint-600 text-background" onClick={exitQuiz}>
                Back to Math Battles
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // If no questions or quiz not started yet
  if (!quizStarted || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl text-mint-500 animate-pulse">Loading quiz...</div>
      </div>
    )
  }

  // Quiz in progress
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Quiz Header */}
      <div className="glass-card p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={exitQuiz} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Exit Quiz
          </Button>

          <div className="text-center">
            <h2 className="font-bold bg-gradient-to-r from-blue-500 to-mint-500 bg-clip-text text-transparent">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz
            </h2>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className={`h-5 w-5 ${timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-mint-500"}`} />
            <span className={timeLeft <= 3 ? "text-red-500 font-bold" : "text-mint-500"}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="container mx-auto px-4 mt-2">
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ease-linear rounded-full ${
              timerPercentage > 60 ? "bg-mint-500" : timerPercentage > 30 ? "bg-gold-500" : "bg-red-500"
            }`}
            style={{ width: `${timerPercentage}%` }}
          ></div>
        </div>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-1 mt-2 bg-muted/30" />
      </div>

      {/* Quiz Content */}
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Question */}
        <Card className="glass-card border border-mint-500/20 p-6 mb-6">
          <div className="text-lg md:text-xl mb-4">{currentQuestion.question}</div>

          {/* Question type indicator */}
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            {currentQuestion.type === "word" ? (
              "Word Problem"
            ) : currentQuestion.type === "numeric" ? (
              <>
                <Calculator className="h-3 w-3" /> Numeric Entry
              </>
            ) : (
              "BODMAS Question"
            )}
          </div>
        </Card>

        {/* Answer Options or Numeric Entry */}
        {currentQuestion.type === "numeric" ? (
          <div className="mt-4">
            <NumberPad onSubmit={handleNumericSubmit} disabled={isAnswerCorrect !== null} />

            {isAnswerCorrect !== null && (
              <div
                className={`mt-4 p-4 glass-card border text-center ${
                  isAnswerCorrect ? "border-mint-500/30 text-mint-500" : "border-red-500/30 text-red-500"
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isAnswerCorrect ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span className="font-bold">Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5" />
                      <span className="font-bold">Incorrect</span>
                    </>
                  )}
                </div>
                {!isAnswerCorrect && (
                  <div>
                    The correct answer is: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option: string, index: number) => (
              <Button
                key={index}
                className={`h-auto py-4 px-6 justify-start text-left glass-card border ${
                  selectedAnswer === option
                    ? isAnswerCorrect === null
                      ? "border-blue-500/50 bg-blue-500/10"
                      : isAnswerCorrect
                        ? "border-mint-500/50 bg-mint-500/10"
                        : "border-red-500/50 bg-red-500/10"
                    : option === currentQuestion.correctAnswer && isAnswerCorrect === false
                      ? "border-mint-500/50 bg-mint-500/10"
                      : "border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5"
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswerCorrect !== null}
              >
                <div className="flex items-center w-full">
                  <div className="mr-3 h-6 w-6 rounded-full flex items-center justify-center border border-white/20">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {selectedAnswer === option &&
                    isAnswerCorrect !== null &&
                    (isAnswerCorrect ? (
                      <Check className="h-5 w-5 text-mint-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    ))}
                  {option === currentQuestion.correctAnswer &&
                    selectedAnswer !== option &&
                    isAnswerCorrect === false && <Check className="h-5 w-5 text-mint-500" />}
                </div>
              </Button>
            ))}
          </div>
        )}

        {/* Submit Button - only for multiple choice */}
        {currentQuestion.type !== "numeric" && (
          <div className="mt-8 flex justify-center">
            <Button
              className="bg-mint-500 hover:bg-mint-600 text-background px-8"
              disabled={selectedAnswer === null || isAnswerCorrect !== null}
              onClick={() => handleAnswerSubmit(selectedAnswer)}
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Score Display */}
        <div className="mt-auto pt-4 text-center">
          <div className="text-sm text-muted-foreground">Current Score</div>
          <div className="text-xl font-bold text-mint-500">
            {score} / {questions.length}
          </div>
        </div>
      </div>
    </div>
  )
}
