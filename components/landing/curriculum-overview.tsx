import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { courseModules } from "@/lib/course-data"

const studyPhases = [
  {
    title: "Stage 1",
    label: "Foundations",
    description: "Lock in syntax, variables, and objects before the course starts moving faster.",
    modules: courseModules.filter((module) => module.id <= 2),
  },
  {
    title: "Stage 2",
    label: "Logic and iteration",
    description: "Build confidence with conditionals, loops, and the patterns that show up constantly later.",
    modules: courseModules.filter((module) => module.id >= 3 && module.id <= 4),
  },
  {
    title: "Stage 3",
    label: "Classes and data structures",
    description: "Move into class design, arrays, and lists once the basics feel automatic.",
    modules: courseModules.filter((module) => module.id >= 5 && module.id <= 8),
  },
  {
    title: "Stage 4",
    label: "Advanced review and exam prep",
    description: "Use inheritance, algorithms, and final review reps to turn familiarity into exam confidence.",
    modules: courseModules.filter((module) => module.id >= 9),
  },
]

export default function CurriculumOverview() {
  return (
    <section id="roadmap" className="bg-slate-950 py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Roadmap</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-tight">
              A roadmap that makes the full course feel manageable.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Students can still jump into any module, but the first view should make the journey feel clear instead of overwhelming.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-4">
          {studyPhases.map((phase) => (
            <div
              key={phase.title}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(2,8,23,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {phase.title}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{phase.label}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {phase.modules.length} modules
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-400">{phase.description}</p>

              <div className="mt-6 space-y-3">
                {phase.modules.map((module) => (
                  <Link
                    key={module.id}
                    href={`/learn?module=${module.id}`}
                    className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.05]"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Module {module.id}</p>
                      <p className="mt-1 text-sm font-medium text-white">{module.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {module.lessons} lessons · {module.estimatedTime}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
