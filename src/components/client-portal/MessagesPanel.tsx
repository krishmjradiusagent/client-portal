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

const MOCK_CLIENTS = [
  {
    id: 1,
    name: "+1 (555) 123-4567",
    lastMessage: "Can you send me the property...",
    time: "12:25 PM",
    avatar: "Placeholder"
  },
  {
    id: 2,
    name: "+1 (555) 987-6543",
    lastMessage: "6653 Tralee...",
    time: "12:25 PM",
    avatar: "Placeholder"
  },
  {
    id: 3,
    name: "Emily",
    lastMessage: "6653 Tralee...",
    time: "12:25 PM",
    avatar: "Image",
    image: "/avatar-scott.png"
  },
  {
    id: 4,
    name: "Sarah Farah",
    lastMessage: "6653 Tralee...",
    time: "6/11/25",
    avatar: "SF"
  }
];

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
    <div className="flex flex-1 h-full w-full bg-background overflow-hidden font-sans border-t border-border">
      {/* Left Panel - Client List */}
      <div className="w-[400px] h-full border-r border-border shrink-0 flex flex-col bg-background">
        {/* Inbox Header */}
        <div className="px-5 py-4 border-b border-border flex items-center h-[65px] shrink-0">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Inbox</h2>
        </div>



        {/* Filters and Search */}
        <div className="px-5 py-4 border-b border-border shrink-0 flex flex-col gap-3">
          <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-[46px] shadow-md font-medium">
            <Plus className="w-4 h-4 mr-2" />
            New message
          </Button>
          
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 bg-muted border-none rounded-xl h-9"
            />
          </div>

          <div className="w-full mt-1 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 pb-1">
              <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground hover:bg-muted font-medium px-3 py-1 cursor-pointer">All</Badge>
              <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground hover:bg-muted font-medium px-3 py-1 cursor-pointer">Unread</Badge>
              <Badge variant="secondary" className="rounded-full bg-muted text-muted-foreground hover:bg-muted font-medium px-3 py-1 cursor-pointer whitespace-nowrap">Client replied</Badge>
              <Badge className="rounded-full bg-primary text-primary-foreground font-medium px-3 py-1 cursor-pointer whitespace-nowrap">AI responses</Badge>
            </div>
          </div>
        </div>

        {/* Viewing Status */}
        <div className="bg-primary/5 px-4 py-2 flex items-center justify-between shrink-0 border-b border-border">
          <span className="text-sm text-muted-foreground">Viewing:</span>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="bg-green-100 rounded-full p-0.5">
              <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
            </div>
            <span className="text-[13px] font-medium text-green-600">Positive</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground ml-1" />
          </div>
        </div>

        {/* Client List */}
        <ScrollArea className="flex-1 bg-red-50/40">
          <div className="flex flex-col">
            {MOCK_CLIENTS.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border-b border-border bg-background cursor-pointer hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border/50">
                    {client.image && <AvatarImage src={client.image} alt={client.name} />}
                    <AvatarFallback className={cn("text-sm font-medium", client.avatar === "Placeholder" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary")}>
                      {client.avatar === "Placeholder" ? <div className="bg-muted w-full h-full rounded-full" /> : client.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground tracking-tight">{client.name}</span>
                    <span className="text-[13px] text-muted-foreground truncate w-[180px]">{client.lastMessage}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
                  <span className="text-[12px] text-muted-foreground">{client.time}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Conversation */}
      <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {/* Chat Header */}
        <div className="h-[65px] border-b border-border flex items-center justify-between px-5 shrink-0 bg-background z-10">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border shadow-sm">
              <AvatarImage src="/avatar-scott.png" alt="Sarah Johnson" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">SJ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[16px] font-semibold leading-none tracking-tight">Sarah Johnson</span>
              <span className="text-[12px] text-muted-foreground mt-1 font-medium">(555) 456-7890</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-md font-medium text-[14px] text-muted-foreground h-8 px-4 flex items-center gap-2">
            Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea ref={scrollRef} className="h-full">
            <div className="max-w-[731px] mx-auto w-full px-4 py-6">
              {/* Date Pill */}
              <div className="flex justify-center mb-6">
                <Badge variant="secondary" className="px-3 py-1 rounded-2xl text-[12px] font-medium bg-muted text-muted-foreground border-none">
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
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Composer */}
        <MessageComposer onSend={handleSend} />
      </div>
    </div>
  );
}
