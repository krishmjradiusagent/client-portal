"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ExternalLink, FileText, Bed, Bath, Maximize2, Check } from "lucide-react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { MessageComposer } from "./MessageComposer";
import { usePropertyContext } from "../PropertyContext";

export function MessagesPanel() {
  const { messages, sendMessage } = usePropertyContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = (content: string) => {
    sendMessage(content);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 border-b px-5 flex items-center justify-between shrink-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border shadow-sm transition-transform hover:scale-105 cursor-pointer">
            <AvatarImage src="/avatar-scott.png" alt="Scott Kato" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">SK</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none tracking-tight">Scott Kato</span>
            <span className="text-[11px] text-muted-foreground mt-1 font-medium">(555) 456-7890</span>
          </div>
        </div>
      </header>

      {/* Message Body */}
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea ref={scrollRef} className="h-full">
          <div className="max-w-[1120px] mx-auto w-full px-4 md:px-6 py-10">
            {/* Date Pill */}
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-3 py-1 rounded-full text-[10px] font-semibold bg-muted/60 text-muted-foreground border-none tracking-wider uppercase">
                Today
              </Badge>
            </div>


            <div className="flex flex-col">
              {messages.map((msg, idx) => {
                const prevMsg = messages[idx - 1];
                const nextMsg = messages[idx + 1];
                const isStacked = prevMsg && prevMsg.isIncoming === msg.isIncoming;
                const isLastInBlock = !nextMsg || nextMsg.isIncoming !== msg.isIncoming;

                return (
                  <ChatMessageBubble
                    key={msg.id}
                    content={msg.content}
                    time={msg.time}
                    isIncoming={msg.isIncoming}
                    status={msg.status}
                    isStacked={isStacked}
                    showStatus={!msg.isIncoming && isLastInBlock}
                  />
                );
              })}

              {/* Right-aligned Agent Property Attachment */}
              <div className="flex justify-end mt-8 mb-10">
                <motion.div 
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1,
                    ease: [0.32, 0.72, 0, 1] 
                  }}
                  className="flex flex-col items-end max-w-[320px] w-full group"
                >
                  <Card className="w-full rounded-[24px] border border-border/50 bg-card shadow-sm overflow-hidden p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1.5">
                    <div className="relative w-full h-[160px] rounded-[18px] overflow-hidden mb-4">
                      <img 
                        src="/images/properties/prop-1-1.png" 
                        alt="Property" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="absolute top-3 left-3 flex gap-1.5 items-center pointer-events-auto">
                        {/* Signal Badge */}
                        <Badge className="relative overflow-hidden bg-[#FFF7E0] text-[#6F4E00] border border-[#F2D68A] rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-md">
                          <div className="absolute inset-0 shiny pointer-events-none opacity-90 bg-[linear-gradient(110deg,transparent,35%,rgba(255,215,128,0.72),50%,rgba(255,245,190,0.58),65%,transparent)] bg-[length:200%_100%]" />
                          <span className="relative z-10">NEW</span>
                        </Badge>
                        {/* MLS Status Badge (Required) */}
                        <Badge className="bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm">
                          ACTIVE
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-primary/95 backdrop-blur-md text-primary-foreground border-none rounded-full px-3 py-1 text-[10px] font-black tracking-wider shadow-lg ring-1 ring-white/10">96% MATCH</Badge>
                      </div>
                    </div>
                    
                    <div className="px-1.5 pb-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-[16px] font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors duration-300">1248 Oak Street listing</h3>
                      </div>
                      <p className="text-[13px] text-muted-foreground/80 truncate font-medium mb-3">San Francisco, CA • Mission District</p>
                      <p className="text-2xl font-black text-foreground tracking-tighter mb-4">$1,245,000</p>
                      
                      <div className="flex items-center gap-4 py-4 border-t border-border/30 text-muted-foreground font-bold text-[10px] uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <Bed className="size-4 text-primary/70" />
                          <span>4 Bed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="size-4 text-primary/70" />
                          <span>3 Bath</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 className="size-4 text-primary/70" />
                          <span>2,180 ft²</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button 
                        asChild
                        size="lg"
                        className="w-full h-12 rounded-[16px] font-bold text-[12px] uppercase tracking-[0.1em] shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.97]"
                      >
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <ExternalLink className="size-4 mr-2.5" />
                          View Details
                        </motion.button>
                      </Button>
                    </div>
                  </Card>
                  
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground/60 select-none pr-2 font-bold tracking-tight">
                    <span>12:26 PM</span>
                    <div className="flex items-center gap-1 ml-0.5">
                      <Check className="size-3 text-primary/60" />
                      <span className="uppercase tracking-widest">Delivered</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>


      {/* Composer */}
      <MessageComposer onSend={handleSend} />
    </div>
  );
}
