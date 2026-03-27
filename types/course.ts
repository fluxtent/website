export interface PracticeExercise {
  description: string
  starterCode: string
  expectedOutput: string
  testCases: string[]
}

export interface BaseLesson {
  id: string
  title: string
  content: string
  codeExample?: string
}

export interface TheoryLesson extends BaseLesson {
  type: "theory"
}

export interface PracticeLesson extends BaseLesson {
  type: "practice"
  exercise: PracticeExercise
}

export type Lesson = TheoryLesson | PracticeLesson
export type ModuleContentMap = Record<number, Lesson[]>

export interface CourseModuleMeta {
  id: number
  title: string
  description: string
  color: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  topics: string[]
}

export interface ModuleData extends CourseModuleMeta {
  lessons: number
  completed: number
  unlocked: boolean
  isCompleted: boolean
  totalLessons: number
}

export interface UserLessonProgress {
  completed: number
  lessons: Record<string, boolean>
}

export interface CourseStats {
  moduleCount: number
  lessonCount: number
  practiceCount: number
  theoryCount: number
  studyHours: number
}

export interface PracticeLessonSummary {
  moduleId: number
  moduleTitle: string
  moduleCategory: string
  moduleDifficulty: CourseModuleMeta["difficulty"]
  lessonId: string
  lessonTitle: string
  description: string
  expectedOutput: string
  starterCode: string
}

export interface NavItem {
  label: string
  href: string
  match?: string
}

export interface LandingTool {
  title: string
  description: string
  href: string
  eyebrow: string
  highlight: string
}

export interface LandingFaqItem {
  question: string
  answer: string
}

export interface SprintStep {
  title: string
  description: string
}
