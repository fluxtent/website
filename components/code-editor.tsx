"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Play,
  RotateCcw,
  Plus,
  X,
  Terminal,
  CheckCircle,
  XCircle,
  FileCode,
  Loader2,
} from "lucide-react"

type JavaFile = {
  id: string
  name: string
  content: string
}

interface CodeEditorProps {
  readOnly?: boolean
  expectedOutput?: string
  testCases?: string[]
  onSuccess?: () => void
  starterCode?: string
  initialCode?: string
}

export default function CodeEditor({
  readOnly = false,
  expectedOutput,
  testCases = [],
  onSuccess,
  starterCode,
  initialCode,
}: CodeEditorProps) {
  const defaultCode = starterCode || initialCode || `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`

  const [files, setFiles] = useState<JavaFile[]>([
    { id: "1", name: "Main.java", content: defaultCode },
  ])

  const [activeFileId, setActiveFileId] = useState("1")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [showAddFile, setShowAddFile] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const activeFile = files.find((f) => f.id === activeFileId)
  const mainFile = files.find((f) => f.name === "Main.java")

  const addFile = () => {
    if (!newFileName.trim()) return
    const fileName = newFileName.trim().endsWith(".java")
      ? newFileName.trim()
      : newFileName.trim() + ".java"

    const initialContent = fileName === "Main.java"
      ? `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Main!");\n    }\n}`
      : `public class ${fileName.replace(".java", "")} {\n\n}`

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
    if (files.length <= 1) return
    const newFiles = files.filter((f) => f.id !== fileId)
    setFiles(newFiles)
    if (activeFileId === fileId) setActiveFileId(newFiles[0].id)
  }

  const updateFileContent = (fileId: string, content: string) => {
    setFiles(files.map((f) => (f.id === fileId ? { ...f, content } : f)))
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
          files: files.map((f) => ({ name: f.name, content: f.content })),
          mainClass: "Main",
        }),
      })

      const data = await response.json()
      setOutput(data.output)

      if (expectedOutput) {
        const matches = data.output.trim() === expectedOutput.trim()
        if (matches) {
          setAllTestsPassed(true)
          if (onSuccess) onSuccess()
        } else {
          setAllTestsPassed(false)
        }
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    }
    setIsRunning(false)
  }

  const resetCode = () => {
    setFiles([{ id: "1", name: "Main.java", content: defaultCode }])
    setActiveFileId("1")
    setOutput("")
    setAllTestsPassed(false)
  }

  const isCorrect = expectedOutput && output && output.trim() === expectedOutput.trim()
  const isIncorrect = expectedOutput && output && output.trim() !== expectedOutput.trim()

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-amber-400/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
            </div>
            <span className="text-xs text-muted-foreground font-medium ml-2">Code Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={resetCode}
              variant="ghost"
              size="sm"
              disabled={isRunning || readOnly}
              className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
            <Button
              onClick={runCode}
              disabled={isRunning || readOnly}
              size="sm"
              className="h-7 text-xs gap-1.5 gradient-primary text-white border-0 shadow-sm"
            >
              {isRunning ? (
                <><Loader2 className="h-3 w-3 animate-spin" /> Running...</>
              ) : (
                <><Play className="h-3 w-3" /> Run Code</>
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center border-b border-border bg-secondary/20 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-xs transition-colors border-r border-border last:border-r-0 ${
                activeFileId === file.id
                  ? "bg-card text-foreground border-b-2 border-b-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              <FileCode className="h-3 w-3" />
              <span className="font-medium">{file.name}</span>
              {file.name === "Main.java" && (
                <Badge variant="secondary" className="text-[9px] h-4 px-1">main</Badge>
              )}
              {files.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(file.id) }}
                  className="hover:text-destructive ml-0.5 opacity-50 hover:opacity-100"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              )}
            </div>
          ))}
          {!showAddFile ? (
            <button
              onClick={() => setShowAddFile(true)}
              className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1">
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="File.java"
                className="w-24 h-6 text-xs rounded-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addFile()
                  if (e.key === "Escape") { setShowAddFile(false); setNewFileName("") }
                }}
                autoFocus
              />
              <Button size="sm" onClick={addFile} className="h-6 px-2 text-[10px]">Add</Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setShowAddFile(false); setNewFileName("") }}
                className="h-6 w-6 p-0"
              >
                <X className="h-2.5 w-2.5" />
              </Button>
            </div>
          )}
        </div>
        {activeFile && (
          <div className="relative">
            <Textarea
              value={activeFile.content}
              onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
              className="font-mono text-sm min-h-[280px] resize-none bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4 code-textarea text-foreground"
              placeholder="Write your Java code here..."
              readOnly={readOnly}
              spellCheck={false}
            />
          </div>
        )}
      </div>
      {output && (
        <div className={`rounded-2xl border overflow-hidden animate-scale-in ${
          isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : isIncorrect ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-card/80"
        }`}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Output</span>
            </div>
            {expectedOutput && (
              <Badge
                variant={isCorrect ? "default" : "secondary"}
                className={`text-[10px] gap-1 ${isCorrect ? "bg-emerald-500 text-white" : ""}`}
              >
                {isCorrect ? (
                  <><CheckCircle className="h-2.5 w-2.5" /> Correct!</>
                ) : (
                  <><XCircle className="h-2.5 w-2.5" /> Try Again</>
                )}
              </Badge>
            )}
          </div>
          <div className="p-4">
            <pre className="font-mono text-sm whitespace-pre-wrap text-foreground leading-relaxed">{output}</pre>
            {expectedOutput && isIncorrect && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-1">Expected Output:</p>
                <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">{expectedOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
