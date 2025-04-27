import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is trying to access a protected route
  const isProtectedRoute =
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/register") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.includes(".")

  if (isProtectedRoute) {
    // Check for authentication (this is just a placeholder)
    const token = request.cookies.get("token")?.value || request.headers.get("Authorization")?.split(" ")[1]

    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // In a real app, you would also verify the token's validity here
    // This could involve checking expiration, signature, etc.
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
