"use client"

import { useState, useEffect } from "react"
import { getQuestion, type QuestionData } from "@/lib/api"
import { mockQuestions } from "@/lib/mock-data"

export function useQuestion(initialFilename = "physics.xlsx") {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quizFilename, setQuizFilename] = useState<string>(initialFilename)
  const [useMockData, setUseMockData] = useState(false)

  // Fetch initial question
  useEffect(() => {
    fetchQuestion(quizFilename, 0, "stay")
  }, [quizFilename])

  // Function to fetch a question
  const fetchQuestion = async (filename: string, currentIndex: number, direction = "stay") => {
    setLoading(true)
    try {
      // If we've already determined we need to use mock data, don't try the API again
      if (useMockData) {
        const mockIndex = Math.min(Math.max(currentIndex, 0), mockQuestions.length - 1)
        setQuestionData(mockQuestions[mockIndex])
        setError(null)
        setLoading(false)
        return
      }

      // Try to fetch from the API
      const data = await getQuestion(filename, currentIndex, direction)
      setQuestionData(data)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch question, using mock data:", err)
      setError("Using offline mode due to connection issues")

      // Use mock data as fallback
      setUseMockData(true)
      const mockIndex = Math.min(Math.max(currentIndex, 0), mockQuestions.length - 1)
      setQuestionData(mockQuestions[mockIndex])
    } finally {
      setLoading(false)
    }
  }

  // Navigate to next question
  const nextQuestion = async () => {
    if (!questionData || questionData.is_last) return

    const currentIndex = questionData.current_index + 1
    await fetchQuestion(quizFilename, currentIndex, "stay")
  }

  // Navigate to previous question
  const previousQuestion = async () => {
    if (!questionData || questionData.is_first) return

    const currentIndex = questionData.current_index - 1
    await fetchQuestion(quizFilename, currentIndex, "stay")
  }

  return {
    questionData,
    loading,
    error,
    quizFilename,
    setQuizFilename,
    nextQuestion,
    previousQuestion,
    refreshQuestion: () => fetchQuestion(quizFilename, questionData?.current_index || 0, "stay"),
    useMockData,
  }
}
