"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Check, X, RotateCcw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  initialCode: string
  expectedOutput?: string
  testCases?: Array<{
    input: string
    expectedOutput: string
    description: string
  }>
  readOnly?: boolean
  onSuccess?: () => void
}

export default function CodeEditor({
  initialCode,
  expectedOutput,
  testCases = [],
  readOnly = false,
  onSuccess,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; output: string }>>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)

const runCode = async () => {
  setIsRunning(true)
  setOutput("")
  try {
    const response = await fetch("/api/run-java", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
    const data = await response.json()
    setOutput(data.output)
  } catch (error) {
    setOutput(`Error: ${error}`)
  }
  setIsRunning(false)
}


  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
    setTestResults([])
    setAllTestsPassed(false)
  }

/* const interpretJavaCode = (javaCode: string, input?: string): string => {
    try {
      const printRegex = /System\.out\.println\s*$$\s*"([^"]*)"\s*$$/g
      const prints: string[] = []
      let match

      while ((match = printRegex.exec(javaCode)) !== null) {
        prints.push(match[1])
      }

      const lines = javaCode.split("\n")
      const variables: Record<string, any> = {}
      const outputs: string[] = []

      for (const line of lines) {
        const trimmed = line.trim()

        if (trimmed.includes("int ") && trimmed.includes("=")) {
          const match = trimmed.match(/int\s+(\w+)\s*=\s*(\d+)/)
          if (match) {
            variables[match[1]] = Number.parseInt(match[2])
          }
        }

        if (trimmed.includes("System.out.println")) {
          const printMatch = trimmed.match(/System\.out\.println\s*$$\s*([^)]+)\s*$$/)
          if (printMatch) {
            const content = printMatch[1]

            if (content.startsWith('"') && content.endsWith('"')) {
              outputs.push(content.slice(1, -1))
            }
            else if (variables[content]) {
              outputs.push(variables[content].toString())
            }
            else {
              outputs.push(content)
            }
          }
        }
      }

      return outputs.length > 0 ? outputs.join("\n") : prints.join("\n")
    } catch (error) {
      throw new Error("Compilation error: Check your syntax")
    }
  } 
  */

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex gap-2">
              <Button onClick={resetCode} variant="outline" size="sm" disabled={isRunning}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button onClick={runCode} disabled={isRunning || readOnly} size="sm">
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[300px] resize-none"
            placeholder="Write your Java code here..."
            readOnly={readOnly}
          />
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Output</CardTitle>
              {expectedOutput && (
                <Badge variant={allTestsPassed ? "default" : "secondary"}>
                  {allTestsPassed ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Correct!
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3 mr-1" />
                      Try Again
                    </>
                  )}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-3 rounded text-sm font-mono whitespace-pre-wrap">{output}</pre>
            {expectedOutput && (
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-800 mb-1">Expected Output:</p>
                <pre className="text-sm font-mono text-blue-700">{expectedOutput}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {testCases.length > 0 && testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testCases.map((testCase, index) => (
                <div key={index} className="border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{testCase.description}</span>
                    <Badge variant={testResults[index]?.passed ? "default" : "destructive"}>
                      {testResults[index]?.passed ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Passed
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 mr-1" />
                          Failed
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <div>
                      <span className="font-medium">Input:</span> {testCase.input}
                    </div>
                    <div>
                      <span className="font-medium">Expected:</span> {testCase.expectedOutput}
                    </div>
                    <div>
                      <span className="font-medium">Got:</span> {testResults[index]?.output}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
