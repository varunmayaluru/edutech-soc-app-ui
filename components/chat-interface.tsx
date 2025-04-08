"use client"
import { cn } from "@/lib/utils"
import { Send, FlaskRoundIcon as Flask, BotMessageSquare, CircleUserRound } from "lucide-react"
import TextToSpeech from "@/components/ui/TextToSpeech"
import { SpeechProvider } from "@/components/ui/SpeechProvider"

interface Message {
  role: "assistant" | "user"
  content: string
}

interface ChatInterfaceProps {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  userMessage: string
  setUserMessage: (message: string) => void
  sendMessage: () => void
}

export function ChatInterface({ messages, setMessages, userMessage, setUserMessage, sendMessage }: ChatInterfaceProps) {
  return (
    <div className="w-full md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-[#1a1e36] animate-slide-in-right dark:border-[#1a1e36] light:border-slate-200">
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
        <SpeechProvider>
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "mb-4 p-3 rounded-lg max-w-[90%]",
                message.role === "assistant"
                  ? "bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/20 ml-0 mr-auto dark:from-purple-900/30 dark:to-cyan-900/30 dark:border-purple-500/20 light:from-purple-100 light:to-cyan-100 light:border-purple-200"
                  : "bg-[#2a2d35] ml-auto mr-0 dark:bg-[#2a2d35] light:bg-slate-200",
              )}
            >
              <div className="flex items-center justify-start">
                <div
                  className={cn(
                    "mr-1 p-1 rounded-full",
                    message.role === "assistant"
                      ? "text-purple-400 bg-purple-900/50 dark:text-purple-400 dark:bg-purple-900/50 light:text-purple-600 light:bg-purple-200"
                      : "text-gray-400 bg-gray-800/50 dark:text-gray-400 dark:bg-gray-800/50 light:text-gray-600 light:bg-gray-300",
                  )}
                >
                  {message.role === "assistant" ? <BotMessageSquare size={22} /> : <CircleUserRound size={22} />}
                </div>
                <p className="text-white dark:text-white light:text-gray-800">{message.content}</p>

                {message.role === "assistant" && (
                  <div key={index}>
                    <TextToSpeech id={index.toString()} message={message.content} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </SpeechProvider>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="w-16 h-16 rounded-full bg-[#161a36] flex items-center justify-center mb-4 dark:bg-[#161a36] light:bg-slate-100">
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
            className="w-full bg-[#0c0e1d] border border-[#1a1e36] rounded-lg py-3 px-4 text-white pr-12 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 dark:bg-[#0c0e1d] dark:border-[#1a1e36] dark:text-white light:bg-white light:border-slate-200 light:text-gray-800"
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
  )
}
