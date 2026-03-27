import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { landingTools } from "@/lib/landing-content"

export default function FeaturesSection() {
  return (
    <section
      id="tools"
      className="bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7fc_42%,#eef5fb_100%)] py-20 text-slate-950 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Platform</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
              One focused workspace for AP CSA students.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Every route has a clear job: learn the course in sequence, find the right drill fast, open a clean Java sandbox, and move into exam mode without restarting your flow.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {landingTools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group rounded-[28px] border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-100/70"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600">{tool.eyebrow}</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{tool.description}</p>
                  <p className="mt-4 text-sm font-medium text-slate-950">{tool.highlight}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-sky-600">
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-[radial-gradient(circle,_rgba(14,165,233,0.16),_transparent_65%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
              <div className="absolute left-6 top-6 z-10 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-xl">
                Real study setting
              </div>

              <div className="bg-slate-100">
                <Image
                  src="/images/classroom-photo.jpg"
                  alt="Students studying together in a lecture hall"
                  width={1400}
                  height={1120}
                  className="block h-[300px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  style={{
                    objectPosition: "center 44%",
                  }}
                />
              </div>

              <div className="grid gap-4 border-t border-slate-200 bg-white p-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">The right tone</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The page now feels grounded in real student work: focused, human, and closer to the way AP CSA practice actually happens.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white">
                  Built for real study habits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
