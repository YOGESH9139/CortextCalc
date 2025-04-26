"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Quote, Brain, Lightbulb, Star, Zap } from "lucide-react"

interface MotivationalQuoteProps {
  score: number
}

export function MotivationalQuote({ score }: MotivationalQuoteProps) {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [icon, setIcon] = useState<React.ReactNode>(<Quote className="h-6 w-6 text-gold-500" />)

  // Collection of quotes categorized by performance
  const quotesByPerformance = {
    excellent: [
      {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
        icon: <Star className="h-6 w-6 text-gold-500" />,
      },
      {
        quote: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
        author: "William Paul Thurston",
        icon: <Brain className="h-6 w-6 text-mint-500" />,
      },
      {
        quote:
          "The essence of mathematics is not to make simple things complicated, but to make complicated things simple.",
        author: "S. Gudder",
        icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      },
    ],
    good: [
      {
        quote: "The only way to learn mathematics is to do mathematics.",
        author: "Paul Halmos",
        icon: <Brain className="h-6 w-6 text-mint-500" />,
      },
      {
        quote: "Do not worry about your difficulties in mathematics. I can assure you mine are still greater.",
        author: "Albert Einstein",
        icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      },
      {
        quote: "Mathematics is the most beautiful and most powerful creation of the human spirit.",
        author: "Stefan Banach",
        icon: <Star className="h-6 w-6 text-gold-500" />,
      },
    ],
    average: [
      {
        quote: "It's not that I'm so smart, it's just that I stay with problems longer.",
        author: "Albert Einstein",
        icon: <Zap className="h-6 w-6 text-violet-500" />,
      },
      {
        quote:
          "Mathematics may not teach us how to add love or subtract hate, but it gives us hope that every problem has a solution.",
        author: "Anonymous",
        icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      },
      {
        quote: "The best way to learn is to do; the worst way to teach is to talk.",
        author: "Paul Halmos",
        icon: <Brain className="h-6 w-6 text-mint-500" />,
      },
    ],
    needsImprovement: [
      {
        quote: "Mistakes are proof that you are trying.",
        author: "Anonymous",
        icon: <Zap className="h-6 w-6 text-fuchsia-500" />,
      },
      {
        quote:
          "The difference between the novice and the master is that the master has failed more times than the novice has tried.",
        author: "Koro-sensei",
        icon: <Star className="h-6 w-6 text-gold-500" />,
      },
      {
        quote: "Don't worry about your mistakes. They are your greatest teachers.",
        author: "Anonymous",
        icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
      },
    ],
  }

  useEffect(() => {
    // Select quote category based on score
    let category
    if (score >= 80) {
      category = quotesByPerformance.excellent
    } else if (score >= 60) {
      category = quotesByPerformance.good
    } else if (score >= 40) {
      category = quotesByPerformance.average
    } else {
      category = quotesByPerformance.needsImprovement
    }

    // Select a random quote from the category
    const randomIndex = Math.floor(Math.random() * category.length)
    const selectedQuote = category[randomIndex]

    setQuote(selectedQuote.quote)
    setAuthor(selectedQuote.author)
    setIcon(selectedQuote.icon)
  }, [score])

  return (
    <div className="glass-card border border-gold-500/20 p-6 animate-in fade-in-50 slide-in-from-bottom-5">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-background/50 border border-gold-500/30 flex-shrink-0">{icon}</div>
        <div>
          <blockquote className="text-lg italic mb-2">{quote}</blockquote>
          <div className="text-sm text-gold-500">— {author}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-mint-500" />
          <span>
            {score >= 80
              ? "Keep up the excellent work! Your dedication is paying off."
              : score >= 60
                ? "Good progress! Regular practice will help you improve even more."
                : score >= 40
                  ? "You're on the right track. Keep practicing to build your skills."
                  : "Don't give up! Every math master started somewhere. Keep practicing!"}
          </span>
        </div>
      </div>
    </div>
  )
}
