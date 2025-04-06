"use client";

import { createContext, useContext, useState, useRef } from "react";

type Message = { id: string; text: string };

const SpeechContext = createContext<any>(null);

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const queueRef = useRef<Message[]>([]);
  const indexRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const cancelCurrent = () => {
    speechSynthesis.cancel();
    setCurrentId(null);
    setIsPaused(false);
  };

  const speakSingle = (id: string, text: string) => {
    cancelCurrent();
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setCurrentId(null);
      setIsPaused(false);
    };

    speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    setCurrentId(id);
    setIsPaused(false);
  };

  const speakQueue = (messages: Message[]) => {
    cancelCurrent();
    queueRef.current = messages;
    indexRef.current = 0;
    playNextFromQueue();
  };

  const playNextFromQueue = () => {
    if (indexRef.current >= queueRef.current.length) {
      setCurrentId(null);
      return;
    }

    const message = queueRef.current[indexRef.current];
    const utterance = new SpeechSynthesisUtterance(message.text);

    utterance.onend = () => {
      indexRef.current += 1;
      playNextFromQueue();
    };

    speechSynthesis.speak(utterance);
    utteranceRef.current = utterance;
    setCurrentId(message.id);
    setIsPaused(false);
  };

  const pause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const reset = () => {
    cancelCurrent();
    queueRef.current = [];
    indexRef.current = 0;
  };

  return (
    <SpeechContext.Provider
      value={{
        currentId,
        isPaused,
        speak: speakSingle,
        speakQueue,
        pause,
        resume,
        reset,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
