import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const outcomes = [
  "Pick up exactly where you left off with saved progress and deep links into modules or lessons.",
  "Open theory, drills, and coding practice without feeling like you are switching between disconnected tools.",
  "See progress, lesson structure, and next steps in one calm workspace that does not fight for attention.",
  "Stay in the browser for quick reps or longer sessions without losing the sense of where you are in the course.",
]

export default function ProductShowcaseSection() {
  return (
    <section className="bg-white py-20 text-slate-950 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Workspace preview</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
              The learning workspace feels clear the second it opens.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Students land in a clean dashboard with modules, progress, and lesson flow already connected. That makes the promise on the homepage feel believable.
            </p>

            <div className="mt-8 space-y-4">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-7 text-slate-600">{outcome}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Open the learning workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/practice"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-50"
              >
                Open practice hub
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-[radial-gradient(circle,_rgba(14,165,233,0.16),_transparent_65%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-slate-950 p-3 shadow-[0_36px_80px_rgba(15,23,42,0.18)]">
              <div className="mb-3 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Actual product screenshot</p>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">
                  /learn
                </div>
              </div>
              <div className="overflow-hidden rounded-[26px] border border-white/10">
                <Image
                  src="/images/learn-screenshot.png"
                  alt="CodeCSA learning dashboard screenshot"
                  width={1440}
                  height={1200}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
