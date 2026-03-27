import LearnExperience from "@/components/learn/learn-experience"

interface LearnPageProps {
  searchParams?: Promise<{
    module?: string
    lesson?: string
  }>
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = (await searchParams) ?? {}
  const moduleId = params.module ? Number.parseInt(params.module, 10) : null

  return (
    <LearnExperience
      initialModuleId={Number.isFinite(moduleId) ? moduleId : null}
      initialLessonId={params.lesson ?? null}
    />
  )
}
