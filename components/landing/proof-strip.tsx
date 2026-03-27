import { proofStrip } from "@/lib/landing-content"

export default function ProofStrip() {
  return (
    <section className="pb-8 md:pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-4 rounded-[30px] border border-white/10 bg-slate-950/82 p-4 shadow-[0_28px_70px_rgba(2,8,23,0.32)] backdrop-blur-xl md:grid-cols-2 md:p-6 xl:grid-cols-4">
          {proofStrip.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
              <p className="text-2xl font-bold text-white md:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
