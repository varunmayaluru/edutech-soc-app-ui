"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getUserFromToken } from "@/lib/auth"
import { login as apiLogin, logout as apiLogout } from "@/lib/api"

type User = {
  email: string
  exp: number
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const userData = getUserFromToken()
        setUser(userData)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await apiLogin(email, password)

      // Check if we got a token back
      if (!data.token) {
        throw new Error("No token received from server")
      }

      // Get user data from token
      const userData = getUserFromToken()
      setUser(userData)

      return data
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Failed to login")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      await apiLogout()
      setUser(null)
      router.push("/login")
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
