import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import CodeEditor from "@/components/code-editor"
import { courseStats } from "@/lib/course-data"

export default function SandboxPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(25,146,255,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_24%)]">
          <div className="container mx-auto px-4 pb-12 pt-16 md:px-6 md:pb-14 md:pt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Sandbox</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              A dedicated place to experiment in Java without leaving the site.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              This is the open workspace for testing ideas, debugging quickly, or writing your own examples outside the guided modules.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 md:px-6 md:py-12">
          <div className="overflow-hidden rounded-[28px] border border-border/70 bg-card/70 p-4 shadow-2xl shadow-slate-950/10">
            <CodeEditor
              starterCode={`public class Main {
  public static void main(String[] args) {
    String[] focusAreas = {"loops", "arrays", "recursion"};
    int guidedLessons = ${courseStats.lessonCount};

    for (String area : focusAreas) {
      System.out.println("Reviewing " + area);
    }

    System.out.println("Guided lessons available: " + guidedLessons);
  }
}`}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
