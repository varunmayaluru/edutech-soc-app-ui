import { getToken, setToken, isTokenExpired, tokenNeedsRefresh, removeToken } from "./auth"

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false
// Store pending requests that are waiting for token refresh
let pendingRequests: Array<() => void> = []

/**
 * Make an authenticated API request with automatic token refresh
 */
export async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
): Promise<T> {
  // Get the current token
  let token = getToken()

  // If token exists and needs refresh, refresh it before proceeding
  if (token && tokenNeedsRefresh(token)) {
    token = await refreshTokenIfNeeded()
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  }

  if (body && (method === "POST" || method === "PUT")) {
    config.body = JSON.stringify(body)
  }

  // Construct the full URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:8000"
  const url = endpoint.startsWith("/") ? `${apiUrl}${endpoint}` : `${apiUrl}/${endpoint}`

  try {
    const response = await fetch(url, config)

    // Handle unauthorized error (token might be expired)
    if (response.status === 401) {
      // If token refresh failed or we already tried to refresh, logout
      if (isTokenExpired(token || "") && !isRefreshing) {
        // Attempt to refresh the token
        const newToken = await refreshToken()
        if (newToken) {
          // Retry the request with the new token
          return apiRequest<T>(endpoint, method, body)
        }
      }
      throw new Error("Unauthorized: Please log in again")
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `API request failed with status ${response.status}`)
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error)
    throw error
  }
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string) {
  // Create the credentials object
  const credentials = { email, password }

  // Convert to JSON string and then base64 encode
  const jsonString = JSON.stringify(credentials)
  const base64Data = btoa(jsonString)

  // Prepare the request payload
  const payload = {
    data: base64Data,
  }

  return apiRequest<{ token: string; token_type: string }>("/auth/login", "POST", payload)
}

/**
 * Refresh the authentication token
 */
export async function refreshToken(): Promise<string | null> {
  // If already refreshing, wait for that to complete
  if (isRefreshing) {
    return new Promise((resolve) => {
      pendingRequests.push(() => {
        resolve(getToken())
      })
    })
  }

  isRefreshing = true

  try {
    const token = getToken()
    if (!token) return null

    // Call the refresh token endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()
    setToken(data.token)

    // Resolve all pending requests
    pendingRequests.forEach((callback) => callback())
    pendingRequests = []

    return data.token
  } catch (error) {
    console.error("Error refreshing token:", error)
    return null
  } finally {
    isRefreshing = false
  }
}

/**
 * Check and refresh token if needed
 */
export async function refreshTokenIfNeeded(): Promise<string | null> {
  const token = getToken()
  if (!token) return null

  // If token needs refresh, refresh it
  if (tokenNeedsRefresh(token)) {
    return await refreshToken()
  }

  return token
}

/**
 * Logout user
 */
export async function logout() {
  try {
    const token = getToken()
    if (token) {
      // Call logout endpoint if available
      await apiRequest("/auth/logout", "POST")
    }
  } catch (error) {
    console.error("Error during logout:", error)
  } finally {
    // Remove token regardless of API call success
    removeToken()
  }
}
