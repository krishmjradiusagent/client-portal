import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageBubbleProps {
  content: string;
  time: string;
  isIncoming: boolean;
  status?: "Sent" | "Delivered" | "Read";
  showStatus?: boolean;
  isStacked?: boolean;
}

export function ChatMessageBubble({ 
  content, 
  time, 
  isIncoming, 
  status, 
  showStatus,
  isStacked 
}: ChatMessageBubbleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.32, 0.72, 0, 1] 
      }}
      className={cn(
        "flex w-full mb-1", 
        isIncoming ? "justify-start" : "justify-end",
        isStacked ? "mt-0.5" : "mt-4"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col px-4 py-2.5 transition-all duration-200 shadow-sm",
          isIncoming
            ? "bg-muted text-foreground rounded-2xl rounded-bl-sm mr-auto max-w-[85%] sm:max-w-[70%]"
            : "bg-primary text-primary-foreground rounded-2xl rounded-br-sm ml-auto max-w-[85%] sm:max-w-[70%]"
        )}
      >
        <div className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium tracking-tight">{content}</div>
        <div
          className={cn(
            "flex items-center gap-1 mt-1 text-[9px] select-none font-bold tracking-tight opacity-70",
            isIncoming ? "text-muted-foreground" : "text-primary-foreground justify-end"
          )}
        >
          <span className="uppercase">{time}</span>
          {!isIncoming && showStatus && status && (
            <div className="flex items-center gap-0.5 ml-1">
              <Check className="size-2.5" />
              <span className="uppercase tracking-widest">{status}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
