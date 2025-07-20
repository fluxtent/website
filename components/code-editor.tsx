"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Play, 
  RotateCcw, 
  Plus, 
  X, 
  PanelLeft, 
  PanelRight, 
  Layout
} from "lucide-react"

type JavaFile = {
  id: string
  name: string
  content: string
}

type TabLayout = "horizontal" | "vertical-left" | "vertical-right"

interface CodeEditorProps {
  readOnly?: boolean
}

const initialCode = `public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        Student student = new Student("Alice", 20);
        
        System.out.println("Calculator: " + calc.add(5, 3));
        System.out.println("Student: " + student.getName() + ", Age: " + student.getAge());
    }
}`

export default function CodeEditor({ readOnly = false }: CodeEditorProps) {
  const [files, setFiles] = useState<JavaFile[]>([
    {
      id: "1",
      name: "Main.java",
      content: initialCode,
    },
    {
      id: "2",
      name: "Calculator.java",
      content: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
}`,
    },
    {
      id: "3",
      name: "Student.java",
      content: `public class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}`,
    },
  ])
  const [activeFileId, setActiveFileId] = useState("1")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ test: string; passed: boolean; output: string }>>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [showAddFile, setShowAddFile] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const [tabLayout, setTabLayout] = useState<TabLayout>("horizontal")

  const activeFile = files.find(f => f.id === activeFileId)
  const mainFile = files.find(f => f.name === "Main.java")

  const addFile = () => {
    if (!newFileName.trim()) return
    
    const fileName = newFileName.trim().endsWith('.java') 
      ? newFileName.trim() 
      : newFileName.trim() + '.java'
    
    let initialContent = `public class ${fileName.replace('.java', '')} {
    // Your code here
}`
    
    // If it's Main.java, add the main method
    if (fileName === "Main.java") {
      initialContent = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Main!");
    }
}`
    }
    
    const newFile: JavaFile = {
      id: Date.now().toString(),
      name: fileName,
      content: initialContent,
    }
    
    setFiles([...files, newFile])
    setActiveFileId(newFile.id)
    setNewFileName("")
    setShowAddFile(false)
  }

  const removeFile = (fileId: string) => {
    if (files.length <= 1) return // Don't remove the last file
    
    const newFiles = files.filter(f => f.id !== fileId)
    setFiles(newFiles)
    
    if (activeFileId === fileId) {
      setActiveFileId(newFiles[0].id)
    }
  }

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(files.map(f => 
      f.id === fileId ? { ...f, content } : f
    ))
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("")
    
    try {
      if (!mainFile) {
        setOutput("Error: No Main.java file found. Please create a Main.java file with a main method.")
        return
      }

      const response = await fetch("/api/run-java", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          files: files.map(f => ({
            name: f.name,
            content: f.content
          })),
          mainClass: "Main"
        }),
      })
      
      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
    setIsRunning(false)
  }

  const resetCode = () => {
    setFiles([
      {
        id: "1",
        name: "Main.java",
        content: initialCode,
      },
      {
        id: "2",
        name: "Calculator.java",
        content: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
}`,
      },
      {
        id: "3",
        name: "Student.java",
        content: `public class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}`,
      },
    ])
    setActiveFileId("1")
    setOutput("")
    setTestResults([])
    setAllTestsPassed(false)
  }

  const cycleTabLayout = () => {
    const layouts: TabLayout[] = ["horizontal", "vertical-left", "vertical-right"]
    const currentIndex = layouts.indexOf(tabLayout)
    const nextIndex = (currentIndex + 1) % layouts.length
    setTabLayout(layouts[nextIndex])
  }

  const renderTabs = () => {
    if (tabLayout === "horizontal") {
      return (
        <div className="flex items-center border-b border-border mb-4">
          <div className="flex flex-1 overflow-x-auto">
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors border-r border-border last:border-r-0 ${
                  activeFileId === file.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-accent text-muted-foreground"
                }`}
                onClick={() => setActiveFileId(file.id)}
              >
                <span className="text-sm font-medium truncate">{file.name}</span>
                {file.name === "Main.java" && (
                  <Badge variant="secondary" className="text-xs">
                    Main
                  </Badge>
                )}
                {files.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(file.id)
                    }}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {!showAddFile ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddFile(true)}
              className="ml-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="FileName.java"
                className="w-32 h-8 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addFile()
                  if (e.key === 'Escape') {
                    setShowAddFile(false)
                    setNewFileName("")
                  }
                }}
                autoFocus
              />
              <Button size="sm" onClick={addFile} className="h-8 px-2">
                Add
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddFile(false)
                  setNewFileName("")
                }}
                className="h-8 px-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )
    }

    // Vertical tabs
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Files</span>
          {!showAddFile ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddFile(true)}
              className="h-6 w-6 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="File.java"
                className="w-20 h-6 text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addFile()
                  if (e.key === 'Escape') {
                    setShowAddFile(false)
                    setNewFileName("")
                  }
                }}
                autoFocus
              />
              <Button size="sm" onClick={addFile} className="h-6 px-1 text-xs">
                +
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddFile(false)
                  setNewFileName("")
                }}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors border-l-2 ${
                activeFileId === file.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted hover:bg-accent text-muted-foreground border-transparent"
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              <span className="text-sm font-medium truncate flex-1">{file.name}</span>
              {file.name === "Main.java" && (
                <Badge variant="secondary" className="text-xs">
                  Main
                </Badge>
              )}
              {files.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(file.id)
                  }}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCodeEditor = () => {
    if (tabLayout === "horizontal") {
      return (
        <div>
          {renderTabs()}
          {activeFile && (
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">
                {activeFile.name}
                {activeFile.name === "Main.java" && " (Entry point)"}
              </span>
            </div>
          )}
          {activeFile && (
            <Textarea
              value={activeFile.content}
              onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
              className="font-mono text-sm min-h-[300px] resize-none bg-muted border-border text-card-foreground"
              placeholder="Write your Java code here..."
              readOnly={readOnly}
            />
          )}
        </div>
      )
    }

    // Vertical layout
    return (
      <div className="flex h-[400px]">
        {tabLayout === "vertical-left" && (
          <>
            <div className="w-[200px] border-r border-border pr-2">
              {renderTabs()}
            </div>
            <div className="flex-1 pl-2">
              {activeFile && (
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">
                    {activeFile.name}
                    {activeFile.name === "Main.java" && " (Entry point)"}
                  </span>
                </div>
              )}
              {activeFile && (
                <Textarea
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                  className="font-mono text-sm h-full resize-none bg-muted border-border text-card-foreground"
                  placeholder="Write your Java code here..."
                  readOnly={readOnly}
                />
              )}
            </div>
          </>
        )}
        
        {tabLayout === "vertical-right" && (
          <>
            <div className="flex-1 pr-2">
              {activeFile && (
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">
                    {activeFile.name}
                    {activeFile.name === "Main.java" && " (Entry point)"}
                  </span>
                </div>
              )}
              {activeFile && (
                <Textarea
                  value={activeFile.content}
                  onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                  className="font-mono text-sm h-full resize-none bg-muted border-border text-card-foreground"
                  placeholder="Write your Java code here..."
                  readOnly={readOnly}
                />
              )}
            </div>
            <div className="w-[200px] border-l border-border pl-2">
              {renderTabs()}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-card-foreground">Code Editor</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={cycleTabLayout}
                className="flex items-center gap-1"
              >
                {tabLayout === "horizontal" ? (
                  <PanelLeft className="h-4 w-4" />
                ) : (
                  <PanelRight className="h-4 w-4" />
                )}
                {tabLayout === "horizontal" ? "Top" : tabLayout === "vertical-left" ? "Left" : "Right"}
              </Button>
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
          {renderCodeEditor()}
        </CardContent>
      </Card>

      {output && (
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-card-foreground">Output</CardTitle>
              {/* expectedOutput && (
                <Badge variant={outputMatchesExpected ? "default" : "secondary"}>
                  {outputMatchesExpected ? (
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
              ) */}
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-3 rounded text-sm font-mono whitespace-pre-wrap border border-border text-card-foreground">{output}</pre>
            {/* expectedOutput && (
              <div className="mt-3 p-3 bg-accent rounded border border-border">
                <p className="text-sm font-medium text-accent-foreground mb-1">Expected Output:</p>
                <pre className="text-sm font-mono text-card-foreground">{expectedOutput}</pre>
              </div>
            ) */}
          </CardContent>
        </Card>
      )}

      {/* testCases.length > 0 && testResults.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testCases.map((testCase, index) => (
                <div key={index} className="border border-border rounded p-3 bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-card-foreground">{testCase.description}</span>
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
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <div>
                      <span className="font-medium text-card-foreground">Input:</span> {testCase.input}
                    </div>
                    <div>
                      <span className="font-medium text-card-foreground">Expected:</span> {testCase.expectedOutput}
                    </div>
                    <div>
                      <span className="font-medium text-card-foreground">Got:</span> {testResults[index]?.output}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) */}
    </div>
  )
}
