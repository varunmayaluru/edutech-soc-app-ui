import Link from "next/link"
import { subjects } from "@/lib/data"
import Image from "next/image"

export default function SubjectsList() {
  // Subject icons mapping
  const subjectIcons = {
    arthematic: "/basic-calculator.png",
    science: "/placeholder.svg?key=gzuub",
    english: "/placeholder.svg?key=re3ri",
    "social-studies": "/world-globe.png",
    "computer-science": "/modern-computer-setup.png",
    hindhi: "/placeholder.svg?key=4xycn",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <div key={subject.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{subject.name}</h3>
            <div className="w-10 h-10">
              <Image
                src={subjectIcons[subject.id as keyof typeof subjectIcons] || "/placeholder.svg"}
                alt={subject.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">{subject.progress}%</span>
              <span className="text-gray-400 text-sm">{subject.completedLessons}/19 Lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${subject.progressColor} h-2 rounded-full`}
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>

          <Link
            href={`/subjects/${subject.id}`}
            className="inline-block bg-[#1e74bb] text-white py-2 px-4 rounded-md text-sm hover:bg-[#1a67a7] transition-colors"
          >
            Select a topic
          </Link>
        </div>
      ))}
    </div>
  )
}
