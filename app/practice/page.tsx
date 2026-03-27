"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { practiceLessonCatalog } from "@/lib/course-data"

const categories = ["All", ...new Set(practiceLessonCatalog.map((lesson) => lesson.moduleCategory))]
const difficulties = ["All", ...new Set(practiceLessonCatalog.map((lesson) => lesson.moduleDifficulty))]

export default function PracticePage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [difficulty, setDifficulty] = useState("All")

  const filteredLessons = useMemo(() => {
    const loweredQuery = query.trim().toLowerCase()

    return practiceLessonCatalog.filter((lesson) => {
      const matchesQuery =
        !loweredQuery ||
        lesson.lessonTitle.toLowerCase().includes(loweredQuery) ||
        lesson.moduleTitle.toLowerCase().includes(loweredQuery) ||
        lesson.description.toLowerCase().includes(loweredQuery)

      const matchesCategory = category === "All" || lesson.moduleCategory === category
      const matchesDifficulty = difficulty === "All" || lesson.moduleDifficulty === difficulty

      return matchesQuery && matchesCategory && matchesDifficulty
    })
  }, [category, difficulty, query])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_24%)]">
          <div className="container mx-auto px-4 pb-12 pt-16 md:px-6 md:pb-14 md:pt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Practice hub</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Every practice lesson in one searchable place.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Use this page when you know the concept you need more reps on and do not want to click module by module to find it.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:px-6 md:py-12">
          <div className="rounded-[28px] border border-border/70 bg-card/70 p-5 shadow-xl shadow-slate-950/5">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search practice by topic, module, or lesson"
                  className="h-11 rounded-full border-border/80 pl-11"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      category === item
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {difficulties.map((item) => (
                  <button
                    key={item}
                    onClick={() => setDifficulty(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      difficulty === item
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredLessons.length}</span> practice lesson{filteredLessons.length === 1 ? "" : "s"}
            </p>
            <Link
              href="/sandbox"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Need open coding time instead? Use the sandbox.
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Link
                key={lesson.lessonId}
                href={`/learn?module=${lesson.moduleId}&lesson=${lesson.lessonId}`}
                className="group rounded-[28px] border border-border/70 bg-card/70 p-5 transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                      Module {lesson.moduleId}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">{lesson.lessonTitle}</h2>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">{lesson.moduleCategory}</Badge>
                  <Badge variant="secondary">{lesson.moduleDifficulty}</Badge>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">{lesson.description}</p>

                <div className="mt-5 rounded-2xl bg-secondary/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Expected output
                  </p>
                  <p className="mt-2 font-mono text-sm text-foreground">{lesson.expectedOutput}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
