import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
  className?: string
}

export default function Logo({ size = "medium", showText = true, className = "" }: LogoProps) {
  // Define sizes for different variants
  const sizes = {
    small: {
      container: "w-8 h-8",
      text: "text-lg",
      letter: "text-lg",
    },
    medium: {
      container: "w-10 h-10",
      text: "text-xl",
      letter: "text-xl",
    },
    large: {
      container: "w-20 h-20",
      text: "text-3xl",
      letter: "text-4xl",
    },
  }

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div
        className={`${sizes[size].container} rounded-full bg-gradient-to-br from-[#1e74bb] to-[#3661f5] flex items-center justify-center shadow-md`}
        style={{
          boxShadow: "0 4px 10px rgba(30, 116, 187, 0.3)",
        }}
      >
        <span className={`text-white font-bold ${sizes[size].letter}`}>P</span>
      </div>
      {showText && <span className={`text-[#1e74bb] ${sizes[size].text} font-medium ml-2`}>ProbEd</span>}
    </Link>
  )
}
