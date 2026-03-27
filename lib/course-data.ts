import { moduleContent } from "@/lib/module-content"
import type {
  CourseModuleMeta,
  CourseStats,
  ModuleData,
  PracticeLesson,
  PracticeLessonSummary,
  UserLessonProgress,
} from "@/types/course"

export const courseModuleMeta: CourseModuleMeta[] = [
  {
    id: 1,
    title: "Primitive Types",
    description: "Learn variables, data types, operators, and casting before you touch the harder AP CSA units.",
    color: "bg-sky-500",
    category: "Foundations",
    difficulty: "Beginner",
    estimatedTime: "2 hrs",
    topics: ["int", "double", "boolean", "casting"],
  },
  {
    id: 2,
    title: "Using Objects",
    description: "Practice String methods, Math, Scanner flow, and the core object patterns the exam expects.",
    color: "bg-emerald-500",
    category: "Foundations",
    difficulty: "Beginner",
    estimatedTime: "3 hrs",
    topics: ["String", "Math", "API", "Scanner"],
  },
  {
    id: 3,
    title: "Boolean Expressions and If Statements",
    description: "Build confidence with comparisons, branching logic, and the kinds of conditional traps students miss.",
    color: "bg-indigo-500",
    category: "Control Flow",
    difficulty: "Beginner",
    estimatedTime: "2 hrs",
    topics: ["if/else", "boolean", "comparisons"],
  },
  {
    id: 4,
    title: "Iteration",
    description: "Work through loops, nested loops, and repeated logic until it feels automatic.",
    color: "bg-amber-500",
    category: "Control Flow",
    difficulty: "Beginner",
    estimatedTime: "2.5 hrs",
    topics: ["for", "while", "nested loops"],
  },
  {
    id: 5,
    title: "Writing Classes",
    description: "Design classes, constructors, and methods with enough repetition to make OOP click.",
    color: "bg-rose-500",
    category: "OOP",
    difficulty: "Intermediate",
    estimatedTime: "3 hrs",
    topics: ["classes", "constructors", "methods"],
  },
  {
    id: 6,
    title: "Arrays",
    description: "Traverse arrays, compute summaries, and solve the classic AP CSA array patterns.",
    color: "bg-cyan-500",
    category: "Data Structures",
    difficulty: "Intermediate",
    estimatedTime: "2.5 hrs",
    topics: ["1D arrays", "traversal", "algorithms"],
  },
  {
    id: 7,
    title: "ArrayList",
    description: "Move from fixed collections to dynamic list operations, mutation, and search patterns.",
    color: "bg-fuchsia-500",
    category: "Data Structures",
    difficulty: "Intermediate",
    estimatedTime: "2 hrs",
    topics: ["ArrayList", "generics", "methods"],
  },
  {
    id: 8,
    title: "2D Arrays",
    description: "Handle grid problems, row-column logic, and the indexing habits students need for free response questions.",
    color: "bg-teal-500",
    category: "Data Structures",
    difficulty: "Intermediate",
    estimatedTime: "2 hrs",
    topics: ["2D arrays", "nested loops", "grids"],
  },
  {
    id: 9,
    title: "Inheritance",
    description: "Learn superclass/subclass relationships, overriding, and polymorphism without the textbook fog.",
    color: "bg-yellow-500",
    category: "Advanced Concepts",
    difficulty: "Advanced",
    estimatedTime: "3 hrs",
    topics: ["extends", "override", "polymorphism"],
  },
  {
    id: 10,
    title: "Algorithms and Search",
    description: "Drill linear search, binary search, and sorting patterns that show up in tougher practice sets.",
    color: "bg-blue-600",
    category: "Advanced Concepts",
    difficulty: "Advanced",
    estimatedTime: "2.5 hrs",
    topics: ["search", "sort", "algorithms"],
  },
  {
    id: 11,
    title: "Final Practice and Review",
    description: "Wrap the course with recursive thinking, review drills, and exam-style coding practice.",
    color: "bg-slate-500",
    category: "Exam Prep",
    difficulty: "Advanced",
    estimatedTime: "4 hrs",
    topics: ["recursion", "review", "practice"],
  },
]

function parseEstimatedHours(value: string) {
  const hours = Number.parseFloat(value)
  return Number.isFinite(hours) ? hours : 0
}

export const courseModules = courseModuleMeta.map((module) => ({
  ...module,
  lessons: moduleContent[module.id]?.length ?? 0,
}))

export const moduleNameMap = Object.fromEntries(
  courseModules.map((module) => [module.id, module.title])
) as Record<number, string>

export const courseStats: CourseStats = courseModules.reduce(
  (stats, module) => {
    const lessons = moduleContent[module.id] ?? []
    const practiceCount = lessons.filter((lesson) => lesson.type === "practice").length
    const theoryCount = lessons.length - practiceCount

    return {
      moduleCount: stats.moduleCount + 1,
      lessonCount: stats.lessonCount + lessons.length,
      practiceCount: stats.practiceCount + practiceCount,
      theoryCount: stats.theoryCount + theoryCount,
      studyHours: stats.studyHours + parseEstimatedHours(module.estimatedTime),
    }
  },
  {
    moduleCount: 0,
    lessonCount: 0,
    practiceCount: 0,
    theoryCount: 0,
    studyHours: 0,
  }
)

export const practiceLessonCatalog: PracticeLessonSummary[] = courseModules.flatMap((module) =>
  (moduleContent[module.id] ?? [])
    .filter((lesson): lesson is PracticeLesson => lesson.type === "practice")
    .map((lesson) => ({
      moduleId: module.id,
      moduleTitle: module.title,
      moduleCategory: module.category,
      moduleDifficulty: module.difficulty,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      description: lesson.content,
      expectedOutput: lesson.exercise.expectedOutput,
      starterCode: lesson.exercise.starterCode,
    }))
)

export function buildModulesWithProgress(
  progress: Record<number, UserLessonProgress>
): ModuleData[] {
  return courseModules.map((module) => {
    const moduleProgress = progress[module.id]
    const totalLessons = moduleContent[module.id]?.length ?? module.lessons
    const completed = moduleProgress?.completed ?? 0
    const isCompleted = totalLessons > 0 && completed >= totalLessons

    return {
      ...module,
      completed,
      unlocked: true,
      isCompleted,
      totalLessons,
    }
  })
}

export function getContinueModule(modules: ModuleData[]) {
  const inProgress = modules.find((module) => module.completed > 0 && !module.isCompleted)
  if (inProgress) {
    return inProgress
  }

  const hasAnyProgress = modules.some((module) => module.completed > 0)
  return hasAnyProgress ? modules.find((module) => !module.isCompleted) ?? null : null
}
