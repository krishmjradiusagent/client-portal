import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Smile, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageComposerProps {
  onSend: (message: string) => void;
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="border-t bg-background px-4 pt-4 pb-[calc(theme(spacing.6)+env(safe-area-inset-bottom))] shrink-0 z-20">
      <div className="flex items-end gap-3 max-w-[1120px] mx-auto w-full relative">
        <Button
          asChild
          variant="secondary"
          size="icon"
          className="rounded-full shrink-0 bg-muted/60 hover:bg-muted border border-border/20 shadow-sm transition-all"
        >
          <motion.button 
            whileTap={{ scale: 0.92 }}
            aria-label="Attach file"
          >
            <Paperclip className="size-5" />
          </motion.button>
        </Button>
        <Button
          asChild
          variant="secondary"
          size="icon"
          className="rounded-full shrink-0 bg-muted/60 hover:bg-muted border border-border/20 shadow-sm transition-all"
        >
          <motion.button 
            whileTap={{ scale: 0.92 }}
            aria-label="Add emoji"
          >
            <Smile className="size-5" />
          </motion.button>
        </Button>
        
        <div className="flex-1 relative flex flex-col group">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-[120px] resize-none rounded-[20px] bg-muted/40 border-border/60 focus-visible:ring-1 focus-visible:ring-primary/40 px-5 py-3 pr-16 transition-all group-hover:bg-muted/60 group-focus-within:bg-background group-focus-within:shadow-inner"
            aria-label="Message composer"
          />
          <div className="absolute right-5 bottom-3 text-[10px] text-muted-foreground pointer-events-none tabular-nums font-bold tracking-tighter opacity-50">
            {message.length}/700
          </div>
        </div>

        <Button
          asChild
          size="icon"
          className={cn(
            "rounded-full shrink-0 shadow-lg shadow-primary/10 transition-all duration-300",
            !message.trim() ? "opacity-40 grayscale" : "opacity-100"
          )}
          disabled={!message.trim()}
          onClick={handleSend}
        >
          <motion.button 
            whileTap={message.trim() ? { scale: 0.92 } : {}}
            aria-label="Send message"
          >
            <Send className={cn("size-5 transition-transform", message.trim() && "group-hover:translate-x-0.5 group-hover:-translate-y-0.5")} />
          </motion.button>
        </Button>
      </div>
      <div className="text-center text-[10px] text-muted-foreground/60 mt-3 font-bold tracking-widest uppercase select-none">
        Press <span className="text-foreground/40">Enter</span> to send • <span className="text-foreground/40">Shift+Enter</span> for new line
      </div>
    </div>
  );
}
