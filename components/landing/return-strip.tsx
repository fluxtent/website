"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCourseProgress } from "@/hooks/use-course-progress"

export default function ReturnStrip() {
  const { session, continueModule, completedLessons } = useCourseProgress()

  if (!session || !continueModule) {
    return null
  }

  return (
    <section className="pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4 rounded-[28px] border border-primary/20 bg-primary/5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Jump back in
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              You have already completed {completedLessons} lessons. Pick up with Module {continueModule.id}: {continueModule.title}.
            </h2>
          </div>

          <Button asChild className="gradient-primary h-11 gap-2 px-5 font-semibold text-white">
            <Link href={`/learn?module=${continueModule.id}`}>
              Resume learning
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
