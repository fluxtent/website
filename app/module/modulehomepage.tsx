'use client'

import { useRouter } from 'next/navigation'

export default function ModulesHome() {
  const router = useRouter()

  const modules = [
    {
      id: 1,
      title: "Module 1 – Java Basics",
      description: "Print statements, variables, and primitive data types.",
    },
    {
      id: 2,
      title: "Module 2 – Control Flow",
      description: "If-else, boolean expressions, and logic.",
    },
    {
      id: 3,
      title: "Module 3 – Loops",
      description: "For loops, while loops, and iteration patterns.",
    }
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <h1 className="text-4xl font-bold mb-8">Available Modules</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer transition"
            onClick={() => router.push(`/modules/module-${mod.id}`)}
          >
            <h2 className="text-2xl font-semibold mb-2">{mod.title}</h2>
            <p className="text-gray-300">{mod.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
