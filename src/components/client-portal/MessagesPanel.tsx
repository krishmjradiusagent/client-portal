"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Check, CheckCheck, Plus } from "lucide-react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { MessageComposer } from "./MessageComposer";
import { usePropertyContext } from "../PropertyContext";
import { cn } from "@/lib/utils";

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    title: "123 Oak St Group",
    participants: ["Michael Loft", "Sarah Johnson", "Jessica Loft"],
    lastMessage: "The inspection report looks good...",
    time: "10:32 AM",
    type: "group",
    propertyThumbnail: "/images/properties/prop-3-1.png",
    unread: true,
  },
  {
    id: 2,
    title: "Sarah Johnson",
    participants: ["Sarah Johnson"],
    subtitle: "Real Estate Agent",
    lastMessage: "I've scheduled the viewing for Saturday.",
    time: "9:15 AM",
    type: "individual",
    avatar: "/avatar-scott.png",
    unread: false,
  },
  {
    id: 3,
    title: "Weekend Showing Coordination",
    participants: ["Michael Loft", "Sarah Johnson", "John Dev"],
    lastMessage: "Which property are we starting with?",
    time: "Yesterday",
    type: "group",
    unread: false,
  },
  {
    id: 4,
    title: "Offer Review Team",
    participants: ["Michael Loft", "Sarah Johnson", "Lender Dave"],
    lastMessage: "Pre-approval letter attached.",
    time: "Tuesday",
    type: "group",
    unread: false,
  },
  {
    id: 5,
    title: "Sarah + Parents",
    participants: ["Michael Loft", "Sarah Johnson", "Linda Loft", "Gary Loft"],
    lastMessage: "They loved the kitchen layout!",
    time: "Monday",
    type: "group",
    unread: false,
  },
  {
    id: 6,
    title: "Escrow Updates",
    participants: ["Michael Loft", "Closing Coord", "Title Officer"],
    lastMessage: "Closing disclosure is ready for review.",
    time: "6/10/25",
    type: "group",
    unread: false,
  }
];

function GroupAvatar({ participants }: { participants: string[] }) {
  const displayParticipants = participants.slice(0, 3);
  return (
    <div className="relative h-10 w-10 shrink-0">
      {displayParticipants.map((name, i) => (
        <Avatar 
          key={name} 
          className={cn(
            "absolute h-7 w-7 border-2 border-background shadow-sm",
            i === 0 && "top-0 left-0 z-30",
            i === 1 && "bottom-0 right-0 z-20",
            i === 2 && "top-0 right-0 z-10 translate-x-1 -translate-y-1"
          )}
        >
          <AvatarFallback className="text-[8px] bg-primary/10 text-primary font-bold">
            {name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export function MessagesPanel() {
  const { messages, sendMessage } = usePropertyContext();
  const [activeConversation, setActiveConversation] = useState(MOCK_CONVERSATIONS[0]);
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
    <div className="flex flex-1 h-full w-full bg-background overflow-hidden font-sans">
      {/* Left Panel - Inbox List */}
      <div className="w-[420px] h-full border-r border-border shrink-0 flex flex-col bg-background z-30">
        {/* Inbox Header */}
        <div className="px-5 py-4 flex items-center h-[65px] shrink-0 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Inbox</h2>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-border shrink-0 flex flex-col gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input 
              placeholder="Search conversations..." 
              className="pl-9 bg-muted/40 border-none rounded-xl h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex items-center gap-2 mt-1 overflow-x-auto scrollbar-hide py-1">
            <Badge variant="secondary" className="rounded-full bg-primary text-primary-foreground hover:bg-primary px-3 py-1 cursor-pointer text-[12px] font-semibold tracking-tight">All</Badge>
            <Badge variant="secondary" className="rounded-full bg-muted/60 text-muted-foreground hover:bg-muted font-semibold px-3 py-1 cursor-pointer text-[12px] tracking-tight">Unread</Badge>
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {MOCK_CONVERSATIONS.map((conv) => (
              <div 
                key={conv.id} 
                onClick={() => setActiveConversation(conv)}
                className={cn(
                  "flex items-start gap-3 p-4 border-b border-border/50 cursor-pointer transition-all relative group",
                  activeConversation.id === conv.id ? "bg-primary/5" : "hover:bg-muted/30"
                )}
              >
                {activeConversation.id === conv.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
                
                {conv.type === "group" ? (
                  <GroupAvatar participants={conv.participants} />
                ) : (
                  <Avatar className="h-10 w-10 border border-border/50 shrink-0 shadow-sm">
                    {conv.avatar && <AvatarImage src={conv.avatar} alt={conv.title} />}
                    <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                      {conv.title.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={cn(
                      "text-[14px] font-bold tracking-tight truncate",
                      conv.unread ? "text-foreground" : "text-foreground/90"
                    )}>
                      {conv.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium shrink-0 ml-2">
                      {conv.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[11px] text-muted-foreground font-semibold truncate">
                      {conv.participants.join(", ")}
                    </span>
                  </div>
                  <span className={cn(
                    "text-[13px] truncate leading-tight",
                    conv.unread ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}>
                    {conv.lastMessage}
                  </span>
                </div>

                {conv.propertyThumbnail && (
                  <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-border/50 ml-1 mt-0.5">
                    <img src={conv.propertyThumbnail} alt="Property" className="w-full h-full object-cover" />
                  </div>
                )}

                {conv.unread && (
                  <div className="absolute right-4 bottom-4 w-2 h-2 bg-primary rounded-full shadow-sm shadow-primary/20" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Conversation */}
      <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {/* Chat Header */}
        <div className="h-[65px] border-b border-border flex items-center justify-between px-6 shrink-0 bg-background/95 backdrop-blur-sm z-40 sticky top-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            {activeConversation.type === "group" ? (
              <GroupAvatar participants={activeConversation.participants} />
            ) : (
              <Avatar className="h-10 w-10 border border-border/50 shadow-sm">
                {activeConversation.avatar && <AvatarImage src={activeConversation.avatar} alt={activeConversation.title} />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {activeConversation.title.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-foreground">{activeConversation.title}</span>
              <span className="text-[11px] text-muted-foreground font-semibold tracking-wide truncate max-w-[300px]">
                {activeConversation.participants.join(", ")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground h-9 px-4 font-bold text-[13px] tracking-tight hover:bg-muted/60 transition-colors">
              Details
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
          <ScrollArea ref={scrollRef} className="flex-1 px-6">
            <div className="flex flex-col py-6 w-full max-w-full">
              {/* Date Pill */}
              <div className="flex justify-center mb-8">
                <Badge variant="secondary" className="px-3 py-1 rounded-full text-[11px] font-bold bg-muted/60 text-muted-foreground/80 border-none uppercase tracking-wider">
                  Today
                </Badge>
              </div>

              <div className="flex flex-col gap-1 w-full">
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
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-border bg-background/50 backdrop-blur-md">
          <MessageComposer onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
