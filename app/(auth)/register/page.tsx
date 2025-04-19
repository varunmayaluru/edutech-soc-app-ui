"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Lock, Mail, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    // In a real app, you would register the user here
    // For now, we'll just redirect to the login page
    router.push("/login")
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Registration Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-[#eeedf1] rounded-md"></div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-3xl font-medium text-center mb-2">
            Join <span className="text-[#1e74bb]">ProbEd</span>
          </h1>
          <p className="text-center text-[#5b5772] mb-8">Create your account</p>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
          )}

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#16151a]">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-[#706d8a]" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#d8d7e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#16151a]">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-[#706d8a]" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#d8d7e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                  required
                  minLength={6}
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#16151a]">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-[#706d8a]" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-[#d8d7e0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    className="text-[#706d8a]"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#1e74bb] focus:ring-[#1e74bb] border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-[#5b5772]">
                I agree to the{" "}
                <Link href="#" className="text-[#1e74bb] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#1e74bb] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1e74bb] text-white font-medium rounded-md hover:bg-[#1a67a7] focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:ring-opacity-50 transition-colors flex items-center justify-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-[#5b5772]">Already have an account? </span>
            <Link href="/login" className="text-[#1e74bb] hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Blue Background with Text */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 bg-[#1e74bb]/80 z-10"></div>
        <Image
          src="/images/study-group.jpg"
          alt="Students collaborating in a study group"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-12">
          <h2 className="text-white text-4xl font-medium max-w-md">
            Join our community of learners and unlock your full potential.
          </h2>
        </div>
      </div>
    </div>
  )
}
