"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, MessageSquare } from "lucide-react"
import Link from "next/link"

interface FeedbackSuccessProps {
  userName: string
}

export function FeedbackSuccess({ userName }: FeedbackSuccessProps) {
  return (
    <main className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="glass-card border border-mint-500/20 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-mint-500/10 border border-mint-500/30 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-mint-500" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-mint-500 to-blue-500 bg-clip-text text-transparent">
            Thank You, {userName}!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Your feedback has been submitted successfully. We appreciate your input and will use it to improve
            CortexCalc Brain Trainer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600">
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/math-battles">
              <Button className="w-full sm:w-auto bg-mint-500 hover:bg-mint-600 text-background">
                <MessageSquare className="h-5 w-5 mr-2" />
                Math Battles
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 glass-card border border-gold-500/20 text-sm">
            <p className="text-gold-500 font-medium mb-1">Did you know?</p>
            <p className="text-muted-foreground">
              Regular practice with math problems can improve your cognitive abilities and problem-solving skills in
              other areas of life!
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
