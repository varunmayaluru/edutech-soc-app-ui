import type React from "react"
import "@/app//globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "The Physics Lab",
  description: "Interactive physics learning platform",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050714] font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'