import type { NextApiRequest, NextApiResponse } from "next"

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

  try {

    let sourceCode = ""
    let mainCode = ""

    files.forEach((f: any) => {
      if (f.name === "Main.java" || f.content.includes("public static void main")) {
        mainCode = f.content
      } else {

        sourceCode += f.content.replace(/public\s+class/g, "class") + "\n\n"
      }
    })


    const combinedCode = sourceCode + mainCode


    const response = await fetch("https://ce.judge0.com/submissions?wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: combinedCode,
        language_id: 62,
        cpu_time_limit: 5,
        memory_limit: 128000
      })
    })

    if (!response.ok) {
        throw new Error(`Execution Service API Error: ${response.statusText}`)
    }

    const data = await response.json()
    

    if (data.compile_output) {
        return res.status(200).json({ output: `Compilation Error:\n${data.compile_output}` })
    }

    if (data.stderr) {
        return res.status(200).json({ output: `Runtime Error:\n${data.stderr}` })
    }


    const stdout = (data.stdout && data.stdout !== null) ? data.stdout : ""
    return res.status(200).json({ output: stdout })

  } catch (error: any) {
    console.error("Code execution error:", error)
    return res.status(500).json({ 
        output: "Server execution error. Unable to reach execution engine at this time. Details: " + error.message
    })
  }
}
