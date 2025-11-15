import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { getUserProgress, saveUserProgress, markLessonComplete } from "@/lib/progress"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const progress = await getUserProgress(session.user.id)
    return NextResponse.json(progress || { userId: session.user.id, modules: {}, lastUpdated: new Date().toISOString() })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { moduleId, lessonId } = body

    if (moduleId && lessonId) {
      const progress = await markLessonComplete(session.user.id, moduleId, lessonId)
      return NextResponse.json(progress)
    }

    const progress = await saveUserProgress(session.user.id, body)
    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error saving progress:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

