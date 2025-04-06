"use client"

import { useEffect, useState } from "react"
import {
  Send,
  ChevronRight,
  Menu,
  X,
  Home,
  Book,
  FlaskRoundIcon as Flask,
  Award,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import TextToSpeech from "@/components/ui/TextToSpeech";
import { SpeechProvider } from "@/components/ui/SpeechProvider";
// import 'katex/dist/katex.min.css';


export default function PhysicsLab() {
  const [userMessage, setUserMessage] = useState("")
  const [selectedOptionId, setselectedOptionId] = useState<string | null>(null)
  const [selectedOption, setselectedOption] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatActive, setChatActive] = useState(false)
  const [messages, setMessages] = useState<{ type: "ai" | "user"; content: string }[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success")
  const [questionData, setQuestionData] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>("");
  const [quizFilename, setQuizFilename] = useState<string>("math.xlsx");

  // The correct answer is "b. Stone" since it has more mass and thus more inertia
  const correctAnswer = "b"

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData = await getQuestion(quizFilename, 0, "stay");
      console.log("Fetched question:", questionData);
      setQuestionData(questionData);
    };

    fetchQuestion();
  }, []);

  const getQuestion = async (filename: string, currentIndex: number, direction: string = "stay") => {
    try {
      const res = await fetch(
        `http://44.202.53.50:8000/vhm/get_question?filename=${filename}&current_index=${currentIndex}&direction=${direction}`
      );

      if (!res.ok) throw new Error("Failed to fetch question");

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching question:", error);
      return null;
    }
  };


  const handleSubmit = async () => {
    // if (!selectedOptionId || userAnswer) {
    //   setFeedbackMessage("Please select an option first");
    //   setFeedbackType("error");
    //   setShowFeedback(true);
    //   setTimeout(() => setShowFeedback(false), 3000);
    //   return;
    // }

    setSubmitted(true);

    // API call
    const openaiKey = process.env.OPENAI_API_KEY;

    const payload = {
      openai_api_key: "sk - proj - QSsWxQs1fxKC7nRWT_8y6pLSnZvzH - l05mjtgTPd1CxPtZtBLzEm6HNrbB1brObdoYGgxV1TsTT3BlbkFJCynVlYDlLASSrEeEqMVUj4QunJjSXdGzpeUsosOQy_b1Pf7wSA6nKspEb002wXBsL1w_POaGwA",
      model: "gpt-4o",
      complex_question: questionData.question.complex_question,
      actual_answer: "string", // Replace with actual answer if available
      correct_answer: questionData.question.correct_quiz_answer,
      student_answer: selectedOption,
    };

    try {
      const res = await fetch("http://44.202.53.50:8000/vhm/get_first_soc_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API call failed:", error);
    }

    // Feedback logic
    if (selectedOptionId === correctAnswer) {
      setFeedbackMessage("Correct! The stone has more inertia.");
      setFeedbackType("success");
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    } else {
      setChatActive(true);
      setTimeout(() => {
        setMessages([
          {
            type: "ai",
            content:
              "I noticed you selected an incorrect answer. Let's discuss inertia a bit more. Can you tell me what factors affect an object's inertia?",
          },
        ]);
      }, 800);
    }
  };


  const sendMessage = () => {
    if (!userMessage.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])

    // Clear input
    setUserMessage("")

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse =
        "That's a good point. Inertia is directly proportional to mass. Objects with greater mass have more inertia, meaning they resist changes in motion more. Since a stone has greater mass than a rubber ball of the same size, it has more inertia."

      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }])
    }, 1000)
  }

  const resetQuestion = () => {
    setselectedOptionId(null)
    setSubmitted(false)
    setChatActive(false)
    setMessages([])
  }

  const nextQuestion = async () => {
    resetQuestion();
    let currentIndex = questionData?.current_index + 1;
    const question = await getQuestion(quizFilename, currentIndex, "stay");
    console.log("Fetched question:", question); // ✅ this is the latest data
    setQuestionData(question); // ✅ this will trigger a UI update
  };


  return (
    <div className="flex min-h-screen bg-[#050714] text-white overflow-hidden">
      {/* Left Menu - Collapsible */}
      <div
        className={cn(
          "fixed md:relative z-40 h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0c0e1d] to-[#0a0c17] border-r border-[#1a1e36]",
          menuOpen ? "w-64" : "w-16",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#1a1e36]">
          {/* {menuOpen && (
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Physics Lab
            </h1>
          )} */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-full hover:bg-[#1a1e36] transition-colors"
          >
            {menuOpen ? <X size={20} className="text-purple-400" /> : <Menu size={20} className="text-purple-400" />}
          </button>
        </div>

        <nav className="p-2">
          <ul className="space-y-2">
            {[
              { icon: <Home size={20} />, label: "Dashboard" },
              { icon: <Book size={20} />, label: "Lessons" },
              { icon: <Flask size={20} />, label: "Experiments", active: true },
              { icon: <Award size={20} />, label: "Achievements" },
              { icon: <HelpCircle size={20} />, label: "Help" },
              { icon: <Settings size={20} />, label: "Settings" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-all",
                    item.active
                      ? "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-700/50"
                      : "hover:bg-[#1a1e36]",
                  )}
                >
                  <span className={cn("text-purple-400", item.active && "text-purple-300")}>{item.icon}</span>
                  {menuOpen && (
                    <span className={cn("ml-3 transition-opacity", item.active ? "text-purple-300" : "text-gray-300")}>
                      {item.label}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", menuOpen ? "md:ml-64" : "md:ml-16")}>
        <div className="flex flex-col md:flex-row h-full">
          {/* Question Section */}
          <div className={cn("w-full transition-all duration-500 ease-in-out max-w-6xl", chatActive ? "md:w-1/2" : "md:w-full")}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                  Physics Experiment
                </h2>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md blur opacity-75"></div>
                  <Button
                    variant="outline"
                    className="relative bg-[#0c0e1d] hover:bg-[#161a36] text-white border-purple-700/50"
                    onClick={nextQuestion}
                  >
                    Next Question <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
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
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <p className="text-gray-300 text-sm">Question {questionData?.current_index + 1} / {questionData?.total_questions + 1}</p>
                </div>
                {/* <div className="bg-[#0c0e1d] p-5 rounded-lg border border-[#1a1e36] shadow-[0_0_15px_rgba(123,58,237,0.1)]">
                  <p className="text-white">
                    Which of the following has more inertia: (a) a rubber ball or a stone of the same size?
                  </p>
                </div> */}
                <div
                  className="border border-[#2a2d35] rounded-lg p-6 mb-6 bg-[#12141d]/50 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-70"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>

                  <p className="text-center text-[#c9d1d9] relative z-10 text-xl">
                    {questionData?.question.complex_question}
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                {
                  questionData?.question.is_maths != 1 &&
                  (questionData?.question.options.map((option: any, index: any) => (
                    <div
                      key={index}
                      className={cn(
                        "relative bg-[#0c0e1d] p-4 rounded-lg cursor-pointer transition-all hover:bg-[#161a36] border",
                        selectedOptionId === index + 1
                          ? "bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/50"
                          : "bg-[#1a1d24]/80 border-[#2a2d35] hover:bg-[#2a2d35]/80",
                        // submitted &&
                        // option.id === correctAnswer &&
                        // "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
                        // submitted &&
                        // selectedOptionId === option.id &&
                        // option.id !== correctAnswer &&
                        // "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
                      )}
                      onClick={() => {
                        if (!submitted) {
                          setselectedOptionId(index + 1);
                          setselectedOption(option);
                        }
                      }}
                    >
                      <div className="flex items-center">

                        <p className="text-white">
                          {index + 1}. {option}
                        </p>
                      </div>
                    </div>
                  )))}


                <div>
                  {
                    questionData?.question.is_maths == 1 &&
                    <div className="relative bg-[#0c0e1d] p-4 rounded-lg cursor-pointer transition-all hover:bg-[#161a36] border">
                      <div className="flex items-center">
                        <p className="text-white">
                          Enter your answer:
                        </p>
                        <input
                          type="text"
                          // value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="ml-2 bg-[#1a1d24]/80 border border-[#2a2d35] rounded-lg p-2 text-white"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div className="mt-6">
                <div className="relative inline-block">

                  <Button
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-none"
                    onClick={handleSubmit}
                  // disabled={submitted}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface - Only visible when activated */}
          {chatActive && (
            <div className="w-full md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-[#1a1e36] animate-slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                  AI Assistant
                </h2>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>

              <div className="space-y-4 mb-4 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "mb-4 p-3 rounded-lg max-w-[90%]",
                      message.type === "ai"
                        ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/20 ml-0 mr-auto"
                        : "bg-[#2a2d35] ml-auto mr-0",
                    )}
                  >
                    <div className="flex items-start">
                      <div
                        className={cn(
                          "mr-2 p-1 rounded-full",
                          message.type === "ai" ? "text-purple-400 bg-purple-900/50" : "text-gray-400 bg-gray-800/50",
                        )}
                      >
                        {message.type === "ai" ? "💬" : "👤"}
                      </div>
                      <p className="text-white">{message.content}</p>
                      <SpeechProvider>
                        {message.type === "ai" && (
                          <TextToSpeech
                            key={index}
                            id={index.toString()}
                            message={message.content}
                          />
                        )}
                      </SpeechProvider>
                    </div>
                  </div>
                ))}

                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <div className="w-16 h-16 rounded-full bg-[#161a36] flex items-center justify-center mb-4">
                      <Flask size={32} className="text-purple-400" />
                    </div>
                    <p className="text-lg mb-2">AI Assistant Activated</p>
                    <p className="text-sm max-w-xs">
                      The AI has detected you need help with this concept and is ready to assist you.
                    </p>
                  </div>
                )}
              </div>

              {/* Message input */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30"></div>
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="Type your response..."
                    className="w-full bg-[#0c0e1d] border border-[#1a1e36] rounded-lg py-3 px-4 text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-1.5 hover:from-purple-700 hover:to-indigo-700 transition-all"
                    onClick={sendMessage}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

