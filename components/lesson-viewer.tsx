"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  GraduationCap,
  Lightbulb,
  Target,
} from "lucide-react"
import Navbar from "@/components/shared/navbar"
import CodeEditor from "@/components/code-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { moduleNameMap } from "@/lib/course-data"
import { moduleContent } from "@/lib/module-content"
import type { PracticeLesson, UserLessonProgress } from "@/types/course"

interface LessonViewerProps {
  moduleId: number
  initialLessonId?: string | null
  onBack: () => void
  onLessonChange?: (lessonId: string) => void
  userProgress?: Record<number, UserLessonProgress>
  onProgressUpdate?: () => void
}

export default function LessonViewer({
  moduleId,
  initialLessonId = null,
  onBack,
  onLessonChange,
  userProgress,
  onProgressUpdate,
}: LessonViewerProps) {
  const { data: session } = useSession()
  const lessons = useMemo(() => moduleContent[moduleId] ?? [], [moduleId])
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({})

  const currentLesson = lessons[currentLessonIndex]
  const completedCount = Object.values(completedLessons).filter(Boolean).length
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0

  const handleLessonComplete = useCallback(
    async (lessonId: string) => {
      if (!session?.user || !lessonId) {
        return
      }

      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleId, lessonId }),
        })

        if (!response.ok) {
          return
        }

        setCompletedLessons((prev) => ({ ...prev, [lessonId]: true }))

        if (onProgressUpdate) {
          setTimeout(() => onProgressUpdate(), 300)
        }
      } catch (error) {
        console.error("Error saving progress:", error)
      }
    },
    [moduleId, onProgressUpdate, session?.user]
  )

  useEffect(() => {
    const nextCompletedLessons = userProgress?.[moduleId]?.lessons ?? {}
    setCompletedLessons(nextCompletedLessons)
  }, [moduleId, userProgress])

  useEffect(() => {
    if (!lessons.length) {
      setCurrentLessonIndex(0)
      return
    }

    if (!initialLessonId) {
      setCurrentLessonIndex(0)
      return
    }

    const initialIndex = lessons.findIndex((lesson) => lesson.id === initialLessonId)
    setCurrentLessonIndex(initialIndex >= 0 ? initialIndex : 0)
  }, [initialLessonId, lessons])

  useEffect(() => {
    if (!currentLesson?.id || !onLessonChange) {
      return
    }

    onLessonChange(currentLesson.id)
  }, [currentLesson?.id, onLessonChange])

  useEffect(() => {
    if (
      !session?.user ||
      !currentLesson?.id ||
      currentLesson.type !== "theory" ||
      completedLessons[currentLesson.id]
    ) {
      return
    }

    const timer = setTimeout(() => {
      void handleLessonComplete(currentLesson.id)
    }, 2000)

    return () => clearTimeout(timer)
  }, [completedLessons, currentLesson, handleLessonComplete, session?.user])

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((index) => index + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((index) => index - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleExerciseSuccess = async () => {
    if (currentLesson?.type !== "practice") {
      return
    }

    setCompletedLessons((prev) => ({ ...prev, [currentLesson.id]: true }))
    await handleLessonComplete(currentLesson.id)
  }

  const renderContent = (content: string) => {
    return content
      .replace(
        /```java\n([\s\S]*?)\n```/g,
        '<pre class="mb-4 overflow-x-auto rounded-xl border border-border bg-secondary/80 p-4 text-sm"><code class="font-mono text-foreground">$1</code></pre>'
      )
      .replace(
        /```\n([\s\S]*?)\n```/g,
        '<pre class="mb-4 overflow-x-auto rounded-xl border border-border bg-secondary/80 p-4 text-sm"><code class="font-mono text-foreground">$1</code></pre>'
      )
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm font-medium text-primary">$1</code>'
      )
      .replace(/^# (.*$)/gm, '<h1 class="mb-5 mt-0 text-2xl font-bold text-foreground">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="mb-4 mt-8 text-xl font-semibold text-foreground">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="mb-3 mt-6 text-lg font-semibold text-foreground">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gm, "<strong class='font-semibold text-foreground'>$1</strong>")
      .replace(/^- (.*$)/gm, '<li class="ml-4 leading-relaxed text-muted-foreground">- $1</li>')
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar showBack onBack={onBack} title={`Module ${moduleId}`} />
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">Content coming soon</h2>
            <p className="mb-6 text-muted-foreground">
              This module is still being assembled. Head back to the roadmap and keep working through the available units.
            </p>
            <Button onClick={onBack} variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to modules
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isCurrentLessonComplete = Boolean(completedLessons[currentLesson.id])
  const practiceLesson =
    currentLesson.type === "practice" ? (currentLesson as PracticeLesson) : null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar
        showBack
        onBack={onBack}
        title={moduleNameMap[moduleId] || `Module ${moduleId}`}
        subtitle={`Lesson ${currentLessonIndex + 1} of ${lessons.length}`}
      />

      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={currentLesson.type === "theory" ? "secondary" : "default"} className="gap-1 text-xs">
                {currentLesson.type === "theory" ? (
                  <>
                    <BookOpen className="h-3 w-3" /> Theory
                  </>
                ) : (
                  <>
                    <Code2 className="h-3 w-3" /> Practice
                  </>
                )}
              </Badge>
              <span className="text-sm font-medium text-foreground">{currentLesson.title}</span>
              {isCurrentLessonComplete && <CheckCircle className="h-4 w-4 text-emerald-400" />}
            </div>
            <span className="text-xs text-muted-foreground">
              {completedCount}/{lessons.length} completed
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full gradient-primary transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex-1 px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
                <div className="border-b border-border p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Lesson navigation
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {completedCount} of {lessons.length} complete
                  </p>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {lessons.map((lesson, index) => {
                    const isActive = index === currentLessonIndex
                    const isDone = Boolean(completedLessons[lesson.id])

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setCurrentLessonIndex(index)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className={`mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        <div className="shrink-0">
                          {isDone ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 text-[8px] font-bold ${
                                isActive ? "border-primary text-primary" : "border-muted-foreground/30"
                              }`}
                            >
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <span className="flex-1 truncate">{lesson.title}</span>
                        <div className="shrink-0">
                          {lesson.type === "theory" ? (
                            <BookOpen className="h-3 w-3 opacity-40" />
                          ) : (
                            <Code2 className="h-3 w-3 opacity-40" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <article className="animate-fade-in overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
              <div className="border-b border-border p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {currentLesson.type === "theory" ? "Theory" : "Practice"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Lesson {currentLessonIndex + 1} of {lessons.length}
                      </span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">{currentLesson.title}</h1>
                  </div>
                  {isCurrentLessonComplete && (
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">Completed</span>
                    </div>
                  )}
                </div>

                {currentLesson.type === "theory" && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/10 bg-primary/5 p-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Learning objective:</span>{" "}
                      Read the explanation and examples below. Signed-in students get this lesson marked complete automatically after a short view.
                    </p>
                  </div>
                )}

                {practiceLesson && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Practice goal:</span>{" "}
                      Write code that matches the expected output, then run it until the drill passes cleanly.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div
                  className="lesson-prose"
                  dangerouslySetInnerHTML={{
                    __html: renderContent(currentLesson.content ?? ""),
                  }}
                />

                {currentLesson.codeExample && (
                  <div className="mt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Code2 className="h-4 w-4 text-primary" />
                      Code example
                    </h3>
                    <CodeEditor initialCode={currentLesson.codeExample} readOnly />
                  </div>
                )}

                {practiceLesson && (
                  <div className="mt-8 border-t border-border pt-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Code2 className="h-4 w-4 text-primary" />
                        Coding exercise
                      </h3>
                      {isCurrentLessonComplete && (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-semibold">Solved</span>
                        </div>
                      )}
                    </div>
                    <div className="mb-5 rounded-xl border border-border bg-secondary/30 p-4">
                      <p className="text-sm text-muted-foreground">{practiceLesson.exercise.description}</p>
                    </div>
                    <CodeEditor
                      starterCode={practiceLesson.exercise.starterCode}
                      expectedOutput={practiceLesson.exercise.expectedOutput}
                      testCases={practiceLesson.exercise.testCases}
                      onSuccess={handleExerciseSuccess}
                    />
                  </div>
                )}

                <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentLessonIndex === 0}
                    variant="outline"
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="hidden items-center gap-1 sm:flex">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setCurrentLessonIndex(index)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className={`h-2 rounded-full transition-all ${
                          index === currentLessonIndex
                            ? "w-6 bg-primary"
                            : completedLessons[lesson.id]
                              ? "w-2 bg-emerald-400"
                              : "w-2 bg-border hover:bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  {currentLessonIndex < lessons.length - 1 ? (
                    <Button onClick={handleNext} className="gap-2 gradient-primary text-white border-0">
                      Next lesson
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={onBack} className="gap-2 gradient-primary text-white border-0">
                      Back to modules
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
