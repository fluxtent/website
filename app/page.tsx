"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, CheckCircle, Lock, Play } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import LessonViewer from "@/components/lesson-viewer"

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
    unlocked: false,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Boolean Expressions and If Statements",
    description: "if/else, boolean logic",
    lessons: 7,
    completed: 0,
    unlocked: false,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Iteration",
    description: "for loops, while loops",
    lessons: 9,
    completed: 0,
    unlocked: false,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Writing Classes",
    description: "Constructors, fields, methods",
    lessons: 10,
    completed: 0,
    unlocked: false,
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "Arrays",
    description: "1D arrays, traversals",
    lessons: 8,
    completed: 0,
    unlocked: false,
    color: "bg-indigo-500",
  },
  {
    id: 7,
    title: "ArrayList",
    description: "ArrayList methods, loops",
    lessons: 7,
    completed: 0,
    unlocked: false,
    color: "bg-pink-500",
  },
  {
    id: 8,
    title: "2D Arrays",
    description: "Nested loops, 2D structure",
    lessons: 6,
    completed: 0,
    unlocked: false,
    color: "bg-teal-500",
  },
  {
    id: 9,
    title: "Inheritance",
    description: "Superclass/subclass, overriding",
    lessons: 8,
    completed: 0,
    unlocked: false,
    color: "bg-yellow-500",
  },
  {
    id: 10,
    title: "Recursion",
    description: "Basic recursive methods",
    lessons: 5,
    completed: 0,
    unlocked: false,
    color: "bg-cyan-500",
  },
  {
    id: 11,
    title: "Final Practice",
    description: "Practice FRQs + Project",
    lessons: 12,
    completed: 0,
    unlocked: false,
    color: "bg-gray-500",
  },
]

export default function HomePage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [currentView, setCurrentView] = useState<"modules" | "lesson" | "practice">("modules")

  const handleModuleClick = (moduleId: number) => {
    const module = modules.find((m) => m.id === moduleId)
    if (module?.unlocked) {
      setSelectedModule(moduleId)
      setCurrentView("lesson")
    }
  }

  const handleBackToModules = () => {
    setCurrentView("modules")
    setSelectedModule(null)
  }

  if (currentView === "lesson" && selectedModule) {
    return <LessonViewer moduleId={selectedModule} onBack={handleBackToModules} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
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

        <div className="mb-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">Overall Progress</h2>
              <span className="text-sm text-muted-foreground">0% Complete</span>
            </div>
            <Progress value={0} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
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
                  {module.unlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
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
                      {module.completed}/{module.lessons} lessons
                    </span>
                  </div>
                  <Progress value={(module.completed / module.lessons) * 100} className="h-2" />
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {module.lessons} lessons
                    </Badge>
                    {module.unlocked && (
                      <Button size="sm" variant="outline">
                        Start Learning
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-lg p-6 shadow-sm border border-border">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">Quick Practice</h2>
          <p className="text-muted-foreground mb-4">Try out the code editor with a simple Java program:</p>
          <CodeEditor
            initialCode={`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, AP Computer Science!");
    }
}`}
            expectedOutput="Hello, AP Computer Science!"
            readOnly={false}
          />
        </div>
      </div>
    </div>
  )
}
