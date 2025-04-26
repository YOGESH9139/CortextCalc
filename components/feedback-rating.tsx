"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface FeedbackRatingProps {
  value: number
  onChange: (value: number) => void
}

export function FeedbackRating({ value, onChange }: FeedbackRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const handleMouseEnter = (index: number) => {
    setHoverValue(index)
  }

  const handleMouseLeave = () => {
    setHoverValue(0)
  }

  const handleClick = (index: number) => {
    onChange(index)
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          type="button"
          className="p-1 focus:outline-none"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          aria-label={`Rate ${index} out of 5 stars`}
        >
          <Star
            className={`h-6 w-6 transition-all ${
              index <= (hoverValue || value) ? "text-gold-500 fill-gold-500" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}

      <span className="ml-2 text-sm">
        {value > 0 ? (
          <span className="text-gold-500">{value}/5</span>
        ) : (
          <span className="text-muted-foreground">Not rated</span>
        )}
      </span>
    </div>
  )
}
