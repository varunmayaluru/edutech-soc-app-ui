"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { setToken } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store the JWT token using our utility
      setToken(data.token)

      // Redirect to dashboard
      router.push("/")
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Login Form with patterned background */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-24 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231e74bb' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Logo at top left */}
        <div className="absolute top-8 left-8 flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1e74bb] flex items-center justify-center mr-2">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-[#1e74bb] text-xl font-medium">ProbED</span>
        </div>

        <div className="w-full max-w-md z-10">
          {/* Center logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#1e74bb] flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-3xl font-medium text-center mb-2">
            Welcome <span className="text-[#1e74bb]">ProbED</span>
          </h1>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
          )}
          <p className="text-center text-[#5b5772] mb-8">Login to your account</p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#16151a]">
                User ID / Email / Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-[#706d8a]" />
                </div>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#d8d7e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  placeholder="Enter your User ID / Email / Student ID"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#16151a]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-[#706d8a]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-[#d8d7e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  placeholder="******"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-[#706d8a]"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1e74bb] text-white font-medium rounded-md hover:bg-[#1a67a7] focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:ring-opacity-50 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-6 text-center">
            <span className="text-[#5b5772]">Forget password? </span>
            <Link href="#" className="text-[#1e74bb] hover:underline">
              Click here
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Blue Background with Online Exam Image */}
      <div className="hidden lg:block w-1/2 relative">
        <Image src="/images/login-background.jpg" alt="Online Exam Platform" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#1e74bb]/80 z-10 flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ProbEd-jGxnsUItaRltSc0bIC34OnM8SKXWvu.png"
            alt="ProbEd Online Exam Platform"
            width={700}
            height={500}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
