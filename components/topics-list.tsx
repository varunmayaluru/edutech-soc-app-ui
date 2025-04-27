import Link from "next/link"
import { getTopics } from "@/lib/data"

export default function TopicsList({ subjectId }: { subjectId: string }) {
  const topics = getTopics(subjectId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <div key={topic.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-3`}>
              {topic.icon === "📊" && <div className="w-5 h-5 bg-green-500 rounded-sm"></div>}
              {topic.icon === "📈" && <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>}
              {topic.icon === "📏" && <div className="w-5 h-5 bg-orange-500 rounded-sm"></div>}
            </div>
            <h3 className="text-gray-800 font-medium">{topic.title}</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#1e74bb] font-medium">
              10 Quizs
              {topic.completed && <span className="text-gray-400 text-sm"> /{topic.completed} Completed</span>}
              {topic.timeframe && <span className="text-gray-400 text-sm"> In a week</span>}
            </p>
            <Link
              href={`/subjects/${subjectId}/${topic.id}`}
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
