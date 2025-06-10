import { notFound } from "next/navigation"
import { getSubject } from "@/lib/data"
import TopicsList from "@/components/topics-list"

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = getSubject(params.subject)

  if (!subject) {
    notFound()
  }

  return (
    <div>
      <div className="bg-[#1e74bb] text-white p-6 shadow-md">
        <h1 className="text-2xl font-medium mb-2">Welcome to {subject.name}</h1>
        <p>Select a topic below to explore concepts, examples, and practice quizzes.</p>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-medium mt-6 mb-4">Topics</h2>
        <TopicsList subjectId={params.subject} />
      </div>
    </div>
  )
}
