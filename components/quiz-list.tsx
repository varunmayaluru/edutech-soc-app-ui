import Link from "next/link"
import { getQuizzes } from "@/lib/data"

export default function QuizList({ topicId }: { topicId: string }) {
  const quizzes = getQuizzes(topicId)

  // Quiz icons mapping
  const quizIcons = {
    "📊": "bg-green-500",
    "📏": "bg-orange-500",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-sm flex items-center justify-center mr-3">
              <div
                className={`w-5 h-5 ${quizIcons[quiz.icon as keyof typeof quizIcons] || "bg-gray-500"} rounded-sm`}
              ></div>
            </div>
            <h3 className="text-gray-800 font-medium">{quiz.title}</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#1e74bb] font-medium">
              10 Quizs
              {quiz.completedQuestions > 0 && (
                <span className="text-gray-400 text-sm"> /{quiz.completedQuestions} Completed</span>
              )}
            </p>
            <Link
              href={`/subjects/${quiz.subjectId}/${topicId}/${quiz.id}`}
              className="bg-[#1e74bb] text-white py-2 px-4 rounded-md text-sm"
            >
              Select a Quiz
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
