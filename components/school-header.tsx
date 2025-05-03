export default function SchoolHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center">
      <div
        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e74bb] to-[#3661f5] flex items-center justify-center mr-3 text-white shadow-md"
        style={{
          boxShadow: "0 4px 10px rgba(30, 116, 187, 0.3)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m2 7 8-5 12 5-12 5z" />
          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
          <path d="M12 9v13" />
        </svg>
      </div>
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
  )
}
