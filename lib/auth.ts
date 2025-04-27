// Store the JWT token
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)

    // Also set as a cookie for the middleware
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
  }
}

// Get the JWT token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Remove the JWT token (logout)
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")

    // Also remove the cookie
    document.cookie = "token=; path=/; max-age=0"
  }
}

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken()
  return !!token
}

// Add token to API requests
export const authHeader = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
