"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Target } from "lucide-react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import AuthPromptBanner from "@/components/landing/auth-prompt-banner"
import ContinueLearning from "@/components/dashboard/continue-learning"
import ModuleCard from "@/components/dashboard/module-card"
import ProgressSummary from "@/components/dashboard/progress-summary"
import LessonViewer from "@/components/lesson-viewer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { courseStats, moduleNameMap } from "@/lib/course-data"
import { useCourseProgress } from "@/hooks/use-course-progress"

interface LearnExperienceProps {
  initialModuleId?: number | null
  initialLessonId?: string | null
}

export default function LearnExperience({
  initialModuleId = null,
  initialLessonId = null,
}: LearnExperienceProps) {
  const router = useRouter()
  const modulesRef = useRef<HTMLDivElement>(null)
  const {
    session,
    userProgress,
    modulesWithProgress,
    continueModule,
    overallProgress,
    completedLessons,
    completedModules,
    totalLessons,
    totalModules,
    loadProgress,
  } = useCourseProgress()

  const safeInitialModuleId = useMemo(() => {
    if (!initialModuleId) {
      return null
    }

    return moduleNameMap[initialModuleId] ? initialModuleId : null
  }, [initialModuleId])

  const [selectedModule, setSelectedModule] = useState<number | null>(safeInitialModuleId)
  const [currentView, setCurrentView] = useState<"modules" | "lesson">(
    safeInitialModuleId ? "lesson" : "modules"
  )

  useEffect(() => {
    setSelectedModule(safeInitialModuleId)
    setCurrentView(safeInitialModuleId ? "lesson" : "modules")
  }, [safeInitialModuleId, initialLessonId])

  const scrollToModules = () => {
    modulesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const openModule = (moduleId: number, lessonId?: string | null) => {
    setSelectedModule(moduleId)
    setCurrentView("lesson")

    const params = new URLSearchParams({ module: String(moduleId) })
    if (lessonId) {
      params.set("lesson", lessonId)
    }

    router.replace(`/learn?${params.toString()}`, { scroll: false })
  }

  const handleBackToModules = () => {
    setCurrentView("modules")
    setSelectedModule(null)
    router.replace("/learn", { scroll: false })
  }

  const handleLessonChange = (lessonId: string) => {
    if (!selectedModule) {
      return
    }

    const params = new URLSearchParams({
      module: String(selectedModule),
      lesson: lessonId,
    })

    router.replace(`/learn?${params.toString()}`, { scroll: false })
  }

  if (currentView === "lesson" && selectedModule) {
    return (
      <LessonViewer
        moduleId={selectedModule}
        initialLessonId={initialLessonId}
        onBack={handleBackToModules}
        onLessonChange={handleLessonChange}
        userProgress={userProgress}
        onProgressUpdate={() => void loadProgress()}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_24%)]">
          <div className="container mx-auto px-4 md:px-6 pt-16 pb-14 md:pt-20 md:pb-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-5 gap-2 px-3 py-1.5 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Guided learning workspace
              </Badge>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Study the full AP CSA path with lessons, labs, and saved progress in one place.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Work through {courseStats.moduleCount} modules, {courseStats.lessonCount} lessons,
                and {courseStats.practiceCount} practice labs without losing your place between sessions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={scrollToModules}
                  size="lg"
                  className="gradient-primary h-12 gap-2 px-6 font-semibold text-white"
                >
                  Browse modules
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 gap-2 px-6 font-semibold">
                  <Link href="/practice">
                    Review practice hub
                    <Target className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {!session && (
          <div className="container mx-auto -mt-6 px-4 md:px-6 relative z-10">
            <AuthPromptBanner />
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6 py-10 md:py-12" ref={modulesRef}>
          {session && (
            <div className="mb-8 space-y-6">
              <ProgressSummary
                overallProgress={overallProgress}
                totalModules={totalModules}
                completedModules={completedModules}
                totalLessons={totalLessons}
                completedLessons={completedLessons}
              />

              {continueModule && (
                <ContinueLearning
                  lastModuleId={continueModule.id}
                  lastModuleTitle={`Module ${continueModule.id}: ${continueModule.title}`}
                  lastModuleProgress={
                    continueModule.totalLessons > 0
                      ? (continueModule.completed / continueModule.totalLessons) * 100
                      : 0
                  }
                  onContinue={(moduleId) => openModule(moduleId, null)}
                />
              )}
            </div>
          )}

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {session ? "Your learning map" : "Full course roadmap"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                {session
                  ? `${completedModules} of ${totalModules} modules completed so far.`
                  : "Start anywhere, but the strongest path is to move unit by unit from fundamentals into review."}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm text-muted-foreground">
              <span>{courseStats.lessonCount} lessons</span>
              <span className="text-border">/</span>
              <span>{courseStats.practiceCount} labs</span>
              <span className="text-border">/</span>
              <span>{courseStats.studyHours.toFixed(1)} guided hours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modulesWithProgress.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onClick={(moduleId) => openModule(moduleId, null)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
