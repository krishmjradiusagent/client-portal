"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Home, Infinity, MessageSquareText, Search, Send, TrendingUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { AuroraBars } from "./ui/aurora-bars";
import { PinnedList, type PinnedListItem } from "./unlumen-ui/pinned-list";
import { cn } from "@/lib/utils";

export type WillowContext =
  | "search"
  | "mySearch"
  | "my-searches"
  | "propertyDetail"
  | "listing"
  | "homeValue"
  | "home-value"
  | "interestedHomes"
  | "interested"
  | "notInterestedHomes"
  | "not-interested"
  | "messages"
  | "recently-viewed"
  | "profile"
  | "settings"
  | "default";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type WillowFloatingAssistantProps = {
  context?: WillowContext;
  className?: string;
};

type WillowContextConfig = {
  placeholder: string;
};

const WILLOW_CONTEXT_PROMPTS = {
  search: ["Search in San Francisco", "Show 3 bed homes", "Homes under $1.2M"],
  mySearch: ["Summarize this search", "What changed today?", "Show best matches"],
  propertyDetail: ["Is this priced well?", "Compare nearby homes", "Ask about schools"],
  homeValue: ["Estimate my home value", "Show recent sold homes", "Compare nearby listings"],
  interestedHomes: ["Compare my favorites", "Rank these homes", "Find similar homes"],
  notInterestedHomes: ["Why was this rejected?", "Undo recent rejects", "Find better matches"],
  messages: ["Summarize this chat", "Draft a reply", "Create follow-up"],
} as const;

const WILLOW_CONTEXT_CONFIG: Record<keyof typeof WILLOW_CONTEXT_PROMPTS, WillowContextConfig> = {
  search: {
    placeholder: "Ask Willow about this search...",
  },
  mySearch: {
    placeholder: "Ask Willow about your saved search...",
  },
  propertyDetail: {
    placeholder: "Ask Willow about this home...",
  },
  homeValue: {
    placeholder: "Ask Willow about home value...",
  },
  interestedHomes: {
    placeholder: "Ask Willow about favorites...",
  },
  notInterestedHomes: {
    placeholder: "Ask Willow about rejected homes...",
  },
  messages: {
    placeholder: "Ask Willow about this chat...",
  },
};

const CONTEXT_ALIASES: Record<string, keyof typeof WILLOW_CONTEXT_PROMPTS> = {
  search: "search",
  mySearch: "mySearch",
  "my-searches": "mySearch",
  propertyDetail: "propertyDetail",
  listing: "propertyDetail",
  homeValue: "homeValue",
  "home-value": "homeValue",
  interestedHomes: "interestedHomes",
  interested: "interestedHomes",
  notInterestedHomes: "notInterestedHomes",
  "not-interested": "notInterestedHomes",
  messages: "messages",
};

function getWillowConfig(context: WillowContext): WillowContextConfig {
  return WILLOW_CONTEXT_CONFIG[CONTEXT_ALIASES[context] ?? "search"];
}

function getWillowPrompts(context: WillowContext) {
  return WILLOW_CONTEXT_PROMPTS[CONTEXT_ALIASES[context] ?? "search"];
}

type WillowAuraIconProps = {
  size?: number;
  className?: string;
};

export function WillowAuraIcon({ size = 28, className }: WillowAuraIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center text-white drop-shadow-[0_0_11px_rgba(125,211,252,0.3)] motion-safe:animate-[willow-icon-pulse_5s_ease-in-out_infinite]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Infinity strokeWidth={2.2} style={{ width: size, height: size }} />
    </span>
  );
}

export function WillowAuraButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label="Ask Willow"
      className="group relative h-14 overflow-hidden rounded-full border border-white/15 bg-zinc-950 px-5 py-0 text-white shadow-lg shadow-black/30 hover:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-cyan-300/70"
    >
      <span className="pointer-events-none absolute inset-0 z-0 rounded-full opacity-75">
        <AuroraBars
          barCount={36}
          colors={["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "transparent"]}
          speed={1}
          blur={3}
          maxHeightRatio={1}
          minHeightRatio={1}
        />
      </span>
      <span className="pointer-events-none absolute inset-0 z-0 rounded-full bg-zinc-950/24" />
      <span className="relative z-10 flex items-center gap-3">
        <WillowAuraIcon size={26} />
        <span className="whitespace-nowrap text-[15px] font-semibold tracking-0 text-white">Ask Willow</span>
      </span>
    </Button>
  );
}

