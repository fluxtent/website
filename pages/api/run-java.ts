import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { exec } from "child_process"
import path from "path"

interface JavaFile {
  name: string
  content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { files, mainClass } = req.body

  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "No files provided" })
  }

  if (!mainClass) {
    return res.status(400).json({ error: "No main class specified" })
  }

  console.log("Using mainClass:", mainClass)
  console.log("Files:", files.map(f => f.name))

  const tmpDir = "/tmp"
  const javaFiles: string[] = []

  try {
    // Write all Java files
    for (const file of files) {
      const javaFilePath = path.join(tmpDir, file.name)
      fs.writeFileSync(javaFilePath, file.content)
      javaFiles.push(javaFilePath)
    }

    // Compile all files
    const compileCommand = `javac ${javaFiles.join(" ")}`

    exec(compileCommand, (compileError, stdout, stderr) => {
      if (compileError || stderr) {
        // Clean up files
        javaFiles.forEach(filePath => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
          const classFilePath = filePath.replace(".java", ".class")
          if (fs.existsSync(classFilePath)) {
            fs.unlinkSync(classFilePath)
          }
        })
        return res.status(200).json({ output: `Compilation Error:\n${stderr}` })
      }

      // Run the main class
      const runCommand = `java -cp ${tmpDir} ${mainClass}`

      exec(runCommand, (runError, runStdout, runStderr) => {
        // Clean up files
        javaFiles.forEach(filePath => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
          const classFilePath = filePath.replace(".java", ".class")
          if (fs.existsSync(classFilePath)) {
            fs.unlinkSync(classFilePath)
          }
        })

        if (runError || runStderr) {
          return res.status(200).json({ output: `Runtime Error:\n${runStderr}` })
        }

        res.status(200).json({ output: runStdout })
      })
    })
  } catch (error) {
    // Clean up files on error
    javaFiles.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      const classFilePath = filePath.replace(".java", ".class")
      if (fs.existsSync(classFilePath)) {
        fs.unlinkSync(classFilePath)
      }
    })
    return res.status(500).json({ error: `Server error: ${error}` })
  }
}
