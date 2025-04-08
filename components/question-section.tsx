"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { QuestionData } from "@/lib/api"

interface QuestionSectionProps {
  questionData: QuestionData | null
  loading: boolean
  selectedOptionId: number | null
  setSelectedOptionId: (id: number | null) => void
  setSelectedOption: (option: string | null) => void
  userAnswer: string | null
  setUserAnswer: (answer: string | null) => void
  handleSubmit: () => void
  submitted: boolean
  showFeedback: boolean
  feedbackMessage: string
  feedbackType: "success" | "error"
  nextQuestion: () => void
  previousQuestion: () => void
  error: string | null
}

export function QuestionSection({
  questionData,
  loading,
  selectedOptionId,
  setSelectedOptionId,
  setSelectedOption,
  userAnswer,
  setUserAnswer,
  handleSubmit,
  submitted,
  showFeedback,
  feedbackMessage,
  feedbackType,
  nextQuestion,
  previousQuestion,
  error,
}: QuestionSectionProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!questionData) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-400">Failed to load question. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Physics Experiment
        </h2>

        {/* Display offline mode indicator if there's an error */}
        {error && (
          <div className="px-3 py-1 text-sm bg-yellow-900/30 border border-yellow-700/50 text-yellow-400 rounded-full">
            {error}
          </div>
        )}
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <div
          className={cn(
            "mb-4 p-3 rounded-lg border animate-fade-in",
            feedbackType === "success"
              ? "bg-green-900/20 border-green-700 text-green-400"
              : "bg-red-900/20 border-red-700 text-red-400",
          )}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <p className="text-gray-300 text-sm">
              Question {questionData.current_index + 1} / {questionData.total_questions + 1}
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            <div className="absolute -inset-0.7 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md blur opacity-75"></div>
            <Button
              variant="outline"
              disabled={questionData.is_first === true}
              className="relative bg-[#0c0e1d] hover:bg-[#161a36] text-white border-purple-700/50 dark:bg-[#0c0e1d] dark:hover:bg-[#161a36] light:bg-white light:hover:bg-slate-100 light:text-gray-800"
              onClick={previousQuestion}
            >
              <ChevronLeft size={16} className="mr-1" />
            </Button>
            <Button
              variant="outline"
              disabled={questionData.is_last === true}
              className="relative bg-[#0c0e1d] hover:bg-[#161a36] text-white border-purple-700/50 dark:bg-[#0c0e1d] dark:hover:bg-[#161a36] light:bg-white light:hover:bg-slate-100 light:text-gray-800"
              onClick={nextQuestion}
            >
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
        <div className="border border-[#2a2d35] rounded-lg p-6 mb-6 bg-[#12141d]/50 backdrop-blur-sm relative overflow-hidden dark:border-[#2a2d35] dark:bg-[#12141d]/50 light:border-slate-200 light:bg-white">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-70"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>

          <p className="text-center text-[#c9d1d9] relative z-10 text-xl dark:text-[#c9d1d9] light:text-gray-800">
            {questionData.question.complex_question}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {questionData.question.is_maths !== 1 &&
          questionData.question.options.map((option: string, index: number) => (
            <div
              key={index}
              className={cn(
                "relative bg-[#0c0e1d] p-4 rounded-lg cursor-pointer transition-all hover:bg-[#161a36] border dark:bg-[#0c0e1d] dark:hover:bg-[#161a36] light:bg-white light:hover:bg-slate-100",
                selectedOptionId === index + 1
                  ? "bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/50 dark:from-purple-900/50 dark:to-cyan-900/50 dark:border-purple-500/50 light:from-purple-100 light:to-cyan-100 light:border-purple-300"
                  : "bg-[#1a1d24]/80 border-[#2a2d35] hover:bg-[#2a2d35]/80 dark:bg-[#1a1d24]/80 dark:border-[#2a2d35] dark:hover:bg-[#2a2d35]/80 light:bg-white light:border-slate-200 light:hover:bg-slate-100",
              )}
              onClick={() => {
                if (!submitted) {
                  setSelectedOptionId(index + 1)
                  setSelectedOption(option)
                }
              }}
            >
              <div className="flex items-center">
                <p className="text-white dark:text-white light:text-gray-800">
                  {index + 1}. {option}
                </p>
              </div>
            </div>
          ))}

        {questionData.question.is_maths === 1 && (
          <div className="relative bg-[#0c0e1d] p-4 rounded-lg cursor-pointer transition-all hover:bg-[#161a36] border dark:bg-[#0c0e1d] dark:hover:bg-[#161a36] light:bg-white light:hover:bg-slate-100 light:border-slate-200">
            <div className="flex items-center">
              <p className="text-white dark:text-white light:text-gray-800">Enter your answer:</p>
              <input
                type="text"
                value={userAnswer || ""}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="ml-2 bg-[#1a1d24]/80 border border-[#2a2d35] rounded-lg p-2 text-white dark:bg-[#1a1d24]/80 dark:border-[#2a2d35] dark:text-white light:bg-white light:border-slate-200 light:text-gray-800"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="relative inline-block">
          <Button
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-none"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
