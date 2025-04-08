/**
 * API service for fetching questions and handling responses
 */

export interface Question {
  complex_question: string
  options: string[]
  correct_quiz_answer: string
  is_maths: number
}

export interface QuestionData {
  question: Question
  current_index: number
  total_questions: number
  is_first: boolean
  is_last: boolean
}

export interface SocResponse {
  sub_question: string
  assistant_response: string
}

// Use HTTP instead of HTTPS
const API_BASE_URL = "http://44.202.53.50:8000/vhm"

/**
 * Fetch a question from the API
 */
export async function getQuestion(
  filename: string,
  currentIndex: number,
  direction = "stay",
): Promise<QuestionData | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/get_question?filename=${filename}&current_index=${currentIndex}&direction=${direction}`,
      {
        // Add these options to help with CORS and network issues
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!res.ok) throw new Error(`Server responded with status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error("Error fetching question:", error)
    // We'll handle the fallback in the hook
    throw error
  }
}

/**
 * Get the AI's response to a user's answer
 */
export async function getActAnswer(
  userContent: string,
  openaiApiKey: string | undefined,
  collectionName: string,
): Promise<{ assistant_response: string }> {
  try {
    const payload = {
      user_content: userContent,
      openai_api_key: openaiApiKey,
      model: "gpt-4o",
      collection_name: collectionName,
      top_k: 5,
    }

    const res = await fetch(`${API_BASE_URL}/get_act_answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
      cache: "no-cache",
    })

    if (!res.ok) throw new Error(`Server responded with status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error("Error getting AI answer:", error)
    // Return a fallback response
    return { assistant_response: "I understand this concept involves physics principles related to motion and forces." }
  }
}

/**
 * Get the first socratic question based on user's answer
 */
export async function getFirstSocQuestion(
  openaiApiKey: string | undefined,
  complexQuestion: string,
  actualAnswer: string,
  correctAnswer: string,
  studentAnswer: string,
): Promise<SocResponse> {
  try {
    const payload = {
      openai_api_key: openaiApiKey,
      model: "gpt-4o",
      complex_question: complexQuestion,
      actual_answer: actualAnswer,
      correct_answer: correctAnswer,
      student_answer: studentAnswer,
    }

    const res = await fetch(`${API_BASE_URL}/get_first_soc_question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
      cache: "no-cache",
    })

    if (!res.ok) throw new Error(`Server responded with status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error("Error getting Socratic question:", error)
    // Return a fallback response
    return {
      sub_question: "Let's think about this. What property of an object determines its inertia?",
      assistant_response: "Inertia is directly proportional to mass. Objects with greater mass have more inertia.",
    }
  }
}
