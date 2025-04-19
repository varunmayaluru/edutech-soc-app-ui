"use client"

import { useState } from "react"
import { AlertCircle, ChevronLeft, ChevronRight, X, Search, MoreHorizontal, Bot, User } from "lucide-react"
import { useRouter } from "next/navigation"
import SuccessModal from "./success-modal"

type QuizInterfaceProps = {
  quiz: any
  breadcrumb: {
    subject: string
    category: string
    topic: string
  }
}

export default function QuizInterface({ quiz, breadcrumb }: QuizInterfaceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [showChat, setShowChat] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "I noticed you selected an incorrect answer. How can I help you understand this concept better?",
    },
  ])
  const router = useRouter()

  // Options with correct/incorrect flags
  const quizOptions = [
    { id: 0, text: "Identify variables, constants, and coefficients", isCorrect: true },
    { id: 1, text: "Simplify expressions like 3x + 5 - x + 2.", isCorrect: false },
    { id: 2, text: "Solve equations like 2y + 5 = 11.", isCorrect: true },
    { id: 3, text: "Translate word problems into simple algebraic", isCorrect: true },
  ]

  // Simplified topics data
  const topics = [
    {
      id: "cosmic-evolution",
      title: "Cosmic Evolution",
      icon: "🌟",
      time: "7:34 PM",
      preview: "Some 15 billion years ago the universe emerged from a hot, dense sea of matter and energy.",
    },
    {
      id: "warning-messages",
      title: "Warning Messages Samples",
      icon: "⚠️",
      time: "Wed",
      preview: "Here are three different versions of 404 error messages for an ecommerce clothing website.",
    },
  ]

  const handleTopicClick = (topic: any) => {
    setSelectedTopic(topic)
  }

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
    const selectedQuizOption = quizOptions.find((option) => option.id === index)

    if (selectedQuizOption && !selectedQuizOption.isCorrect) {
      setShowChat(true)
      // Reset chat messages when a new incorrect option is selected
      setMessages([
        {
          sender: "assistant",
          text: "I noticed you selected an incorrect answer. Let me help you understand this concept better.",
        },
      ])
    } else {
      setShowChat(false)
    }
  }

  const handleSubmit = () => {
    setShowSuccessModal(true)
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    const topicId = quiz.topicId || "arithmetic-number-sense"
    router.push(`/subjects/${quiz.subjectId}/${topicId}/${quiz.id}/results`)
  }

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return

    // Add user message
    const newMessages = [...messages, { sender: "user", text: chatInput }]
    setMessages(newMessages)
    setChatInput("")

    // Simulate assistant response after a short delay
    setTimeout(() => {
      let responseText =
        "I understand your question. For this algebraic expression, remember that we need to combine like terms. When simplifying '3x + 5 - x + 2', we group the variables (3x - x = 2x) and constants (5 + 2 = 7) to get '2x + 7'."

      if (chatInput.toLowerCase().includes("help") || chatInput.toLowerCase().includes("understand")) {
        responseText =
          "Let me help you understand this better. When simplifying algebraic expressions, we need to combine like terms. Like terms have the same variables raised to the same powers. In this case, '3x' and '-x' are like terms because they both have the variable 'x' to the power of 1."
      }

      setMessages([...newMessages, { sender: "assistant", text: responseText }])
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-160px)]">
      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />

      {/* Left side - Quiz content with scrolling */}
      <div className="w-full md:w-8/12 p-6 overflow-y-auto">
        {/* Question navigation */}
        <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-2 sticky top-0 z-10">
          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex overflow-x-auto space-x-1">
            {Array.from({ length: 20 }, (_, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                  i + 1 === currentPage
                    ? "bg-[#1e74bb] text-white"
                    : i + 1 < currentPage
                      ? "text-[#1e74bb] border-b-2 border-[#1e74bb]"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Quiz content */}
        <div className="bg-gray-50 rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-medium text-center mb-6">Algebra Fundamentals Quiz ?</h2>

          <div className="flex justify-center mb-8">
            <button className="bg-[#1e74bb] text-white py-2 px-6 rounded-md text-sm font-medium">QUIZ 1 TO 20</button>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {quizOptions.map((option) => (
              <div
                key={option.id}
                className={`bg-white border ${
                  selectedOption === option.id
                    ? option.isCorrect
                      ? "border-2 border-green-500"
                      : "border-2 border-red-500"
                    : "border-gray-200"
                } rounded-lg p-4 flex items-center cursor-pointer`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div
                  className={`w-6 h-6 rounded-full ${
                    selectedOption === option.id
                      ? option.isCorrect
                        ? "bg-green-500 flex items-center justify-center"
                        : "bg-red-500 flex items-center justify-center"
                      : "border-2 border-gray-300"
                  } mr-4 flex-shrink-0`}
                >
                  {selectedOption === option.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{option.text}</span>
                {selectedOption === option.id && !option.isCorrect && (
                  <div className="ml-auto flex items-center text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Incorrect</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10 max-w-2xl mx-auto">
            <button className="bg-[#1e74bb] text-white py-2 px-6 rounded-md text-sm font-medium">PREV</button>
            <button className="bg-[#1e74bb] text-white py-2 px-6 rounded-md text-sm font-medium" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>

        {/* Help Assistant Chat Section */}
        {showChat && (
          <div
            className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200 overflow-hidden"
            ref={(el) => {
              if (el && selectedOption !== null) {
                // Auto scroll to chat when it becomes visible
                el.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            }}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#1e74bb] flex items-center justify-center mr-2">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Help Assistant</h3>
                  <p className="text-xs text-gray-500">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className="h-80 overflow-y-auto p-3 bg-blue-50"
              ref={(el) => {
                // Auto scroll to bottom when messages change
                if (el) {
                  el.scrollTop = el.scrollHeight
                }
              }}
            >
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${message.sender === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    {message.sender === "assistant" && (
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-7 h-7 rounded-full bg-[#1e74bb] flex items-center justify-center">
                          <Bot size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-2 rounded-lg ${
                        message.sender === "assistant"
                          ? "bg-white text-gray-800 border border-gray-100 shadow-sm"
                          : "bg-[#1e74bb] text-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-60">
                        {message.sender === "assistant" ? "Just now" : "1 min ago"}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {/* If user has profile photo, use it, otherwise show icon */}
                          <User size={14} className="text-gray-600" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask for help with this question..."
                  className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e74bb] focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim() !== "") {
                      handleSendMessage()
                    }
                  }}
                />
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <button
                    className="bg-[#1e74bb] text-white p-1.5 rounded-full hover:bg-[#1a65a5] transition-colors"
                    onClick={handleSendMessage}
                    disabled={chatInput.trim() === ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Relevant Topics (simplified) */}
      <div className="hidden md:block w-4/12 border-l border-gray-200 p-6 bg-white overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          {selectedTopic ? (
            <>
              <button
                onClick={() => setSelectedTopic(null)}
                className="flex items-center text-gray-600 hover:text-[#1e74bb]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <h3 className="text-xl font-medium">Back to Topics</h3>
              </button>
            </>
          ) : (
            <h3 className="text-xl font-medium">Relevant Topics</h3>
          )}
          <button className="text-gray-400">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-10 py-2 w-full border border-gray-200 rounded-md text-sm"
          />
        </div>

        {selectedTopic ? (
          // Topic Detail View (simplified)
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3">
                <span className="text-xl">{selectedTopic.icon}</span>
              </div>
              <div>
                <h4 className="font-medium">{selectedTopic.title}</h4>
                <p className="text-xs text-gray-500">{selectedTopic.time}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2">
              <p className="text-sm text-gray-700">{selectedTopic.preview}</p>
            </div>
          </div>
        ) : (
          // Topics list (simplified)
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleTopicClick(topic)}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-6 h-6 flex items-center justify-center">{topic.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{topic.title}</h4>
                      <span className="text-xs text-gray-500">{topic.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{topic.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
