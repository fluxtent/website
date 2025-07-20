"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Code2, CheckCircle } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import Settings from "@/components/settings"

interface Lesson {
  id: number
  title: string
  type: "theory" | "practice" | "quiz"
  content: string
  codeExample?: string
  exercise?: {
    description: string
    starterCode: string
    expectedOutput?: string
    testCases?: Array<{
      input: string
      expectedOutput: string
      description: string
    }>
  }
  completed: boolean
}

const moduleContent: Record<number, Lesson[]> = {
  1: [
    {
      id: 1,
      title: "Introduction to Variables",
      type: "theory",
      content: `# Variables in Java

Variables are containers that store data values. In Java, every variable must be declared with a specific data type.

## Declaring Variables

The basic syntax for declaring a variable is:
\`\`\`java
dataType variableName = value;
\`\`\`

## Example:
\`\`\`java
int age = 25;
String name = "Alice";
double price = 19.99;
\`\`\`

Variables must be declared before they can be used, and they can only store values of their declared type.`,
      codeExample: `public class Variables {
    public static void main(String[] args) {
        int studentAge = 16;
        String studentName = "John";
        double gpa = 3.85;
        
        System.out.println("Student: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("GPA: " + gpa);
    }
}`,
      completed: false,
    },
    {
      id: 2,
      title: "Primitive Data Types",
      type: "theory",
      content: `# Primitive Data Types

Java has 8 primitive data types that store simple values:

## Integer Types:
- **byte**: 8-bit signed integer (-128 to 127)
- **short**: 16-bit signed integer (-32,768 to 32,767)
- **int**: 32-bit signed integer (-2³¹ to 2³¹-1)
- **long**: 64-bit signed integer (-2⁶³ to 2⁶³-1)

## Floating-Point Types:
- **float**: 32-bit floating point
- **double**: 64-bit floating point (more precise)

## Other Types:
- **boolean**: true or false
- **char**: single 16-bit Unicode character

## Examples:
\`\`\`java
int count = 42;
double temperature = 98.6;
boolean isStudent = true;
char grade = 'A';
\`\`\``,
      completed: false,
    },
    {
      id: 3,
      title: "Practice: Variable Declaration",
      type: "practice",
      content: `# Practice: Declaring Variables

Now it's your turn! Create variables of different types and print them out.

**Task:** Declare variables for a student's information and print them.`,
      exercise: {
        description:
          "Create variables for name (String), age (int), height (double), and isHonorStudent (boolean). Print each variable.",
        starterCode: `public class StudentInfo {
    public static void main(String[] args) {
        
        
        
    }
}`,
        expectedOutput: `Name: Sarah
Age: 17
Height: 5.6
Honor Student: true`,
      },
      completed: false,
    },
  ],
}

interface LessonViewerProps {
  moduleId: number
  onBack: () => void
}

export default function LessonViewer({ moduleId, onBack }: LessonViewerProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const lessons = moduleContent[moduleId] || []
  const currentLesson = lessons[currentLessonIndex]

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleExerciseSuccess = () => {
    lessons[currentLessonIndex].completed = true
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Settings />
        <div className="container mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Module Content Coming Soon</h2>
              <p className="text-muted-foreground">This module's lessons are being prepared. Check back soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Settings />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Module {moduleId}</h1>
            <p className="text-muted-foreground">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </p>
          </div>
          <div className="w-24" />
        </div>

        <div className="mb-6">
          <Progress value={((currentLessonIndex + 1) / lessons.length) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors border ${
                        index === currentLessonIndex
                          ? "bg-blue-900/20 border-blue-400 text-blue-100"
                          : "bg-card hover:bg-accent border-border text-card-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lesson.type === "theory" && <BookOpen className="h-4 w-4" />}
                          {lesson.type === "practice" && <Code2 className="h-4 w-4" />}
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        {lesson.completed && <CheckCircle className="h-4 w-4 text-green-400" />}
                      </div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {lesson.type}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-card-foreground">{currentLesson.title}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {currentLesson.type}
                    </Badge>
                  </div>
                  {currentLesson.completed && <CheckCircle className="h-6 w-6 text-green-400" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none mb-6 prose-invert">
                  <div
                    className="whitespace-pre-wrap text-card-foreground"
                    dangerouslySetInnerHTML={{
                      __html: currentLesson.content
                        .replace(
                          /```java\n([\s\S]*?)\n```/g,
                          '<pre class="bg-muted p-4 rounded-lg overflow-x-auto border border-border"><code class="text-card-foreground">$1</code></pre>',
                        )
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded text-card-foreground">$1</code>')
                        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-card-foreground">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-6 text-card-foreground">$1</h2>')
                        .replace(/^\*\*(.*?)\*\*/gm, "<strong class='text-card-foreground'>$1</strong>"),
                    }}
                  />
                </div>

                {currentLesson.codeExample && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">Example:</h3>
                    <CodeEditor initialCode={currentLesson.codeExample} readOnly={true} />
                  </div>
                )}

                {currentLesson.exercise && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-card-foreground">Exercise:</h3>
                    <p className="text-muted-foreground mb-4">{currentLesson.exercise.description}</p>
                    <CodeEditor
                      initialCode={currentLesson.exercise.starterCode}
                      expectedOutput={currentLesson.exercise.expectedOutput}
                      testCases={currentLesson.exercise.testCases}
                      onSuccess={handleExerciseSuccess}
                    />
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button onClick={handlePrevious} disabled={currentLessonIndex === 0} variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={handleNext} disabled={currentLessonIndex === lessons.length - 1}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
