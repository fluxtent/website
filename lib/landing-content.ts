import { courseStats } from "@/lib/course-data"
import type { LandingFaqItem, LandingTool, NavItem, SprintStep } from "@/types/course"

export const primaryNavItems: NavItem[] = [
  { label: "Learn", href: "/learn", match: "/learn" },
  { label: "Practice", href: "/practice", match: "/practice" },
  { label: "Sandbox", href: "/sandbox", match: "/sandbox" },
  { label: "Exam Prep", href: "/exam-prep", match: "/exam-prep" },
]

export const proofStrip = [
  {
    value: `${courseStats.moduleCount}`,
    label: "course modules",
  },
  {
    value: `${courseStats.lessonCount}`,
    label: "guided lessons",
  },
  {
    value: `${courseStats.practiceCount}`,
    label: "practice labs",
  },
  {
    value: `${courseStats.studyHours.toFixed(1)} hrs`,
    label: "estimated study time",
  },
]

export const landingTools: LandingTool[] = [
  {
    eyebrow: "Core path",
    title: "Guided AP CSA roadmap",
    description: "Follow the course unit by unit with short explanations, coding reps, and checkpoints that help students keep moving.",
    href: "/learn",
    highlight: "A calm next step whenever you open the app.",
  },
  {
    eyebrow: "Drill bank",
    title: "Filterable practice hub",
    description: "Browse every practice lesson in one place, search by concept, and jump straight into the exact rep you need.",
    href: "/practice",
    highlight: "Fast targeted review when you already know the weak spot.",
  },
  {
    eyebrow: "Open coding",
    title: "Java sandbox",
    description: "Use the in-browser Java editor to test ideas, debug quickly, or do free-response warmups outside the modules.",
    href: "/sandbox",
    highlight: "Freeform practice without leaving the browser.",
  },
  {
    eyebrow: "Exam mode",
    title: "30-day exam sprint",
    description: "Shift into review mode with a four-week sprint that keeps weak areas visible and daily reps realistic.",
    href: "/exam-prep",
    highlight: "A steadier way to finish the course strong.",
  },
]

export const faqItems: LandingFaqItem[] = [
  {
    question: "Is this a full AP CSA course or just a code editor?",
    answer:
      "It is a structured AP Computer Science A study platform. The editor is one tool inside it, alongside modules, lessons, practice drills, and progress tracking.",
  },
  {
    question: "Do I need an account to start?",
    answer:
      "No. You can explore the homepage, practice hub, sandbox, and course structure first. Signing in adds saved progress and continuity.",
  },
  {
    question: "How is practice organized?",
    answer:
      "Practice comes from the same lesson catalog used inside the modules, so drills stay connected to the concepts they reinforce.",
  },
  {
    question: "Is this aimed at beginners?",
    answer:
      "Yes. The flow starts with primitive types and objects, then ramps through control flow, data structures, and advanced review topics.",
  },
]

export const examSprintSteps: SprintStep[] = [
  {
    title: "Week 1: Foundations reset",
    description: "Rebuild speed on variables, objects, and conditional logic so later review does not collapse under small mistakes.",
  },
  {
    title: "Week 2: Loops and collections",
    description: "Drill iteration, arrays, and ArrayList patterns until tracing and writing them feels automatic.",
  },
  {
    title: "Week 3: Classes, search, and structure",
    description: "Tighten object design, inheritance, and algorithm patterns that show up when questions get longer.",
  },
  {
    title: "Week 4: Final review reps",
    description: "Spend the last stretch on recursion, mixed practice, and exam-style decision making under light pressure.",
  },
]
