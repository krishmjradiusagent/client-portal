"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { alertFrequencies } from "./mockData";

export function SettingsPage() {
  const [alerts, setAlerts] = useState("on");
  const [frequency, setFrequency] = useState("daily");
  const [sms, setSms] = useState(true);
  const [marketDigest, setMarketDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-slate-900">Settings</div>
            <div className="mt-1 text-sm text-slate-500">Alerts, frequency, and account controls.</div>
          </div>
          <Badge variant="secondary">Radius CRM</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Listing alerts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Alerts</div>
              <button
                className={`rounded-md border px-4 py-2 text-sm font-medium ${alerts === "on" ? "border-slate-200 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-700"}`}
                onClick={() => setAlerts(alerts === "on" ? "off" : "on")}
              >
                {alerts === "on" ? "On" : "Off"}
              </button>
            </div>
            <div className="grid gap-2">
              <Label>Search Alert Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instantly">Instantly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              className={`rounded-md border p-4 text-left ${sms ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"}`}
              onClick={() => setSms(!sms)}
            >
              <div className="text-sm font-medium text-slate-900">SMS alerts</div>
              <div className="mt-1 text-sm text-slate-500">{sms ? "Enabled" : "Disabled"}</div>
            </button>
            <button
              className={`rounded-2xl border p-4 text-left transition-all ${marketDigest ? "border-slate-300 bg-slate-100" : "border-slate-200 bg-white"}`}
              onClick={() => setMarketDigest(!marketDigest)}
            >
              <div className="text-sm font-medium text-slate-900">Market digest</div>
              <div className="mt-1 text-sm text-slate-500">{marketDigest ? "Included" : "Not included"}</div>
            </button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-slate-600">Reset password flow stays inside the portal.</div>
              <Button variant="outline" onClick={() => setSaved(true)}>
                Reset password
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-slate-600">Disable account is a destructive action.</div>
              <Button variant="destructive" onClick={() => setSaved(false)}>
                Disable account
              </Button>
            </CardContent>
          </Card>
        </div>

        <Button onClick={() => setSaved(true)}>Save settings</Button>
        {saved ? <div className="text-sm text-emerald-700">Settings saved.</div> : null}
      </div>
    </div>
  );
}
