'use client'
import LessonViewer from '@/components/lesson-viewer'

export default function Module1Page() {
  return <LessonViewer moduleId={1} onBack={() => window.location.href = '/modules'} />
}
