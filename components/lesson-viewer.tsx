"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Code2, CheckCircle } from "lucide-react"
import CodeEditor from "@/components/code-editor"

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="container mx-auto">
          <Button onClick={onBack} variant="outline" className="mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Module Content Coming Soon</h2>
              <p className="text-gray-600">This module's lessons are being prepared. Check back soon!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Module {moduleId}</h1>
            <p className="text-gray-600">
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonIndex(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === currentLessonIndex
                          ? "bg-blue-100 border-2 border-blue-300"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lesson.type === "theory" && <BookOpen className="h-4 w-4" />}
                          {lesson.type === "practice" && <Code2 className="h-4 w-4" />}
                          <span className="text-sm font-medium">{lesson.title}</span>
                        </div>
                        {lesson.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentLesson.title}</CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {currentLesson.type}
                    </Badge>
                  </div>
                  {currentLesson.completed && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none mb-6">
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: currentLesson.content
                        .replace(
                          /```java\n([\s\S]*?)\n```/g,
                          '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>',
                        )
                        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
                        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>')
                        .replace(/^\*\*(.*?)\*\*/gm, "<strong>$1</strong>"),
                    }}
                  />
                </div>

                {currentLesson.codeExample && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Example:</h3>
                    <CodeEditor initialCode={currentLesson.codeExample} readOnly={true} />
                  </div>
                )}

                {currentLesson.exercise && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Exercise:</h3>
                    <p className="text-gray-600 mb-4">{currentLesson.exercise.description}</p>
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
