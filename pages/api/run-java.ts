import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { exec } from "child_process"
import path from "path"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { code } = req.body

  let className = "Main"

  const classMatch = code.match(/public\s+class\s+(\w+)/)
  if (classMatch && classMatch[1]) {
    className = classMatch[1]
  }
  console.log("Using className:", className)
  const javaFilePath = path.join("/tmp", `${className}.java`)

  fs.writeFileSync(javaFilePath, code)

  const compileCommand = `javac ${javaFilePath}`
  const runCommand = `java -cp /tmp ${className}`

  exec(compileCommand, (compileError, stdout, stderr) => {
    if (compileError || stderr) {
      return res.status(200).json({ output: `Compilation Error:\n${stderr}` })
    }

    exec(runCommand, (runError, runStdout, runStderr) => {
      if (runError || runStderr) {
        return res.status(200).json({ output: `Runtime Error:\n${runStderr}` })
      }

      res.status(200).json({ output: runStdout })

      fs.unlinkSync(javaFilePath)
      const classFilePath = javaFilePath.replace(".java", ".class")
      if (fs.existsSync(classFilePath)) {
        fs.unlinkSync(classFilePath)
      }
    })
  })
}
