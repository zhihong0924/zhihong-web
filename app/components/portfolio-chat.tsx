"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const openingMessage: Message = {
  role: "assistant",
  content: "Hi — ask me about Zhihong’s work, engineering focus, or selected projects.",
};

const suggestions = ["What has Zhihong built?", "Tell me about TZH Sports Centre", "What is his work in automation?"];

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
  }, [messages, isSending]);

  async function sendMessage(content: string) {
    const message = content.trim();
    if (!message || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-6) }),
      });
      const payload = await response.json() as { reply?: string; error?: string };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error ?? "The portfolio assistant is unavailable.");
      }

      setMessages((currentMessages) => [...currentMessages, { role: "assistant", content: payload.reply as string }]);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The portfolio assistant is unavailable.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section className="portfolio-chat-panel" role="dialog" aria-modal="true" aria-labelledby="portfolio-chat-title">
          <header className="portfolio-chat-header">
            <div><p>PORTFOLIO ASSISTANT</p><h2 id="portfolio-chat-title">Ask about my work</h2></div>
            <button type="button" className="portfolio-chat-close" onClick={() => setIsOpen(false)} aria-label="Close portfolio chat">×</button>
          </header>
          <div className="portfolio-chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message, index) => <p className={`portfolio-chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>)}
            {isSending && <p className="portfolio-chat-message assistant loading">Thinking<span aria-hidden="true">…</span></p>}
          </div>
          {messages.length === 1 && (
            <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
              {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)} disabled={isSending}>{suggestion}</button>)}
            </div>
          )}
          {error && <p className="portfolio-chat-error" role="alert">{error}</p>}
          <form className="portfolio-chat-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="portfolio-chat-input">Ask a question about Zhihong</label>
            <input ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={700} placeholder="Ask a question…" disabled={isSending} />
            <button type="submit" disabled={!input.trim() || isSending}>Send <span aria-hidden="true">↗</span></button>
          </form>
          <p className="portfolio-chat-disclaimer">Answers use the public portfolio only.</p>
        </section>
      )}
      <button type="button" className="portfolio-chat-launcher" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-controls="portfolio-chat-title">
        <span aria-hidden="true">✦</span> Ask about my work
      </button>
    </div>
  );
}
