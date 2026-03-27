import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import { examSprintSteps } from "@/lib/landing-content"
import { practiceLessonCatalog } from "@/lib/course-data"

const reviewLessons = practiceLessonCatalog.filter((lesson) => lesson.moduleId >= 9)

const examChecklist = [
  "Trace loops and conditionals without hesitation.",
  "Rebuild confidence on array and ArrayList traversals.",
  "Review class design, constructors, and method behavior.",
  "Practice search and sort patterns with clean output formatting.",
  "Finish with recursion and mixed review drills.",
]

export default function ExamPrepPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_24%)]">
          <div className="container mx-auto px-4 pb-12 pt-16 md:px-6 md:pb-14 md:pt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Exam prep</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Turn the last month before the AP exam into a plan you can actually follow.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Use the sprint below to move from shaky recall into deliberate review, instead of bouncing between random worksheets and old notes.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:px-6 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-border/70 bg-card/70 p-6 shadow-xl shadow-slate-950/5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">30-day sprint</p>
              <div className="mt-5 space-y-4">
                {examSprintSteps.map((step) => (
                  <div key={step.title} className="rounded-3xl border border-border/70 bg-background/70 p-5">
                    <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-border/70 bg-card/70 p-6 shadow-xl shadow-slate-950/5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Checklist</p>
                <div className="mt-5 space-y-3">
                  {examChecklist.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-secondary/45 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-border/70 bg-card/70 p-6 shadow-xl shadow-slate-950/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Review drills</p>
                    <h2 className="mt-2 text-2xl font-bold text-foreground">Open a lesson and start coding</h2>
                  </div>
                  <Link
                    href="/practice"
                    className="hidden rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary md:inline-flex"
                  >
                    View all practice
                  </Link>
                </div>

                <div className="mt-5 space-y-4">
                  {reviewLessons.map((lesson) => (
                    <Link
                      key={lesson.lessonId}
                      href={`/learn?module=${lesson.moduleId}&lesson=${lesson.lessonId}`}
                      className="group block rounded-3xl border border-border/70 bg-background/70 p-5 transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                            Module {lesson.moduleId}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-foreground">{lesson.lessonTitle}</h3>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{lesson.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
