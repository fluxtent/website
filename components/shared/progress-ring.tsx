"use client"

import { useEffect, useState } from "react"

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  showLabel?: boolean
  labelClassName?: string
  color?: string
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className = "",
  showLabel = true,
  labelClassName = "",
  color,
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(Math.min(progress, 100))
    }, 200)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-40"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color || "url(#progressGradient)"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(243 75% 59%)" />
            <stop offset="100%" stopColor="hsl(280 75% 55%)" />
          </linearGradient>
        </defs>
      </svg>
      {showLabel && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${labelClassName}`}>
          <span className="text-2xl font-bold text-foreground">{Math.round(progress)}%</span>
          <span className="text-xs text-muted-foreground">complete</span>
        </div>
      )}
    </div>
  )
}
