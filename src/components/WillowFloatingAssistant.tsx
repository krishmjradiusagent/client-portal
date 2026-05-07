"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, X, Sparkles } from "lucide-react";
import { InfinityLoop } from "./loading-ui/infinity";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import SiriOrb from "./ui/smoothui/siri-orb";
import { cn } from "@/lib/utils";

export type WillowContext =
  | "search"
  | "my-searches"
  | "home-value"
  | "listing"
  | "interested-homes"
  | "not-interested-homes"
  | "profile"
  | "settings"
  | "default";

const WILLOW_CONTEXT_COPY = {
  search: {
    title: "Willow AI",
    subtitle: "Ask about this search, filters, or neighborhoods.",
    placeholder: "Ask Willow about this search..."
  },
  "my-searches": {
    title: "Willow AI",
    subtitle: "Ask about saved searches, alerts, or buyer intent.",
    placeholder: "Ask Willow about my searches..."
  },
  "home-value": {
    title: "Willow AI",
    subtitle: "Ask about home value, estimate movement, or selling prep.",
    placeholder: "Ask Willow about this home value..."
  },
  listing: {
    title: "Willow AI",
    subtitle: "Ask about this listing, price, schools, commute, or next steps.",
    placeholder: "Ask Willow about this listing..."
  },
  "interested-homes": {
    title: "Willow AI",
    subtitle: "Compare interested homes or summarize what stands out.",
    placeholder: "Ask Willow to compare homes..."
  },
  "not-interested-homes": {
    title: "Willow AI",
    subtitle: "Review rejected homes and refine preferences.",
    placeholder: "Ask Willow about rejected homes..."
  },
  profile: {
    title: "Willow AI",
    subtitle: "Ask about your profile, preferences, or saved activity.",
    placeholder: "Ask Willow..."
  },
  settings: {
    title: "Willow AI",
    subtitle: "Ask about settings, notifications, or account preferences.",
    placeholder: "Ask Willow..."
  },
  default: {
    title: "Willow AI",
    subtitle: "Ask Willow for help with this page.",
    placeholder: "Ask Willow..."
  }
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type WillowFloatingAssistantProps = {
  context?: WillowContext;
  className?: string;
};

export function WillowFloatingAssistant({ context = "default", className }: WillowFloatingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const copy = WILLOW_CONTEXT_COPY[context] || WILLOW_CONTEXT_COPY.default;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Mock assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Willow can help with this page once connected to the Radius AI service."
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50 flex flex-col items-end", className)}>
      {isOpen && (
        <Card className="w-80 sm:w-96 mb-4 shadow-2xl border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-slate-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <InfinityLoop className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">{copy.title}</CardTitle>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed">{copy.subtitle}</p>
            </div>
            <ScrollArea className="h-[300px] p-4" ref={scrollRef}>
              <div className="flex flex-col gap-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
                    <Sparkles className="w-8 h-8 mb-2" />
                    <p className="text-xs">Start a conversation with Willow</p>
                  </div>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm",
                        m.role === "user"
                          ? "bg-slate-900 text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <Separator />
          <CardFooter className="p-4">
            <div className="relative w-full flex items-center gap-2">
              <Input
                placeholder={copy.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-slate-50 border-slate-200 focus:ring-slate-900 pr-10"
              />
              <Button 
                size="icon" 
                disabled={!inputValue.trim()} 
                onClick={handleSend}
                className="bg-slate-900 hover:bg-slate-800 rounded-full h-8 w-8 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Willow FAB with Siri Orb background */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-16 h-16 rounded-full shadow-lg transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isOpen && "rotate-90"
        )}
        aria-label="Open Willow AI"
      >
        {/* Siri Orb animated background */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <SiriOrb
              size="64px"
              animationDuration={12}
              colors={{
                bg: "oklch(10% 0.02 264)", // Deeper black
                c1: "oklch(60% 0.25 280)", // More vibrant purple/blue
                c2: "oklch(55% 0.22 230)", // More vibrant cyan
                c3: "oklch(50% 0.20 320)", // More vibrant pink/magenta
              }}
            />
          </div>
        )}

        {/* Fallback bg when open */}
        {isOpen && (
          <div className="absolute inset-0 rounded-full bg-slate-200" />
        )}

        {/* Icon layer */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isOpen ? (
            <X className="w-6 h-6 text-slate-900" />
          ) : (
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <InfinityLoop className="w-12 h-12 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            </motion.div>
          )}
        </div>
      </button>
    </div>
  );
}

