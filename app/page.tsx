"use client"

import { useState } from "react"
import { useQuestion } from "@/hooks/use-question"
import { Sidebar } from "@/components/sidebar"
import { QuestionSection } from "@/components/question-section"
import { ChatInterface } from "@/components/chat-interface"
import { cn } from "@/lib/utils"
import { getActAnswer, getFirstSocQuestion, SocResponse } from "@/lib/api"

export default function PhysicsLab() {
  // State
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [userAnswer, setUserAnswer] = useState<string | null>("")
  const [chatActive, setChatActive] = useState(false)
  const [messages, setMessages] = useState<{ role: "assistant" | "user"; content: string }[]>([])
  const [userMessage, setUserMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success")

  // Custom hook for question management
  const {
    questionData,
    loading,
    error,
    quizFilename,
    nextQuestion: goToNextQuestion,
    previousQuestion: goToPreviousQuestion,
    useMockData,
  } = useQuestion("physics.xlsx")

  const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  // AI feedback options
  const ai_feedback_options = [
    "Oops, that's not quite right. No worries—let's figure it out together!",
    "Hmm, that's incorrect, but it's all part of learning. Let's dig in!",
    "That's not the correct answer, but hey, we're learning—let's explore it more!",
    "Not quite! But don't stress—we'll walk through it together.",
    "Incorrect, but that's okay! Let's learn from it and move forward.",
    "That's a miss, but learning is a journey—let's tackle it step by step!",
    "You're off this time, but let's uncover the right answer together!",
  ]

  const generateRandomFeedback = () => {
    const randomIndex = Math.floor(Math.random() * ai_feedback_options.length)
    return ai_feedback_options[randomIndex]
  }

  const handleSubmit = async () => {
    if (!selectedOption && !userAnswer) {
      setFeedbackMessage("Please select an option or enter an answer first")
      setFeedbackType("error")
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 3000)
      return
    }

    if (!questionData) return

    setSubmitted(true)

    const userResponse = selectedOption || userAnswer
    const isAnswerCorrect = userResponse === questionData.question.correct_quiz_answer

    if (isAnswerCorrect) {
      setFeedbackMessage("Correct! Your answer is correct")
      setFeedbackType("success")
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 3000)
      return
    }

    // Incorrect answer - start reasoning path
    try {
      setFeedbackMessage("Incorrect! Your answer is incorrect, starting reasoning path...")
      setFeedbackType("error")
      setShowFeedback(true)

      let actAnswerData
      let socData: SocResponse

      // If we're in offline mode, use mock data
      if (useMockData) {
        import("@/lib/mock-data").then(({ mockSocraticResponse }) => {
          // Trigger AI feedback message
          setShowFeedback(false)
          setChatActive(true)

          setTimeout(() => {
            setMessages([
              {
                role: "assistant",
                content: questionData.question.complex_question,
              },
              {
                role: "user",
                content: userResponse || "",
              },
              {
                role: "assistant",
                content: generateRandomFeedback(),
              },
              {
                role: "assistant",
                content: mockSocraticResponse.sub_question,
              },
            ])
          }, 800)
        })
      } else {
        // Try to use the API
        actAnswerData = await getActAnswer(userResponse || "", openaiKey, quizFilename)

        socData = await getFirstSocQuestion(
          openaiKey,
          questionData.question.complex_question,
          actAnswerData.assistant_response,
          questionData.question.correct_quiz_answer,
          userResponse || "",
        )

        // Trigger AI feedback message
        setShowFeedback(false)
        setChatActive(true)

        setTimeout(() => {
          setMessages([
            {
              role: "assistant",
              content: questionData.question.complex_question,
            },
            {
              role: "user",
              content: userResponse || "",
            },
            {
              role: "assistant",
              content: generateRandomFeedback(),
            },
            {
              role: "assistant",
              content: socData.sub_question,
            },
          ])
        }, 800)
      }
    } catch (error) {
      console.error("API call failed:", error)
      setFeedbackMessage("Something went wrong. Please try again.")
      setFeedbackType("error")
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 3000)
    }
  }

  const sendMessage = () => {
    if (!userMessage.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Clear input
    setUserMessage("")

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse =
        "That's a good point. Inertia is directly proportional to mass. Objects with greater mass have more inertia, meaning they resist changes in motion more. Since a stone has greater mass than a rubber ball of the same size, it has more inertia."

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
    }, 1000)
  }

  const resetQuestion = () => {
    setSelectedOptionId(null)
    setSelectedOption(null)
    setUserAnswer("")
    setSubmitted(false)
    setChatActive(false)
    setMessages([])
  }

  const nextQuestion = () => {
    resetQuestion()
    goToNextQuestion()
  }

  const previousQuestion = () => {
    resetQuestion()
    goToPreviousQuestion()
  }

  return (
    <div className="flex min-h-screen bg-[#050714] text-white overflow-hidden dark:bg-[#050714] dark:text-white light:bg-white light:text-gray-800">
      {/* Left Menu - Collapsible */}
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", menuOpen ? "md:ml-64" : "md:ml-16")}>
        <div className="flex flex-col md:flex-row h-full">
          {/* Question Section */}
          <div
            className={cn(
              "w-full transition-all duration-500 ease-in-out max-w-6xl",
              chatActive ? "md:w-1/2" : "md:w-full",
            )}
          >
            <QuestionSection
              questionData={questionData}
              loading={loading}
              selectedOptionId={selectedOptionId}
              setSelectedOptionId={setSelectedOptionId}
              setSelectedOption={setSelectedOption}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              handleSubmit={handleSubmit}
              submitted={submitted}
              showFeedback={showFeedback}
              feedbackMessage={feedbackMessage}
              feedbackType={feedbackType}
              nextQuestion={nextQuestion}
              previousQuestion={previousQuestion}
              error={error}
            />
          </div>

          {/* Chat Interface - Only visible when activated */}
          {chatActive && (
            <ChatInterface
              messages={messages}
              setMessages={setMessages}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
