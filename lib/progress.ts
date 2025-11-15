import { promises as fs } from "fs"
import path from "path"

const PROGRESS_FILE = path.join(process.cwd(), "data", "user-progress.json")

export interface UserProgress {
  userId: string
  modules: {
    [moduleId: number]: {
      completed: number
      lessons: {
        [lessonId: string]: boolean
      }
    }
  }
  lastUpdated: string
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function readProgress(): Promise<Record<string, UserProgress>> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(PROGRESS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return {}
  }
}

async function writeProgress(progress: Record<string, UserProgress>) {
  await ensureDataDir()
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const allProgress = await readProgress()
  return allProgress[userId] || null
}

export async function saveUserProgress(userId: string, progress: Partial<UserProgress>) {
  const allProgress = await readProgress()
  const existing = allProgress[userId] || {
    userId,
    modules: {},
    lastUpdated: new Date().toISOString(),
  }

  allProgress[userId] = {
    ...existing,
    ...progress,
    lastUpdated: new Date().toISOString(),
  }

  await writeProgress(allProgress)
  return allProgress[userId]
}

export async function markLessonComplete(
  userId: string,
  moduleId: number,
  lessonId: string
) {
  const progress = await getUserProgress(userId)
  const updatedLessons = {
    ...(progress?.modules[moduleId]?.lessons || {}),
    [lessonId]: true,
  }
  
  // Count completed lessons (lessons marked as true)
  const completedCount = Object.values(updatedLessons).filter(Boolean).length
  
  const updatedModules = {
    ...(progress?.modules || {}),
    [moduleId]: {
      ...(progress?.modules[moduleId] || { completed: 0, lessons: {} }),
      lessons: updatedLessons,
      completed: completedCount,
    },
  }

  return await saveUserProgress(userId, { modules: updatedModules })
}

