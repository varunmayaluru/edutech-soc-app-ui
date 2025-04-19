import Link from "next/link"
import Image from "next/image"
import { Search, Bell, MessageSquare, LogOut, Settings, User, HelpCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-3 px-6 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1e74bb] flex items-center justify-center mr-2">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-[#1e74bb] text-xl font-medium">ProbEd</span>
        </Link>

        <div className="relative ml-8 hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-md text-sm"
          />
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-500 hover:text-[#1e74bb] rounded-full">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-[#1e74bb] rounded-full ml-2">
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="flex items-center ml-4">
          <div className="flex flex-col items-end mr-3 hidden sm:block">
            <span className="font-medium block text-gray-800">Eleanor Pena</span>
            <span className="text-sm text-gray-500 block">Welcome back</span>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <Image src="/images/user-avatar.jpg" alt="Eleanor Pena" width={40} height={40} className="object-cover" />
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">Eleanor Pena</p>
                <p className="text-xs text-gray-500 truncate">eleanor.pena@example.com</p>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1e74bb] flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1e74bb] flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <Link
                href="/help"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1e74bb] flex items-center"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
