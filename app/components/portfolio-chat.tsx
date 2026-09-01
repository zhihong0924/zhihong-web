"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

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
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (hasStartedConversation) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasStartedConversation]);

  async function readStreamedReply(response: Response) {
    if (!response.body) throw new Error("The portfolio assistant could not start streaming a response.");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let bufferedEvents = "";
    let reply = "";

    const appendDelta = (delta: string) => {
      reply += delta;
      setMessages((currentMessages) => currentMessages.map((message, index) => (
        index === currentMessages.length - 1 ? { ...message, content: reply } : message
      )));
    };

    while (true) {
      const { done, value } = await reader.read();
      bufferedEvents += decoder.decode(value, { stream: !done });

      const events = bufferedEvents.split("\n\n");
      bufferedEvents = events.pop() ?? "";

      for (const event of events) {
        const data = event.split("\n").find((line) => line.startsWith("data:"))?.slice(5).trim();
        if (!data || data === "[DONE]") continue;

        try {
          const payload = JSON.parse(data) as { delta?: string; choices?: Array<{ delta?: { content?: string } }> };
          const delta = payload.delta ?? payload.choices?.[0]?.delta?.content;
          if (delta) appendDelta(delta);
        } catch {
          // Ignore a malformed upstream event and continue reading later chunks.
        }
      }

      if (done) break;
    }

    if (!reply.trim()) throw new Error("The portfolio assistant could not prepare a response. Please try again.");
  }

  async function sendMessage(content: string) {
    const message = content.trim();
    if (!message || isSending) return;

    const nextMessages = [...messages, { role: "user" as const, content: message }];
    setHasStartedConversation(true);
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setIsSending(true);
    setIsWarmingUp(false);
    const warmupTimer = window.setTimeout(() => setIsWarmingUp(true), 3_000);

    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.slice(-6) }) });
      if (!response.ok) {
        const payload = await response.json() as { error?: string };
        throw new Error(payload.error ?? "The portfolio assistant is unavailable.");
      }

      if (response.headers.get("content-type")?.includes("text/event-stream")) {
        await readStreamedReply(response);
      } else {
        const payload = await response.json() as { reply?: string; error?: string };
        if (!payload.reply) throw new Error(payload.error ?? "The portfolio assistant is unavailable.");
        setMessages((currentMessages) => currentMessages.map((currentMessage, index) => (
          index === currentMessages.length - 1 ? { ...currentMessage, content: payload.reply as string } : currentMessage
        )));
      }
    } catch (caughtError) {
      setMessages((currentMessages) => currentMessages.filter((currentMessage, index) => (
        index !== currentMessages.length - 1 || currentMessage.content.trim()
      )));
      setError(caughtError instanceof Error ? caughtError.message : "The portfolio assistant is unavailable.");
    } finally {
      window.clearTimeout(warmupTimer);
      setIsSending(false);
      setIsWarmingUp(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section ref={sectionRef} className={`portfolio-chat${hasStartedConversation ? " is-conversation-active" : ""}`} id="ask-zhihong" aria-labelledby={hasStartedConversation ? undefined : "portfolio-chat-title"} aria-label={hasStartedConversation ? "Portfolio assistant conversation" : undefined}>
      {!hasStartedConversation && <div className="portfolio-chat-intro">
        <p className="eyebrow">PORTFOLIO ASSISTANT</p>
        <h2 id="portfolio-chat-title">Ask about the <em>work.</em></h2>
        <p>Use this chat as a quick guide to Zhihong&apos;s projects, engineering background, and practical approach to automation.</p>
      </div>}
      <div className="portfolio-chat-shell">
        <div className="portfolio-chat-topline"><span>ASK ZHIHONG</span><span>Public portfolio knowledge</span></div>
        <div className="portfolio-chat-messages" ref={messagesRef} aria-live="polite">
          {messages.map((message, index) => <p className={`portfolio-chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</p>)}
          {isSending && <p className="portfolio-chat-message assistant loading">{isWarmingUp ? "The assistant is preparing an answer — this can take up to a minute." : "Thinking…"}</p>}
        </div>
        {messages.length === 1 && <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
          {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendMessage(suggestion)} disabled={isSending}>{suggestion} <span aria-hidden="true">↗</span></button>)}
        </div>}
        {error && <p className="portfolio-chat-error" role="alert">{error}</p>}
        <form className="portfolio-chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="portfolio-chat-input">Ask a question about Zhihong</label>
          <textarea ref={inputRef} id="portfolio-chat-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleInputKeyDown} maxLength={700} placeholder="Ask a question about my work…" rows={2} disabled={isSending} />
          <button type="submit" disabled={!input.trim() || isSending} aria-label="Send question"><span aria-hidden="true">↑</span></button>
        </form>
        <p className="portfolio-chat-disclaimer">Answers use the public portfolio only. No conversations are stored.</p>
      </div>
    </section>
  );
}
