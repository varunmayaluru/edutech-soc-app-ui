"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Lock, Github } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and authenticate here
    // For now, we'll just redirect to the dashboard
    router.push("/")
  }

  const handleGoogleLogin = () => {
    // In a real app, you would implement Google OAuth here
    console.log("Google login clicked")
    router.push("/")
  }

  const handleGithubLogin = () => {
    // In a real app, you would implement GitHub OAuth here
    console.log("GitHub login clicked")
    router.push("/")
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-[#eeedf1] rounded-md"></div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-3xl font-medium text-center mb-2">
            Welcome <span className="text-[#1e74bb]">ProbEd</span>
          </h1>
          <p className="text-center text-[#5b5772] mb-8">Login to your account</p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#16151a]">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-[#706d8a]" />
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#1e74bb] focus:ring-[#1e74bb] border-[#d8d7e0] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#5b5772]">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1e74bb] text-white font-medium rounded-md hover:bg-[#1a67a7] focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:ring-opacity-50 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center mt-6">
            <div className="border-t border-[#d8d7e0] absolute w-full"></div>
            <div className="bg-white px-4 relative text-sm text-[#5b5772]">OR</div>
          </div>

          {/* Social Login Buttons - Side by Side */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center py-3 px-2 border border-[#d8d7e0] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:ring-opacity-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                <path
                  fill="#EA4335"
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center py-3 px-2 border border-[#d8d7e0] rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:ring-opacity-50 transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          {/* Forgot Password and Register */}
          <div className="mt-6 text-center">
            <span className="text-[#5b5772]">Forget password? </span>
            <Link href="#" className="text-[#1e74bb] hover:underline">
              Click here
            </Link>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[#5b5772]">Don't have an account? </span>
            <Link href="/register" className="text-[#1e74bb] hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Blue Background with Text */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 bg-[#1e74bb]/80 z-10"></div>
        <Image
          src="/images/login-background.jpg"
          alt="Students studying in a classroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-12">
          <h2 className="text-white text-4xl font-medium max-w-md">
            Please enter your credentials to access your online examination.
          </h2>
        </div>
      </div>
    </div>
  )
}
