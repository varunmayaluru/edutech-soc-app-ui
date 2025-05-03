import Link from "next/link"

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 bg-green-500 rounded-sm mr-2"></div>
            <h3 className="text-gray-700 font-medium">Courses</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-green-600 font-medium">6 Subjects</p>
            <Link href="/subjects" className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block ml-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 bg-blue-500 rounded-sm mr-2"></div>
            <h3 className="text-gray-700 font-medium">Tasks Complete</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-blue-600 font-medium">
              8 Tasks <span className="text-gray-400 text-sm">/12 Tasks</span>
            </p>
            <Link href="/tasks" className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block ml-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 bg-orange-500 rounded-sm mr-2"></div>
            <h3 className="text-gray-700 font-medium">Spend Hours</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-orange-600 font-medium">
              8 Hours <span className="text-gray-400 text-sm">In a week</span>
            </p>
            <Link href="/hours" className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block ml-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
