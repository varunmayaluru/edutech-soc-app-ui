import config from "./config"

// Store the JWT token
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(config.tokenKey, token)

    // Also set as a cookie for the middleware
    document.cookie = `token=${token}; path=${config.cookieOptions.path}; max-age=${config.cookieOptions.maxAge}${
      config.cookieOptions.secure ? "; secure" : ""
    }; samesite=${config.cookieOptions.sameSite}`
  }
}

// Get the JWT token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(config.tokenKey)
  }
  return null
}

// Remove the JWT token (logout)
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(config.tokenKey)

    // Also remove the cookie
    document.cookie = "token=; path=/; max-age=0"
  }
}

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken()
  if (!token) return false

  // Check if token is expired
  const tokenData = decodeToken(token)
  if (!tokenData) return false

  // If token has no expiration or expiration is in the future, user is authenticated
  return !isTokenExpired(token)
}

// Create base64 encoded credentials
export const createBase64Credentials = (email: string, password: string): string => {
  const credentials = { email, password }
  const jsonString = JSON.stringify(credentials)
  return btoa(jsonString)
}

// Decode JWT token to get user info (without verification)
export const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  const tokenData = decodeToken(token)
  if (!tokenData || !tokenData.exp) return true

  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = tokenData.exp * 1000
  const currentTime = Date.now()

  // Token is expired if current time is past expiration time
  return currentTime >= expirationTime
}

// Check if token needs refresh (e.g., expires in less than 5 minutes)
export const tokenNeedsRefresh = (token: string): boolean => {
  const tokenData = decodeToken(token)
  if (!tokenData || !tokenData.exp) return true

  const expirationTime = tokenData.exp * 1000
  const currentTime = Date.now()
  const refreshThreshold = 5 * 60 * 1000 // 5 minutes in milliseconds

  // Token needs refresh if it expires in less than the threshold
  return expirationTime - currentTime < refreshThreshold
}

// Get user info from token
export const getUserFromToken = (): { sub: string; exp: number } | null => {
  const token = getToken()
  if (!token) return null

  return decodeToken(token)
}