export function WillowContextSuggestions({
  prompts,
  onPromptClick,
  className,
}: {
  prompts: readonly string[];
  onPromptClick: (prompt: string) => void;
  className?: string;
}) {
  const items = useMemo<PinnedListItem[]>(
    () =>
      prompts.slice(0, 3).map((prompt, index) => ({
        id: `willow-prompt-${index}-${prompt}`,
        name: prompt,
        icon:
          index === 0 ? (
            <Search className="h-4 w-4" />
          ) : index === 1 ? (
            <Home className="h-4 w-4" />
          ) : contextIcon(prompt),
      })),
    [prompts]
  );

  return (
    <PinnedList
      items={items}
      variant="actions"
      onItemClick={(item) => onPromptClick(item.name)}
      className={cn("pointer-events-auto", className)}
    />
  );
}

function contextIcon(prompt: string) {
  if (prompt.toLowerCase().includes("reply") || prompt.toLowerCase().includes("chat")) {
    return <MessageSquareText className="h-4 w-4" />;
  }
  return <TrendingUp className="h-4 w-4" />;
}

export function WillowAIPanel({
  prompts,
  messages,
  inputValue,
  placeholder,
  onClose,
  onInputChange,
  onSend,
}: {
  prompts: readonly string[];
  messages: Message[];
  inputValue: string;
  placeholder: string;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: (prompt?: string) => void;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section
      aria-label="Ask Willow chat panel"
      className="pointer-events-auto flex h-[480px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-black/40"
    >
      <header className="relative overflow-hidden border-b border-white/10 px-4 py-3">
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_70%_20%,rgba(168,85,247,0.24),transparent_38%)] opacity-90 motion-safe:animate-[willow-aura-pulse_6s_ease-in-out_infinite]" />
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <WillowAuraIcon size={28} />
            <div>
              <h2 className="text-base font-semibold leading-none text-white">Ask Willow</h2>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">AI ASSISTANT</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close Willow"
            className="h-9 w-9 rounded-full text-zinc-300 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="border-b border-white/10 px-4 py-3">
        <WillowContextSuggestions prompts={prompts} onPromptClick={onSend} className="items-start" />
      </div>

      <ScrollArea className="min-h-0 flex-1 px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-300">
              Ask about homes, searches, pricing, schools, or next steps.
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                    message.role === "user"
                      ? "bg-white text-zinc-950"
                      : "border border-white/10 bg-white/[0.04] text-zinc-200"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <form
        className="border-t border-white/10 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
              if (event.key === "Escape") onClose();
            }}
            placeholder={placeholder}
            className="min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-5 text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            aria-label="Send Willow message"
            className="h-10 w-10 shrink-0 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </section>
  );
}

export function WillowAIEntry({ context = "default", className }: WillowFloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const config = useMemo(() => getWillowConfig(context), [context]);
  const prompts = useMemo(() => getWillowPrompts(context), [context]);

  const sendPrompt = useCallback(
    (prompt = inputValue) => {
      const content = prompt.trim();
      if (!content) return;

      setIsOpen(true);
      setInputValue("");
      setMessages((current) => [
        ...current,
        { id: `${Date.now()}-user`, role: "user", content },
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: "Willow can help with this once connected to the Radius AI service.",
        },
      ]);
    },
    [inputValue]
  );

  return (
    <div className={cn("fixed right-6 bottom-6 z-[60] flex flex-col items-end gap-3 pointer-events-none", className)}>
      <style jsx global>{`
        @keyframes willow-aura-pulse {
          0%,
          100% {
            opacity: 0.62;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.94;
            transform: scale(1.04);
          }
        }

        @keyframes willow-icon-pulse {
          0%,
          100% {
            opacity: 0.84;
            transform: scale(1);
            filter: drop-shadow(0 0 7px rgba(125, 211, 252, 0.26));
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
            filter: drop-shadow(0 0 13px rgba(168, 85, 247, 0.36));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="willow-aura-pulse"],
          [class*="willow-icon-pulse"] {
            animation: none !important;
          }
        }
      `}</style>
      {isOpen ? (
        <WillowAIPanel
          prompts={prompts}
          messages={messages}
          inputValue={inputValue}
          placeholder={config.placeholder}
          onClose={() => setIsOpen(false)}
          onInputChange={setInputValue}
          onSend={sendPrompt}
        />
      ) : (
        <>
          <WillowContextSuggestions prompts={prompts} onPromptClick={sendPrompt} />
          <div className="pointer-events-auto">
            <WillowAuraButton onClick={() => setIsOpen(true)} />
          </div>
        </>
      )}
    </div>
  );
}

export { WillowAIEntry as WillowFloatingAssistant };
