"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Bell, MessageSquare, LogOut, Settings, User, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { removeToken } from "@/lib/auth"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    removeToken()
    router.push("/login")
  }

  return (
    <header className="border-b border-gray-200 py-3 px-6 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e74bb] to-[#3661f5] flex items-center justify-center mr-2 shadow-md">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-[#1e74bb] text-xl font-medium">ProbEd</span>
        </Link>

        <div className="ml-8 flex items-center">
          <Image
            src="https://v0.blob.com/Yd9Ij.png"
            alt="Delhi Public School"
            width={120}
            height={50}
            className="h-10 w-auto"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-md w-full px-4">
        <div className="absolute inset-y-0 left-4 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search here"
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full text-sm"
        />
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-500 hover:text-[#1e74bb] rounded-full">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-[#1e74bb] rounded-full ml-2">
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="flex items-center ml-4">
          <div className="relative group">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-md">
                <Image
                  src="/images/user-avatar.jpg"
                  alt="Eleanor Pena"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col ml-3">
                <span className="font-medium block text-gray-800">Eleanor Pena</span>
                <span className="text-xs text-gray-500 block">Welcome to "Your name"</span>
              </div>
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
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center w-full text-left"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
