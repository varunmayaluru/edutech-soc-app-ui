"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Book, FlaskRoundIcon as Flask, Award, Settings, HelpCircle, Menu, X, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

interface SidebarProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export function Sidebar({ menuOpen, setMenuOpen }: SidebarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }


  useEffect(() => {
    setMounted(true)
  }, [])


  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <Book size={20} />, label: "Lessons" },
    { icon: <Flask size={20} />, label: "Experiments", active: true },
    { icon: <Award size={20} />, label: "Achievements" },
    { icon: <HelpCircle size={20} />, label: "Help" },
    { icon: <Settings size={20} />, label: "Settings" },
  ]

  return (
    <div
      className={cn(
        "fixed md:relative z-40 h-full h-screen transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0c0e1d] to-[#0a0c17] border-r border-[#1a1e36] dark:from-[#0c0e1d] dark:to-[#0a0c17] light:from-slate-100 light:to-white light:border-slate-200",
        menuOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#1a1e36] dark:border-[#1a1e36] light:border-slate-200">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 rounded-full hover:bg-[#1a1e36] dark:hover:bg-[#1a1e36] light:hover:bg-slate-200 transition-colors"
        >
          {menuOpen ? <X size={20} className="text-purple-400" /> : <Menu size={20} className="text-purple-400" />}
        </button>
      </div>

      <nav className="flex flex-col h-[calc(100%-8rem)] p-2">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={cn(
                  "flex items-center p-3 rounded-lg transition-all",
                  item.active
                    ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-700/50 dark:from-purple-900/50 dark:to-indigo-900/50 dark:border-purple-700/50 light:from-purple-100 light:to-indigo-100 light:border-purple-300"
                    : "hover:bg-[#1a1e36] dark:hover:bg-[#1a1e36] light:hover:bg-slate-200",
                )}
              >
                <span className={cn("text-purple-400", item.active && "text-purple-300")}>{item.icon}</span>
                {menuOpen && (
                  <span
                    className={cn(
                      "ml-3 transition-opacity",
                      item.active ? "text-purple-300" : "text-gray-300 dark:text-gray-300 light:text-gray-700",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle at the bottom */}
        <div className="mt-auto mb-4">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className={cn(
              "flex items-center justify-center w-full p-3 rounded-lg transition-all",
              "hover:bg-[#1a1e36] dark:hover:bg-[#1a1e36] light:hover:bg-slate-200",
            )}
          >
            {mounted && (
              menuOpen ? (
                <div className="flex items-center">
                  <span className="text-purple-400">
                    {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </span>
                  <span className="ml-3 text-gray-300 dark:text-gray-300 light:text-gray-700">
                    {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
              ) : (
                <span className="text-purple-400">
                  {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </span>
              )
            )}

          </Button>
        </div>
      </nav>
    </div>
  )
}
