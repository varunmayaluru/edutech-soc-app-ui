import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}
      style={{ borderRadius: "0.5rem" }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = "" }: CardProps) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>
}
