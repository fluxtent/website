'use client'
import LessonViewer from '@/components/lesson-viewer'

export default function Module2Page() {
  return <LessonViewer moduleId={2} onBack={() => window.location.href = '/modules'} />
}
