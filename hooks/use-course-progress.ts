"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { buildModulesWithProgress, courseStats, getContinueModule } from "@/lib/course-data"
import type { ModuleData, UserLessonProgress } from "@/types/course"

export function useCourseProgress() {
  const { data: session, status } = useSession()
  const [userProgress, setUserProgress] = useState<Record<number, UserLessonProgress>>({})
  const [isLoading, setIsLoading] = useState(false)

  const loadProgress = async () => {
    if (!session?.user) {
      setUserProgress({})
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/progress")
      const data = await response.json()

      if (data.modules) {
        setUserProgress(data.modules)
      } else {
        setUserProgress({})
      }
    } catch (error) {
      console.error("Error loading progress:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProgress()
  }, [session?.user?.email])

  const modulesWithProgress: ModuleData[] = useMemo(
    () => buildModulesWithProgress(userProgress),
    [userProgress]
  )

  const completedLessons = useMemo(
    () => modulesWithProgress.reduce((sum, module) => sum + module.completed, 0),
    [modulesWithProgress]
  )

  const completedModules = useMemo(
    () => modulesWithProgress.filter((module) => module.isCompleted).length,
    [modulesWithProgress]
  )

  const overallProgress = courseStats.lessonCount
    ? (completedLessons / courseStats.lessonCount) * 100
    : 0

  return {
    session,
    sessionStatus: status,
    userProgress,
    isLoading,
    modulesWithProgress,
    continueModule: getContinueModule(modulesWithProgress),
    overallProgress,
    completedLessons,
    completedModules,
    totalLessons: courseStats.lessonCount,
    totalModules: courseStats.moduleCount,
    loadProgress,
  }
}
