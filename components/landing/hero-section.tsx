"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { ArrowRight, BookOpen, Code2, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { courseStats } from "@/lib/course-data"

export default function HeroSection() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.2),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_22%),linear-gradient(180deg,_#08111f,_#0b1526_58%,_#0d1729)]" />
      <div className="absolute inset-0 -z-10 bg-grid-slate opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent_88%)]" />

      <div className="container mx-auto px-4 pb-28 pt-16 md:px-6 md:pb-32 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Learn, practice, and run Java in one workspace
            </div>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[4.3rem] lg:leading-[0.96]">
              AP Computer Science A prep built for real study momentum.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Move through guided modules, open targeted drills, run code in the browser, and shift into exam prep without juggling tabs or losing your place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gradient-primary h-12 gap-2 px-6 font-semibold text-white">
                <Link href={session ? "/learn" : "/practice"}>
                  {session ? "Return to your plan" : "Start practicing"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 gap-2 px-6 font-semibold">
                <Link href="/sandbox">
                  Try the Java sandbox
                  <Code2 className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 hidden max-w-2xl gap-3 sm:grid sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <BookOpen className="h-4 w-4" />
                  Guided lessons
                </div>
                <strong className="text-2xl font-bold text-white">{courseStats.lessonCount}</strong>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <Target className="h-4 w-4" />
                  Practice labs
                </div>
                <strong className="text-2xl font-bold text-white">{courseStats.practiceCount}</strong>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-4 w-4" />
                  Exam-aligned modules
                </div>
                <strong className="text-2xl font-bold text-white">{courseStats.moduleCount}</strong>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle,_rgba(14,165,233,0.24),_transparent_55%)] blur-2xl" />
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-3 shadow-[0_32px_90px_rgba(2,8,23,0.55)] backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Real learning workspace
                  </p>
                  <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">
                    Live app screenshot
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-white/10 shadow-2xl shadow-slate-950/40">
                  <Image
                    src="/images/learn-screenshot.png"
                    alt="CodeCSA learning workspace screenshot"
                    width={1440}
                    height={1200}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden max-w-[240px] rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/35 backdrop-blur-xl lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What students get</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A real workspace with lessons, drills, and coding tools already connected, so it feels easier to keep going every day.
                </p>
              </div>

              <div className="absolute -right-3 top-10 hidden rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 shadow-xl shadow-slate-950/30 backdrop-blur-xl xl:block">
                <BookOpen className="h-4 w-4 text-primary" />
                <div className="mt-2">
                  <strong className="block text-lg font-bold text-white">Saved progress</strong>
                  <span className="text-xs text-slate-400">Modules, drills, and review routes stay connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
