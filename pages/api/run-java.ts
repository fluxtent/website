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

    // Check if Java is available first
    exec("which javac", (checkError) => {
      if (checkError) {
        // Clean up files
        javaFiles.forEach(filePath => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        })
        return res.status(200).json({ 
          output: `Java is not installed on this system.\n\nTo install Java:\n\n1. Visit: https://adoptium.net/\n2. Download Java 17 (LTS) for macOS\n3. Install the downloaded .pkg file\n4. Restart your development server\n\nOr use Homebrew:\n  brew install openjdk@17` 
        })
      }

      // Compile all files
      const compileCommand = `javac ${javaFiles.join(" ")}`

      exec(compileCommand, (compileError, stdout, stderr) => {
        if (compileError || stderr) {
          // Check if it's a Java not found error
          const errorMsg = stderr || compileError?.message || ""
          if (errorMsg.includes("Unable to locate a Java Runtime") || errorMsg.includes("java: command not found") || errorMsg.includes("javac: command not found")) {
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
            return res.status(200).json({ 
              output: `Java is not installed on this system.\n\nTo install Java:\n\n1. Visit: https://adoptium.net/\n2. Download Java 17 (LTS) for macOS\n3. Install the downloaded .pkg file\n4. Restart your development server\n\nOr use Homebrew:\n  brew install openjdk@17` 
            })
          }
          
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
            const errorMsg = runStderr || runError?.message || ""
            if (errorMsg.includes("Unable to locate a Java Runtime") || errorMsg.includes("java: command not found")) {
              return res.status(200).json({ 
                output: `Java is not installed on this system.\n\nTo install Java:\n\n1. Visit: https://adoptium.net/\n2. Download Java 17 (LTS) for macOS\n3. Install the downloaded .pkg file\n4. Restart your development server\n\nOr use Homebrew:\n  brew install openjdk@17` 
              })
            }
            return res.status(200).json({ output: `Runtime Error:\n${runStderr}` })
          }

          res.status(200).json({ output: runStdout })
        })
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
