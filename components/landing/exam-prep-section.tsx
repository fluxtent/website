import Link from "next/link"
import { ArrowRight, CalendarClock } from "lucide-react"
import { examSprintSteps } from "@/lib/landing-content"
import { practiceLessonCatalog } from "@/lib/course-data"

const reviewDrills = practiceLessonCatalog.filter((lesson) => lesson.moduleId >= 10).slice(0, 4)

export default function ExamPrepSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fffdf8_0%,#fffaf0_100%)] py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Exam prep</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Finish strong with a real final-month plan.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              The last month should not feel like random panic review. This sprint keeps the order simple: rebuild fundamentals, sharpen loops and collections, tighten longer problems, then finish with mixed exam-style reps.
            </p>

            <div className="mt-8 space-y-4">
              {examSprintSteps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-amber-100 bg-white/90 p-5 shadow-sm shadow-amber-100/60">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CalendarClock className="h-4 w-4 text-amber-500" />
                    {step.title}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-amber-100 bg-white/90 p-6 shadow-xl shadow-amber-100/40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Drill starters</p>
                <h3 className="mt-3 text-2xl font-bold text-foreground">Good review reps to open first</h3>
              </div>
              <Link
                href="/exam-prep"
                className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-amber-100 md:inline-flex"
              >
                Full exam plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {reviewDrills.map((lesson) => (
                <Link
                  key={lesson.lessonId}
                  href={`/learn?module=${lesson.moduleId}&lesson=${lesson.lessonId}`}
                  className="group block rounded-3xl border border-amber-100 bg-amber-50/50 p-5 transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/80"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                        Module {lesson.moduleId} · {lesson.moduleTitle}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-foreground">{lesson.lessonTitle}</h4>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-amber-600 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
