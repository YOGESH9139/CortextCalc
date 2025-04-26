// Types for challenges
export interface Challenge {
  id: string
  title: string
  description: string
  target: number
  progress: number
  color: string
  reward: string
  completed: boolean
}

// Function to update challenge progress
export function updateChallengeProgress(challengeId: string, increment = 1): void {
  const storedChallenges = localStorage.getItem("cortexCalcChallenges")
  if (!storedChallenges) return

  const challenges: Challenge[] = JSON.parse(storedChallenges)

  const updatedChallenges = challenges.map((challenge) => {
    if (challenge.id === challengeId && !challenge.completed) {
      const newProgress = Math.min(challenge.progress + increment, challenge.target)
      return {
        ...challenge,
        progress: newProgress,
        completed: newProgress >= challenge.target,
      }
    }
    return challenge
  })

  localStorage.setItem("cortexCalcChallenges", JSON.stringify(updatedChallenges))
}

// Function to update quiz-related challenges
export function updateQuizChallenges(
  difficulty: string,
  correctAnswers: number,
  totalQuestions: number,
  timeInSeconds: number,
): void {
  // Update correct answers challenge
  updateChallengeProgress("correct-answers", correctAnswers)

  // Update difficulty-specific challenges
  if (difficulty === "easy") {
    updateChallengeProgress("easy-quiz")
  } else if (difficulty === "medium") {
    updateChallengeProgress("medium-quiz")
  } else if (difficulty === "hard") {
    updateChallengeProgress("hard-quiz")
  }

  // Check for time challenge (complete quiz with 80% score in under 2 minutes)
  const scorePercentage = (correctAnswers / totalQuestions) * 100
  if (scorePercentage >= 80 && timeInSeconds < 120) {
    updateChallengeProgress("time-challenge")
  }
}

// Function to check if challenges need to be reset
export function checkChallengeReset(): boolean {
  const today = new Date().toDateString()
  const lastReset = localStorage.getItem("cortexCalcChallengesLastReset")

  if (lastReset !== today) {
    return true
  }

  return false
}

// Function to get total XP earned from completed challenges
export function getTotalChallengeXP(): number {
  const storedChallenges = localStorage.getItem("cortexCalcChallenges")
  if (!storedChallenges) return 0

  const challenges: Challenge[] = JSON.parse(storedChallenges)

  return challenges.reduce((total, challenge) => {
    if (challenge.completed) {
      // Extract XP value from reward string (e.g., "+25 XP" -> 25)
      const xp = Number.parseInt(challenge.reward.match(/\d+/)?.[0] || "0")
      return total + xp
    }
    return total
  }, 0)
}
