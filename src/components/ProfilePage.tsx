"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export function ProfilePage() {
  const [name, setName] = useState("Scott Kato");
  const [email, setEmail] = useState("scott@radius.com");
  const [phone, setPhone] = useState("(512) 555-0182");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-slate-900">My Profile</div>
            <div className="mt-1 text-sm text-slate-500">Agent profile inside Radius CRM.</div>
          </div>
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Active</Badge>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-start">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
                alt={name}
              />
              <AvatarFallback className="text-lg">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Name</div>
                <Input value={name} onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Email</div>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Phone</div>
                <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Role matrix</div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Agent</Badge>
                  <Badge variant="secondary">Team Lead</Badge>
                  <Badge variant="outline">TC</Badge>
                  <Badge variant="outline">Admin</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Match workflow</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">MEL scores feed My Matches. Interested updates shared state.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Saved searches</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">Unlimited searches live under My Searches.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Portal access</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">Radius CRM agent portal. Quiet premium search UX.</CardContent>
          </Card>
        </div>

        <Button onClick={() => setSaved(true)}>Save profile</Button>
        {saved ? <div className="text-sm text-emerald-700">Profile saved.</div> : null}
      </div>
    </div>
  );
}
