import { ChevronRight } from "lucide-react"
import OverviewCards from "@/components/overview-cards"
import SubjectsList from "@/components/subjects-list"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Learning Overview Banner */}
      <div className="bg-[#1e74bb] text-white p-4 rounded-md mb-6 shadow-md">
        <h2 className="text-xl font-medium">Learning Overview</h2>
      </div>

      {/* Learning Overview Title */}
      <h2 className="text-xl font-medium mb-6">Learning Overview</h2>

      {/* Overview Cards */}
      <OverviewCards />

      <div className="flex justify-between items-center mt-10 mb-6">
        <h2 className="text-xl font-medium">My Subjects</h2>
        <Link href="/subjects" className="text-[#1e74bb] flex items-center">
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Subjects List */}
      <SubjectsList />
    </div>
  )
}
