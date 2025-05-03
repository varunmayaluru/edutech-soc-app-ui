// Environment configuration
const config = {
  // API URL - use environment variable if available, otherwise use default
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0:8000",

  // Default timeout for API requests in milliseconds
  apiTimeout: 30000,

  // Token storage key
  tokenKey: "probed_auth_token",

  // Token refresh settings
  tokenRefresh: {
    // Refresh token when it's about to expire in X milliseconds
    threshold: 5 * 60 * 1000, // 5 minutes
    // Maximum number of retry attempts for token refresh
    maxRetries: 3,
  },

  // Cookie settings
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  },
}

export default config
