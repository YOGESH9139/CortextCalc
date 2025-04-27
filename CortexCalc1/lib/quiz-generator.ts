// Types for questions
type Question = {
  question: string
  options: string[]
  correctAnswer: string
  type: "bodmas" | "word" | "numeric"
}

// Function to generate random number within range
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to shuffle array - rewritten to avoid generic syntax issues
function shuffleArray(array: any[]): any[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate BODMAS questions based on difficulty
const generateBodmasQuestion = (difficulty: string): Question => {
  let question = ""
  let answer = 0
  const operations = ["+", "-", "*", "/"]

  if (difficulty === "easy") {
    // Simple operations with 2 numbers
    const num1 = getRandomNumber(1, 20)
    const num2 = getRandomNumber(1, 20)
    const operation = operations[getRandomNumber(0, 1)] // Only + and - for easy

    question = `${num1} ${operation} ${num2}`
    answer = operation === "+" ? num1 + num2 : num1 - num2
  } else if (difficulty === "medium") {
    // More complex operations with 3 numbers and brackets
    const num1 = getRandomNumber(1, 30)
    const num2 = getRandomNumber(1, 20)
    const num3 = getRandomNumber(1, 15)
    const op1 = operations[getRandomNumber(0, 3)]
    const op2 = operations[getRandomNumber(0, 3)]

    // Ensure division is clean
    if (op1 === "/" || op2 === "/") {
      // Make sure division results in whole numbers
      if (op1 === "/") {
        const factor = getRandomNumber(1, 10)
        question = `(${num1 * factor} ${op1} ${factor}) ${op2} ${num3}`
        answer =
          op2 === "+" ? num1 + num3 : op2 === "-" ? num1 - num3 : op2 === "*" ? num1 * num3 : Math.floor(num1 / num3)
      } else {
        const factor = getRandomNumber(1, 10)
        question = `${num1} ${op1} (${num2 * factor} ${op2} ${factor})`
        answer =
          op1 === "+" ? num1 + num2 : op1 === "-" ? num1 - num2 : op1 === "*" ? num1 * num2 : Math.floor(num1 / num2)
      }
    } else {
      // Regular question with brackets
      question = `${num1} ${op1} (${num2} ${op2} ${num3})`

      // Calculate inner bracket first
      let innerResult = 0
      if (op2 === "+") innerResult = num2 + num3
      else if (op2 === "-") innerResult = num2 - num3
      else if (op2 === "*") innerResult = num2 * num3
      else innerResult = Math.floor(num2 / num3)

      // Calculate final result
      if (op1 === "+") answer = num1 + innerResult
      else if (op1 === "-") answer = num1 - innerResult
      else if (op1 === "*") answer = num1 * innerResult
      else answer = Math.floor(num1 / innerResult)
    }
  } else {
    // Hard: Complex operations with 4 numbers and nested brackets
    const num1 = getRandomNumber(5, 40)
    const num2 = getRandomNumber(5, 30)
    const num3 = getRandomNumber(5, 20)
    const num4 = getRandomNumber(5, 15)

    const op1 = operations[getRandomNumber(0, 3)]
    const op2 = operations[getRandomNumber(0, 3)]
    const op3 = operations[getRandomNumber(0, 3)]

    // Create a complex expression with nested brackets
    question = `(${num1} ${op1} ${num2}) ${op2} (${num3} ${op3} ${num4})`

    // Calculate first bracket
    let firstBracket = 0
    if (op1 === "+") firstBracket = num1 + num2
    else if (op1 === "-") firstBracket = num1 - num2
    else if (op1 === "*") firstBracket = num1 * num2
    else firstBracket = Math.floor(num1 / num2)

    // Calculate second bracket
    let secondBracket = 0
    if (op3 === "+") secondBracket = num3 + num4
    else if (op3 === "-") secondBracket = num3 - num4
    else if (op3 === "*") secondBracket = num3 * num4
    else secondBracket = Math.floor(num3 / num4)

    // Calculate final result
    if (op2 === "+") answer = firstBracket + secondBracket
    else if (op2 === "-") answer = firstBracket - secondBracket
    else if (op2 === "*") answer = firstBracket * secondBracket
    else answer = Math.floor(firstBracket / secondBracket)
  }

  // Format the question with proper symbols
  question = question.replace(/\*/g, "×").replace(/\//g, "÷")

  // Generate options (including the correct answer)
  const correctAnswerStr = answer.toString()
  const options = [correctAnswerStr]

  // Generate 3 wrong options
  while (options.length < 4) {
    let wrongAnswer = 0

    // Generate plausible wrong answers
    if (difficulty === "easy") {
      wrongAnswer = answer + getRandomNumber(-5, 5)
    } else if (difficulty === "medium") {
      wrongAnswer = answer + getRandomNumber(-10, 10)
    } else {
      wrongAnswer = answer + getRandomNumber(-20, 20)
    }

    // Ensure wrong answer is not the same as correct answer and not already in options
    if (wrongAnswer !== answer && !options.includes(wrongAnswer.toString())) {
      options.push(wrongAnswer.toString())
    }
  }

  return {
    question: `Calculate: ${question}`,
    options: shuffleArray(options),
    correctAnswer: correctAnswerStr,
    type: "bodmas",
  }
}

// Generate numeric entry questions
const generateNumericQuestion = (difficulty: string): Question => {
  let question = ""
  let answer = 0
  const operations = ["+", "-", "*", "/"]

  if (difficulty === "easy") {
    // Simple operations with 2-3 numbers
    const num1 = getRandomNumber(5, 25)
    const num2 = getRandomNumber(5, 25)
    const num3 = getRandomNumber(2, 10)
    const op1 = operations[getRandomNumber(0, 1)] // Only + and - for easy
    const op2 = operations[getRandomNumber(0, 1)]

    // 50% chance of 2 numbers, 50% chance of 3 numbers
    if (getRandomNumber(0, 1) === 0) {
      question = `${num1} ${op1} ${num2}`
      answer = op1 === "+" ? num1 + num2 : num1 - num2
    } else {
      question = `${num1} ${op1} ${num2} ${op2} ${num3}`

      // Calculate result
      const intermediate = op1 === "+" ? num1 + num2 : num1 - num2
      answer = op2 === "+" ? intermediate + num3 : intermediate - num3
    }
  } else if (difficulty === "medium") {
    // More complex operations with 3 numbers and brackets
    const num1 = getRandomNumber(10, 50)
    const num2 = getRandomNumber(5, 30)
    const num3 = getRandomNumber(2, 15)
    const op1 = operations[getRandomNumber(0, 2)] // +, -, or * for medium
    const op2 = operations[getRandomNumber(0, 2)]

    // 70% chance of brackets
    if (getRandomNumber(0, 9) < 7) {
      question = `${num1} ${op1} (${num2} ${op2} ${num3})`

      // Calculate inner bracket first
      let innerResult = 0
      if (op2 === "+") innerResult = num2 + num3
      else if (op2 === "-") innerResult = num2 - num3
      else innerResult = num2 * num3

      // Calculate final result
      if (op1 === "+") answer = num1 + innerResult
      else if (op1 === "-") answer = num1 - innerResult
      else answer = num1 * innerResult
    } else {
      question = `${num1} ${op1} ${num2} ${op2} ${num3}`

      // Apply order of operations (BODMAS)
      if (op1 === "*" && (op2 === "+" || op2 === "-")) {
        // Multiply first, then add/subtract
        const product = num1 * num2
        answer = op2 === "+" ? product + num3 : product - num3
      } else if (op2 === "*" && (op1 === "+" || op1 === "-")) {
        // Multiply first, then add/subtract
        const product = num2 * num3
        answer = op1 === "+" ? num1 + product : num1 - product
      } else {
        // Left to right for same precedence
        const intermediate = op1 === "+" ? num1 + num2 : op1 === "-" ? num1 - num2 : num1 * num2
        answer = op2 === "+" ? intermediate + num3 : op2 === "-" ? intermediate - num3 : intermediate * num3
      }
    }
  } else {
    // Hard: Complex operations with 4 numbers and nested brackets
    const num1 = getRandomNumber(5, 50)
    const num2 = getRandomNumber(5, 40)
    const num3 = getRandomNumber(5, 30)
    const num4 = getRandomNumber(2, 20)

    const op1 = operations[getRandomNumber(0, 2)] // +, -, or * for hard
    const op2 = operations[getRandomNumber(0, 2)]
    const op3 = operations[getRandomNumber(0, 2)]

    // Create a complex expression with nested brackets
    question = `(${num1} ${op1} ${num2}) ${op2} (${num3} ${op3} ${num4})`

    // Calculate first bracket
    let firstBracket = 0
    if (op1 === "+") firstBracket = num1 + num2
    else if (op1 === "-") firstBracket = num1 - num2
    else firstBracket = num1 * num2

    // Calculate second bracket
    let secondBracket = 0
    if (op3 === "+") secondBracket = num3 + num4
    else if (op3 === "-") secondBracket = num3 - num4
    else secondBracket = num3 * num4

    // Calculate final result
    if (op2 === "+") answer = firstBracket + secondBracket
    else if (op2 === "-") answer = firstBracket - secondBracket
    else answer = firstBracket * secondBracket
  }

  // Format the question with proper symbols
  question = question.replace(/\*/g, "×")

  // For numeric questions, we don't need options
  return {
    question: `Calculate: ${question}`,
    options: [], // No options for numeric entry
    correctAnswer: answer.toString(),
    type: "numeric",
  }
}

// Generate word problems based on difficulty
const generateWordProblem = (difficulty: string): Question => {
  const templates: {
    [key: string]: Array<{
      template: string
      generateNums: () => Record<string, number>
      calculate: (...args: number[]) => number
    }>
  } = {
    easy: [
      {
        template:
          "Sarah has {num1} apples. She gives {num2} apples to her friend. How many apples does Sarah have left?",
        generateNums: () => {
          const num1 = getRandomNumber(10, 30)
          const num2 = getRandomNumber(1, num1 - 1)
          return { num1, num2 }
        },
        calculate: (num1: number, num2: number) => num1 - num2,
      },
      {
        template:
          "John has {num1} candies. His mother gives him {num2} more candies. How many candies does John have now?",
        generateNums: () => {
          const num1 = getRandomNumber(5, 25)
          const num2 = getRandomNumber(5, 15)
          return { num1, num2 }
        },
        calculate: (num1: number, num2: number) => num1 + num2,
      },
      {
        template:
          "There are {num1} students in a class. If they are divided into groups of {num2}, how many complete groups can be formed?",
        generateNums: () => {
          const num2 = getRandomNumber(2, 10)
          const num1 = num2 * getRandomNumber(2, 10)
          return { num1, num2 }
        },
        calculate: (num1: number, num2: number) => Math.floor(num1 / num2),
      },
    ],
    medium: [
      {
        template:
          "A bookstore received {num1} books. They sold {num2} books in the morning and {num3} books in the afternoon. How many books are left?",
        generateNums: () => {
          const num1 = getRandomNumber(50, 100)
          const num2 = getRandomNumber(10, 30)
          const num3 = getRandomNumber(10, 30)
          return { num1, num2, num3 }
        },
        calculate: (num1: number, num2: number, num3: number) => num1 - num2 - num3,
      },
      {
        template:
          "A factory produces {num1} widgets per hour. If it operates for {num2} hours a day for {num3} days, how many widgets will it produce in total?",
        generateNums: () => {
          const num1 = getRandomNumber(10, 50)
          const num2 = getRandomNumber(6, 12)
          const num3 = getRandomNumber(3, 7)
          return { num1, num2, num3 }
        },
        calculate: (num1: number, num2: number, num3: number) => num1 * num2 * num3,
      },
      {
        template:
          "A train travels at {num1} kilometers per hour. How far will it travel in {num2} hours and {num3} minutes?",
        generateNums: () => {
          const num1 = getRandomNumber(60, 120)
          const num2 = getRandomNumber(1, 5)
          const num3 = getRandomNumber(1, 59)
          return { num1, num2, num3 }
        },
        calculate: (num1: number, num2: number, num3: number) => num1 * (num2 + num3 / 60),
      },
    ],
    hard: [
      {
        template:
          "A store sells notebooks for ${num1} each and pens for ${num2} each. If a student buys {num3} notebooks and {num4} pens, how much change will they receive from a ${num5} bill?",
        generateNums: () => {
          const num1 = getRandomNumber(3, 8)
          const num2 = getRandomNumber(1, 4)
          const num3 = getRandomNumber(2, 5)
          const num4 = getRandomNumber(3, 8)
          const total = num1 * num3 + num2 * num4
          const num5 = total + getRandomNumber(5, 20)
          return { num1, num2, num3, num4, num5 }
        },
        calculate: (num1: number, num2: number, num3: number, num4: number, num5: number) =>
          num5 - (num1 * num3 + num2 * num4),
      },
      {
        template:
          "A rectangular swimming pool is {num1} meters long and {num2} meters wide. If the pool is {num3} meters deep, how many cubic meters of water are needed to fill it to {num4}% of its capacity?",
        generateNums: () => {
          const num1 = getRandomNumber(10, 25)
          const num2 = getRandomNumber(5, 15)
          const num3 = getRandomNumber(1, 3)
          const num4 = getRandomNumber(60, 95)
          return { num1, num2, num3, num4 }
        },
        calculate: (num1: number, num2: number, num3: number, num4: number) => num1 * num2 * num3 * (num4 / 100),
      },
      {
        template:
          "A car travels at {num1} km/h for {num2} hours, then at {num3} km/h for {num4} hours. What is the average speed for the entire journey?",
        generateNums: () => {
          const num1 = getRandomNumber(50, 90)
          const num2 = getRandomNumber(1, 4)
          const num3 = getRandomNumber(60, 100)
          const num4 = getRandomNumber(1, 4)
          return { num1, num2, num3, num4 }
        },
        calculate: (num1: number, num2: number, num3: number, num4: number) => {
          const totalDistance = num1 * num2 + num3 * num4
          const totalTime = num2 + num4
          return totalDistance / totalTime
        },
      },
    ],
  }

  // Select template based on difficulty
  const difficultyTemplates =
    difficulty === "easy" ? templates.easy : difficulty === "medium" ? templates.medium : templates.hard

  const selectedTemplate = difficultyTemplates[getRandomNumber(0, difficultyTemplates.length - 1)]

  // Generate numbers for the template
  const nums = selectedTemplate.generateNums()

  // Create the question by replacing placeholders
  let question = selectedTemplate.template
  Object.keys(nums).forEach((key) => {
    question = question.replace(`{${key}}`, nums[key as keyof typeof nums].toString())
  })

  // Calculate the answer
  const values = Object.values(nums)
  const answer = Math.round(selectedTemplate.calculate(...values))
  const correctAnswerStr = answer.toString()

  // Generate options
  const options = [correctAnswerStr]

  // Generate wrong options
  while (options.length < 4) {
    let wrongAnswer = 0

    // Generate plausible wrong answers
    if (difficulty === "easy") {
      wrongAnswer = answer + getRandomNumber(-5, 5)
    } else if (difficulty === "medium") {
      wrongAnswer = answer + getRandomNumber(-10, 10)
    } else {
      wrongAnswer = answer + getRandomNumber(-20, 20)
    }

    // Ensure wrong answer is not the same as correct answer and not already in options
    if (wrongAnswer !== answer && !options.includes(wrongAnswer.toString())) {
      options.push(wrongAnswer.toString())
    }
  }

  return {
    question,
    options: shuffleArray(options),
    correctAnswer: correctAnswerStr,
    type: "word",
  }
}

// Main function to generate questions based on difficulty
function generateQuestions(difficulty: string): Question[] {
  const questions: Question[] = []

  if (difficulty === "easy") {
    // 8 BODMAS questions, 2 numeric entry questions for easy
    for (let i = 0; i < 8; i++) {
      questions.push(generateBodmasQuestion("easy"))
    }
    for (let i = 0; i < 2; i++) {
      questions.push(generateNumericQuestion("easy"))
    }
  } else if (difficulty === "medium") {
    // 6 BODMAS questions, 2 numeric entry questions, 2 word problems for medium
    for (let i = 0; i < 6; i++) {
      questions.push(generateBodmasQuestion("medium"))
    }
    for (let i = 0; i < 2; i++) {
      questions.push(generateNumericQuestion("medium"))
    }
    for (let i = 0; i < 2; i++) {
      questions.push(generateWordProblem("easy"))
    }
  } else {
    // 3 BODMAS questions, 2 numeric entry questions, 5 word problems for hard
    for (let i = 0; i < 3; i++) {
      questions.push(generateBodmasQuestion("hard"))
    }
    for (let i = 0; i < 2; i++) {
      questions.push(generateNumericQuestion("hard"))
    }
    for (let i = 0; i < 5; i++) {
      questions.push(generateWordProblem("medium"))
    }
  }

  // Shuffle the questions
  return shuffleArray(questions)
}

// Export the function
export default generateQuestions
export type { Question }
