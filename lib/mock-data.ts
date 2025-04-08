import type { QuestionData } from "./api"

export const mockQuestions: QuestionData[] = [
  {
    question: {
      complex_question: "Which of the following has more inertia: a rubber ball or a stone of the same size?",
      options: ["Rubber ball", "Stone", "Both have the same inertia", "It depends on their velocities"],
      correct_quiz_answer: "Stone",
      is_maths: 0,
    },
    current_index: 0,
    total_questions: 2,
    is_first: true,
    is_last: false,
  },
  {
    question: {
      complex_question:
        "A car moving at 20 m/s applies brakes and comes to a stop in 5 seconds. What is the acceleration of the car?",
      options: ["-2 m/s²", "-4 m/s²", "-5 m/s²", "-10 m/s²"],
      correct_quiz_answer: "-4 m/s²",
      is_maths: 0,
    },
    current_index: 1,
    total_questions: 2,
    is_first: false,
    is_last: false,
  },
  {
    question: {
      complex_question: "Calculate the force required to accelerate a 1500 kg car from rest to 25 m/s in 10 seconds.",
      options: [],
      correct_quiz_answer: "3750",
      is_maths: 1,
    },
    current_index: 2,
    total_questions: 2,
    is_first: false,
    is_last: true,
  },
]

export const mockSocraticResponse = {
  sub_question: "Let's think about this. What property of an object determines its inertia?",
  assistant_response:
    "Inertia is directly proportional to mass. Objects with greater mass have more inertia, meaning they resist changes in motion more.",
}
