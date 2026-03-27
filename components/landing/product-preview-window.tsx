import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle, Code2, Play, Terminal } from "lucide-react"
import { courseModules, courseStats } from "@/lib/course-data"

const previewModules = courseModules.slice(0, 4)

export default function ProductPreviewWindow() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/80 p-4 shadow-2xl shadow-slate-950/15 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(25,146,255,0.12),_transparent_28%)]" />
      <div className="relative overflow-hidden rounded-[24px] border border-border/70 bg-background">
        <div className="flex items-center justify-between border-b border-border/70 bg-card/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">CodeCSA workspace</p>
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
            Live practice
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border/70 p-5 lg:border-b-0 lg:border-r">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-secondary/60 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Modules</p>
                <p className="mt-2 text-xl font-bold text-foreground">{courseStats.moduleCount}</p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Lessons</p>
                <p className="mt-2 text-xl font-bold text-foreground">{courseStats.lessonCount}</p>
              </div>
              <div className="rounded-2xl bg-secondary/60 p-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Labs</p>
                <p className="mt-2 text-xl font-bold text-foreground">{courseStats.practiceCount}</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">Current path</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">Module roadmap</h3>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {courseStats.theoryCount} theory / {courseStats.practiceCount} practice
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {previewModules.map((module, index) => (
                  <div key={module.id} className="flex items-center gap-3 rounded-2xl bg-secondary/40 px-3 py-3">
                    {index === 0 ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{module.title}</p>
                      <p className="text-xs text-muted-foreground">{module.lessons} lessons</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="rounded-3xl border border-border/70 bg-slate-950 p-4 text-slate-100 shadow-xl shadow-slate-950/25">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Code2 className="h-3.5 w-3.5" />
                  Main.java
                </div>
                <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <Play className="h-3 w-3" />
                  Run
                </div>
              </div>

              <pre className="overflow-x-auto text-sm leading-7 text-slate-200">
                <code>{`public class Main {
  public static void main(String[] args) {
    int completed = ${courseStats.practiceCount};
    System.out.println("Practice reps: " + completed);
    System.out.println("Keep coding.");
  }
}`}</code>
              </pre>
            </div>

            <div className="mt-4 rounded-3xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Terminal className="h-4 w-4 text-primary" />
                Output preview
              </div>
              <div className="mt-3 rounded-2xl bg-secondary/50 p-4 font-mono text-sm leading-7 text-foreground">
                Practice reps: {courseStats.practiceCount}
                <br />
                Keep coding.
              </div>
            </div>

            <Link
              href="/learn"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Open the full study workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
