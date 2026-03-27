import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import HeroSection from "@/components/landing/hero-section"
import ReturnStrip from "@/components/landing/return-strip"
import ProofStrip from "@/components/landing/proof-strip"
import FeaturesSection from "@/components/landing/features-section"
import CurriculumOverview from "@/components/landing/curriculum-overview"
import ProductShowcaseSection from "@/components/landing/product-showcase-section"
import PlaygroundSection from "@/components/landing/playground-section"
import ExamPrepSection from "@/components/landing/exam-prep-section"
import FaqSection from "@/components/landing/faq-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ReturnStrip />
        <div className="-mt-16 relative z-10 md:-mt-20">
          <ProofStrip />
        </div>
        <FeaturesSection />
        <CurriculumOverview />
        <ProductShowcaseSection />
        <PlaygroundSection />
        <ExamPrepSection />
        <FaqSection />

        <section className="pb-20 pt-4 md:pb-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.18),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(12,18,34,0.98))] p-8 shadow-2xl shadow-slate-950/20 md:p-12">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Final CTA</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Start where you need help today and keep the full roadmap when you are ready.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Open the guided workspace, jump straight into practice, test code in the sandbox, or move into the exam sprint. The whole product now feels connected from the first click.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/learn"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-100"
                  >
                    Open the learning workspace
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/exam-prep"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    See the exam-prep flow
                  </Link>
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
