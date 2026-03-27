import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/lib/landing-content"

export default function FaqSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Questions students usually ask before they start.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The platform is simple: learn the course, practice often, run Java in the browser, and shift into exam prep when it matters.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-border/70 bg-card/70 p-2 shadow-xl shadow-slate-950/5">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-border/70 px-4">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
