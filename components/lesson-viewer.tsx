'use client'

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Code2, CheckCircle } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import Settings from "@/components/settings"
import { moduleContent } from "@/lib/module-content"

interface LessonViewerProps {
  moduleId: number
  onBack: () => void
  userProgress?: Record<number, { completed: number; lessons: Record<string, boolean> }>
  onProgressUpdate?: () => void
}

export default function LessonViewer({ moduleId, onBack, userProgress, onProgressUpdate }: LessonViewerProps) {
  const { data: session } = useSession()
  const lessons = moduleContent[moduleId] || []
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({})
  const currentLesson = lessons[currentLessonIndex]

  const handleLessonComplete = useCallback(async (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId)
    if (!lesson) return
    
    lesson.completed = true
    
    // Save progress if user is signed in
    if (session?.user && lessonId) {
      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleId,
            lessonId: lessonId,
          }),
        })
        
        if (response.ok) {
          setCompletedLessons((prev) => ({
            ...prev,
            [lessonId]: true,
          }))
          
          // Refresh progress in parent component
          if (onProgressUpdate) {
            setTimeout(() => onProgressUpdate(), 500)
          }
        }
      } catch (error) {
        console.error("Error saving progress:", error)
      }
    }
  }, [session, moduleId, lessons, onProgressUpdate])

  useEffect(() => {
    // Load completed lessons from user progress
    if (userProgress?.[moduleId]?.lessons) {
      setCompletedLessons(userProgress[moduleId].lessons)
      // Mark lessons as completed in the lessons array
      lessons.forEach((lesson) => {
        if (userProgress[moduleId].lessons[lesson.id]) {
          lesson.completed = true
        }
      })
    }
  }, [moduleId, userProgress])

  // Mark theory lessons as completed when viewed (after a short delay)
  useEffect(() => {
    if (currentLesson && currentLesson.type === 'theory' && session?.user && currentLesson.id) {
      const timer = setTimeout(() => {
        // Only mark as completed if not already completed
        if (!completedLessons[currentLesson.id]) {
          handleLessonComplete(currentLesson.id)
        }
      }, 2000) // Mark as completed after 2 seconds of viewing
      
      return () => clearTimeout(timer)
    }
  }, [currentLessonIndex, session, currentLesson, completedLessons, handleLessonComplete])

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleExerciseSuccess = async () => {
    const lesson = lessons[currentLessonIndex]
    if (lesson?.id) {
      // Immediately update local state to show checkmark
      setCompletedLessons((prev) => ({
        ...prev,
        [lesson.id]: true,
      }))
      lesson.completed = true
      
      // Then save to server
      await handleLessonComplete(lesson.id)
    }
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Settings />
        <div className="container mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Module Content Coming Soon</h2>
              <p className="text-muted-foreground">This module's lessons are being prepared. Check back soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Settings />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Module {moduleId}</h1>
            <p className="text-muted-foreground">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </p>
          </div>
          <div className="w-24" />
        </div>

        <div className="mb-6">
          <Progress value={((currentLessonIndex + 1) / lessons.length) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors border ${
                        index === currentLessonIndex
                          ? "bg-blue-900/20 border-blue-400 text-blue-100"
                          : "bg-card hover:bg-accent border-border text-card-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lesson.type === "theory" && <BookOpen className="h-4 w-4" />}
                          {lesson.type === "practice" && <Code2 className="h-4 w-4" />}
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        {(lesson.completed || completedLessons[lesson.id]) && <CheckCircle className="h-4 w-4 text-green-400" />}
                      </div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {lesson.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-card-foreground">{currentLesson.title}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {currentLesson.type}
                    </Badge>
                  </div>
                  {(currentLesson.completed || completedLessons[currentLesson.id]) && <CheckCircle className="h-6 w-6 text-green-400" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none mb-6 prose-invert">
                  <div
                    className="whitespace-pre-wrap text-card-foreground"
                    dangerouslySetInnerHTML={{
                      __html: (currentLesson.content ?? "")
                        .replace(
                          /```java\n([\s\S]*?)\n```/g,
                          '<pre class="bg-muted p-4 rounded-lg overflow-x-auto border border-border"><code class="text-card-foreground">$1</code></pre>'
                        )
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded text-card-foreground">$1</code>')
                        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-card-foreground">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-6 text-card-foreground">$1</h2>')
                        .replace(/\*\*(.*?)\*\*/gm, "<strong class='text-card-foreground'>$1</strong>")
                    }}
                  ></div>

                  {currentLesson.codeExample && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-card-foreground">Example:</h3>
                      <CodeEditor initialCode={currentLesson.codeExample} readOnly={true} />
                    </div>
                  )}

                  {currentLesson.exercise && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-card-foreground">Exercise:</h3>
                        {(currentLesson.completed || completedLessons[currentLesson.id]) && (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Completed!</span>
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{currentLesson.exercise.description}</p>
                        <CodeEditor
                          starterCode={currentLesson.exercise.starterCode}
                          readOnly={false}
                          expectedOutput={currentLesson.exercise.expectedOutput}
                          testCases={currentLesson.exercise.testCases}
                          onSuccess={handleExerciseSuccess}
                        />
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button onClick={handlePrevious} disabled={currentLessonIndex === 0} variant="outline">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentLessonIndex === lessons.length - 1}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
