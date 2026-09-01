"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const openingMessage: Message = {
  role: "assistant",
  content: "Hi — I can help you explore Zhihong’s work, engineering focus, and selected projects.",
};

const suggestions = ["What has Zhihong built?", "Tell me about TZH Sports Centre", "What is his work in automation?"];

export default function PortfolioChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  async function sendMessage(content: string) {
    const message = content.trim();
    if (!message || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.slice(-6) }) });
      const payload = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) throw new Error(payload.error ?? "The portfolio assistant is unavailable.");
      setMessages((currentMessages) => [...currentMessages, { role: "assistant", content: payload.reply as string }]);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The portfolio assistant is unavailable.");
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="portfolio-chat" id="ask-zhihong" aria-labelledby="portfolio-chat-title">
      <div className="portfolio-chat-intro">
        <p className="eyebrow">PORTFOLIO ASSISTANT</p>
        <h2 id="portfolio-chat-title">Ask about the <em>work.</em></h2>
        <p>Use this chat as a quick guide to Zhihong&apos;s projects, engineering background, and practical approach to automation.</p>
      </div>
      <div className="portfolio-chat-shell">
        <div className="portfolio-chat-topline"><span>ASK ZHIHONG</span><span>Public portfolio knowledge</span></div>
        <div className="portfolio-chat-messages" ref={messagesRef} aria-live="polite">
          {messages.map((message, index) => <p className={`portfolio-chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>)}
          {isSending && <p className="portfolio-chat-message assistant loading">Thinking<span aria-hidden="true">…</span></p>}
        </div>
        {messages.length === 1 && <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
          {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)} disabled={isSending}>{suggestion} <span aria-hidden="true">↗</span></button>)}
        </div>}
        {error && <p className="portfolio-chat-error" role="alert">{error}</p>}
        <form className="portfolio-chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="portfolio-chat-input">Ask a question about Zhihong</label>
          <textarea ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={700} placeholder="Ask a question about my work…" rows={2} disabled={isSending} />
          <button type="submit" disabled={!input.trim() || isSending} aria-label="Send question"><span aria-hidden="true">↑</span></button>
        </form>
        <p className="portfolio-chat-disclaimer">Answers use the public portfolio only. No conversations are stored.</p>
      </div>
    </section>
  );
}
