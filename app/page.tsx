"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, CheckCircle, Play } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import LessonViewer from "@/components/lesson-viewer"
import Settings from "@/components/settings"
import AuthButton from "@/components/auth-button"
import { moduleContent } from "@/lib/module-content"

const modules = [
  {
    id: 1,
    title: "Primitive Types",
    description: "Variables, data types, casting",
    lessons: 8,
    completed: 0,
    unlocked: true,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Using Objects",
    description: "String methods, Math class, API",
    lessons: 6,
    completed: 0,
    unlocked: true,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Boolean Expressions and If Statements",
    description: "if/else, boolean logic",
    lessons: 7,
    completed: 0,
    unlocked: true,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Iteration",
    description: "for loops, while loops",
    lessons: 9,
    completed: 0,
    unlocked: true,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Writing Classes",
    description: "Constructors, fields, methods",
    lessons: 10,
    completed: 0,
    unlocked: true,
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "Arrays",
    description: "1D arrays, traversals",
    lessons: 8,
    completed: 0,
    unlocked: true,
    color: "bg-indigo-500",
  },
  {
    id: 7,
    title: "ArrayList",
    description: "ArrayList methods, loops",
    lessons: 7,
    completed: 0,
    unlocked: true,
    color: "bg-pink-500",
  },
  {
    id: 8,
    title: "2D Arrays",
    description: "Nested loops, 2D structure",
    lessons: 6,
    completed: 0,
    unlocked: true,
    color: "bg-teal-500",
  },
  {
    id: 9,
    title: "Inheritance",
    description: "Superclass/subclass, overriding",
    lessons: 8,
    completed: 0,
    unlocked: true,
    color: "bg-yellow-500",
  },
  {
    id: 10,
    title: "Recursion",
    description: "Basic recursive methods",
    lessons: 5,
    completed: 0,
    unlocked: true,
    color: "bg-cyan-500",
  },
  {
    id: 11,
    title: "Final Practice",
    description: "Practice FRQs + Project",
    lessons: 12,
    completed: 0,
    unlocked: true,
    color: "bg-gray-500",
  },
]

export default function HomePage() {
  const { data: session } = useSession()
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [currentView, setCurrentView] = useState<"modules" | "lesson" | "practice">("modules")
  const [userProgress, setUserProgress] = useState<Record<number, { completed: number; lessons: Record<string, boolean> }>>({})
  const [overallProgress, setOverallProgress] = useState(0)

  const loadProgress = () => {
    if (session?.user) {
      fetch("/api/progress")
        .then((res) => res.json())
        .then((data) => {
          if (data.modules) {
            setUserProgress(data.modules)
            // Calculate overall progress
            const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0)
            const completedLessons = Object.values(data.modules).reduce(
              (sum: number, m: any) => sum + (m.completed || 0),
              0
            )
            setOverallProgress(totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0)
          }
        })
        .catch((err) => console.error("Error loading progress:", err))
    }
  }

  useEffect(() => {
    loadProgress()
  }, [session])

  // Update modules with user progress
  const modulesWithProgress = modules.map((module, index) => {
    const progress = userProgress[module.id]
    const completed = progress?.completed || 0
    
    // Get actual number of lessons from module content
    const moduleLessons = moduleContent[module.id] || []
    const totalLessons = moduleLessons.length
    
    // Module is only completed when ALL lessons are done
    const isCompleted = totalLessons > 0 && completed >= totalLessons
    
    // All modules are unlocked - users can access any module
    // Progress is still tracked and displayed
    const unlocked = true
    
    return {
      ...module,
      completed,
      unlocked,
      isCompleted,
      totalLessons, // Use actual lesson count
    }
  })

  const handleModuleClick = (moduleId: number) => {
    setSelectedModule(moduleId)
    setCurrentView("lesson")
  }

  const handleBackToModules = () => {
    setCurrentView("modules")
    setSelectedModule(null)
  }

  if (currentView === "lesson" && selectedModule) {
    return <LessonViewer moduleId={selectedModule} onBack={handleBackToModules} userProgress={userProgress} onProgressUpdate={loadProgress} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Settings />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">AP Computer Science A</h1>
            <p className="text-xl text-muted-foreground mb-4">Interactive Learning Platform</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-muted-foreground">11 Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-400" />
                <span className="text-sm text-muted-foreground">Interactive Coding</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-muted-foreground">Code Runner</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <AuthButton />
          </div>
        </div>

        {!session && (
          <div className="mb-6 bg-card rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Sign in to save your progress</h3>
                <p className="text-sm text-muted-foreground">Your progress will be saved across all devices</p>
              </div>
              <AuthButton />
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">Overall Progress</h2>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesWithProgress.map((module) => (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-border ${
                module.unlocked ? "hover:scale-105" : "opacity-60"
              }`}
              onClick={() => handleModuleClick(module.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-3 h-3 rounded-full ${module.color}`} />
                  <div className="flex items-center gap-2">
                    {module.isCompleted && (
                      <Badge variant="default" className="bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {module.isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg text-card-foreground">
                  Module {module.id}: {module.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-card-foreground">
                      {module.completed}/{module.totalLessons || module.lessons} lessons
                    </span>
                  </div>
                  <Progress value={module.totalLessons ? (module.completed / module.totalLessons) * 100 : 0} className="h-2" />
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {module.totalLessons || module.lessons} lessons
                    </Badge>
                    <Button size="sm" variant="outline">
                      {module.isCompleted ? "Review" : "Start Learning"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-lg p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">Quick Practice</h2>
          <p className="text-muted-foreground mb-4">Try out the multi-file code editor with Java programs:</p>
          <CodeEditor
            initialCode={`public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        Student student = new Student("Alice", 17);
        
        System.out.println("Hello, AP Computer Science!");
        System.out.println("5 + 3 = " + calc.add(5, 3));
        System.out.println("Student: " + student.getName() + ", Age: " + student.getAge());
    }
}`}
            expectedOutput={`Hello, AP Computer Science!
5 + 3 = 8
Student: Alice, Age: 17`}
            readOnly={false}
          />
        </div>
      </div>
    </div>
  )
}
