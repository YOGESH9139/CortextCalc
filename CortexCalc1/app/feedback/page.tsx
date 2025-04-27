"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ArrowLeft, Star, Send, ThumbsUp, AlertCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import { FeedbackRating } from "@/components/feedback-rating"
import { FeedbackSuccess } from "@/components/feedback-success"
import { Brain } from "lucide-react"

export default function FeedbackPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form state
  const [ratings, setRatings] = useState({
    overall: 0,
    difficulty: 0,
    design: 0,
    content: 0,
  })
  const [feedback, setFeedback] = useState({
    comments: "",
    suggestions: "",
    bugs: "",
    email: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("cortexCalcUser")
    if (!storedUser) {
      window.location.href = "/"
      return
    }

    const user = JSON.parse(storedUser)
    setUserName(user.name)

    // Remove artificial delay - load immediately
    setIsLoading(false)
  }, [])

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call with reduced delay (500ms instead of 1500ms)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Store feedback in localStorage for demo purposes
      const feedbackData = {
        ratings,
        feedback,
        userName,
        date: new Date().toISOString(),
      }

      const storedFeedback = localStorage.getItem("cortexCalcFeedback")
      const feedbackHistory = storedFeedback ? JSON.parse(storedFeedback) : []
      feedbackHistory.push(feedbackData)
      localStorage.setItem("cortexCalcFeedback", JSON.stringify(feedbackHistory))
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-md bg-blue-500/10 animate-pulse mr-4"></div>
            <div className="h-8 w-48 bg-blue-500/10 rounded-md animate-pulse"></div>
          </div>

          <div className="glass-card border border-white/10 animate-pulse">
            <div className="p-6">
              <div className="h-6 w-48 bg-violet-500/10 rounded-md animate-pulse mb-6"></div>
              <div className="h-4 w-full bg-white/5 rounded-md animate-pulse mb-8"></div>

              <div className="space-y-8">
                <div className="h-32 w-full bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-32 w-full bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-violet-500/10 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return <FeedbackSuccess userName={userName} />
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Feedback
          </h1>
        </div>

        <Card className="glass-card border border-violet-500/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-violet-500" />
              <span>Share Your Thoughts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Your feedback helps us improve CortexCalc Brain Trainer. Let us know what you think about the app, suggest
              new features, or report any issues you've encountered.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Ratings Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-violet-500">Rate Your Experience</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card border border-violet-500/10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Experience</span>
                      <Star className="h-4 w-4 text-gold-500" />
                    </div>
                    <FeedbackRating
                      value={ratings.overall}
                      onChange={(value) => handleRatingChange("overall", value)}
                    />
                  </div>

                  <div className="glass-card border border-violet-500/10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Difficulty Level</span>
                      <Brain className="h-4 w-4 text-mint-500" />
                    </div>
                    <FeedbackRating
                      value={ratings.difficulty}
                      onChange={(value) => handleRatingChange("difficulty", value)}
                    />
                  </div>

                  <div className="glass-card border border-violet-500/10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Visual Design</span>
                      <svg
                        className="h-4 w-4 text-fuchsia-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="4"></circle>
                        <line x1="21.17" y1="8" x2="12" y2="8"></line>
                        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                      </svg>
                    </div>
                    <FeedbackRating value={ratings.design} onChange={(value) => handleRatingChange("design", value)} />
                  </div>

                  <div className="glass-card border border-violet-500/10 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Content Quality</span>
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </div>
                    <FeedbackRating
                      value={ratings.content}
                      onChange={(value) => handleRatingChange("content", value)}
                    />
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-violet-500">Your Comments</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-blue-500" />
                      <label htmlFor="comments" className="text-sm font-medium">
                        What do you like about CortexCalc?
                      </label>
                    </div>
                    <Textarea
                      id="comments"
                      name="comments"
                      value={feedback.comments}
                      onChange={handleInputChange}
                      placeholder="Share what you enjoy about the app..."
                      className="glass-card border-blue-500/30 focus:border-blue-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-mint-500" />
                      <label htmlFor="suggestions" className="text-sm font-medium">
                        Suggestions for Improvement
                      </label>
                    </div>
                    <Textarea
                      id="suggestions"
                      name="suggestions"
                      value={feedback.suggestions}
                      onChange={handleInputChange}
                      placeholder="What features would you like to see added or improved?"
                      className="glass-card border-mint-500/30 focus:border-mint-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <label htmlFor="bugs" className="text-sm font-medium">
                        Report Issues or Bugs
                      </label>
                    </div>
                    <Textarea
                      id="bugs"
                      name="bugs"
                      value={feedback.bugs}
                      onChange={handleInputChange}
                      placeholder="Describe any problems you've encountered..."
                      className="glass-card border-red-500/30 focus:border-red-500 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-violet-500" />
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address (Optional)
                  </label>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={feedback.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="glass-card border-violet-500/30 focus:border-violet-500"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll only use this to follow up on your feedback if needed.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 neon-violet-glow"
                disabled={isSubmitting}
              >
                <Send className="h-5 w-5 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
