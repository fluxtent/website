"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, Code2, FileStack, TerminalSquare, Zap } from "lucide-react"
import { courseStats } from "@/lib/course-data"

const CodeEditor = dynamic(() => import("@/components/code-editor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-[28px] border border-border/70 bg-card/70 p-8">
      <div className="h-[420px] animate-pulse rounded-[24px] bg-secondary/70" />
    </div>
  ),
})

export default function PlaygroundSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#08111f_0%,#0b1526_100%)] py-20 text-white md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Playground</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Practice ideas instantly in the browser.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Quick reps should feel easy. Students can write Java, run it fast, compare output, and jump into the full sandbox when they want more room.
            </p>
          </div>

          <Link
            href="/sandbox"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Open full sandbox
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <Zap className="h-5 w-5 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">Fast feedback</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">Run quick experiments without setting up an IDE or leaving the browser.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <FileStack className="h-5 w-5 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">Multiple files</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">Split code into classes when you want more realistic Java practice.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <TerminalSquare className="h-5 w-5 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">Output checks</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">Compare what you wrote against expected output on guided reps and drills.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_36px_90px_rgba(2,8,23,0.32)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="h-4 w-4 text-primary" />
              Java practice sandbox
            </div>
            <span className="text-xs text-slate-400">Browser-based and ready to run</span>
          </div>

          <CodeEditor
            starterCode={`public class Main {
  public static void main(String[] args) {
    String focus = "AP Computer Science A";
    int modules = ${courseStats.moduleCount};
    int practiceLabs = ${courseStats.practiceCount};

    System.out.println("Focus: " + focus);
    System.out.println("Modules: " + modules);
    System.out.println("Practice labs: " + practiceLabs);
  }
}`}
            expectedOutput={`Focus: AP Computer Science A
Modules: ${courseStats.moduleCount}
Practice labs: ${courseStats.practiceCount}`}
          />
        </div>
      </div>
    </section>
  )
}
