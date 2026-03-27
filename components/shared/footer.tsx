"use client"

import Link from "next/link"
import { Code2 } from "lucide-react"
import { courseStats } from "@/lib/course-data"
import { primaryNavItems } from "@/lib/landing-content"

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/15">
                <Code2 className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight text-foreground">CodeCSA</p>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Student-first AP CSA prep
                </p>
              </div>
            </div>

            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              A focused AP Computer Science A study platform with a guided roadmap, in-browser Java practice,
              progress tracking, and a cleaner final sprint into exam review.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>{courseStats.moduleCount} modules</span>
              <span>{courseStats.lessonCount} lessons</span>
              <span>{courseStats.practiceCount} practice labs</span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {primaryNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Built for</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>AP CSA self-study</li>
              <li>Concept review before quizzes</li>
              <li>Exam-season repetition</li>
              <li>Browser-based Java reps</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} CodeCSA. Built to make AP CSA practice feel sharper and calmer.</p>
          <p>Classroom photo sourced from Pexels. App built with Next.js, React, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
