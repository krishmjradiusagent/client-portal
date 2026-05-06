"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "../hooks/use-toast";

export function SettingsPage() {
  const { toast } = useToast();

  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [frequency, setFrequency] = useState("daily");
  
  const [notifications, setNotifications] = useState({
    newListings: true,
    priceChanges: true,
    statusChanges: true
  });
  
  const [channels, setChannels] = useState({
    email: true,
    sms: true
  });

  const showToast = () => {
    toast({
      description: "Settings updated",
    });
  };

  const updateSetting = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    showToast();
  };

  const updateChannel = (key: keyof typeof channels, value: boolean) => {
    setChannels(prev => ({ ...prev, [key]: value }));
    showToast();
  };

  const handleAlertsToggle = (val: boolean) => {
    setAlertsEnabled(val);
    showToast();
  };

  const handleFrequencyChange = (val: string) => {
    setFrequency(val);
    showToast();
  };

  const pauseAlerts = () => {
    setAlertsEnabled(false);
    showToast();
  };

  const deleteAccountConfirm = () => {
    // Account deletion logic
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-foreground">Settings</div>
            <div className="mt-1 text-sm text-muted-foreground">Alerts, frequency, and account controls.</div>
          </div>
          <Badge variant="secondary">Radius CRM</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Home Search</CardTitle>
            <CardDescription>San Francisco • 2–3 bed • $800k–$1.2M</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Switch id="alerts-toggle" checked={alertsEnabled} onCheckedChange={handleAlertsToggle} />
                  <Label htmlFor="alerts-toggle" className="text-base font-medium">Alerts</Label>
                </div>
                <p className="text-sm text-muted-foreground">Get notified when listings match your search</p>
              </div>
              
              <Select value={frequency} onValueChange={handleFrequencyChange} disabled={!alertsEnabled}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instant">Instant</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className={`text-sm font-medium ${!alertsEnabled ? "opacity-50" : "text-foreground"}`}>Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-new" 
                    checked={notifications.newListings} 
                    disabled={!alertsEnabled}
                    onCheckedChange={(c) => updateSetting("newListings", !!c)} 
                  />
                  <Label htmlFor="notify-new" className={`font-normal ${!alertsEnabled ? "opacity-50" : ""}`}>New listings (when homes match your search)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-price" 
                    checked={notifications.priceChanges} 
                    disabled={!alertsEnabled}
                    onCheckedChange={(c) => updateSetting("priceChanges", !!c)} 
                  />
                  <Label htmlFor="notify-price" className={`font-normal ${!alertsEnabled ? "opacity-50" : ""}`}>Price changes (on matching or saved homes)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="notify-status" 
                    checked={notifications.statusChanges} 
                    disabled={!alertsEnabled}
                    onCheckedChange={(c) => updateSetting("statusChanges", !!c)} 
                  />
                  <Label htmlFor="notify-status" className={`font-normal ${!alertsEnabled ? "opacity-50" : ""}`}>Status changes (pending, sold, etc.)</Label>
                </div>
              </div>
            </div>
            
            <Separator />

            <div className="space-y-4">
              <h4 className={`text-sm font-medium ${!alertsEnabled ? "opacity-50" : "text-foreground"}`}>Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-email" 
                    checked={channels.email} 
                    disabled={!alertsEnabled}
                    onCheckedChange={(c) => updateChannel("email", !!c)} 
                  />
                  <Label htmlFor="channel-email" className={`font-normal ${!alertsEnabled ? "opacity-50" : ""}`}>Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="channel-sms" 
                    checked={channels.sms} 
                    disabled={!alertsEnabled}
                    onCheckedChange={(c) => updateChannel("sms", !!c)} 
                  />
                  <Label htmlFor="channel-sms" className={`font-normal ${!alertsEnabled ? "opacity-50" : ""}`}>SMS (urgent updates only)</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end space-x-4 pt-2">
              <Button variant="ghost" onClick={() => {}}>
                Edit Search
              </Button>
              <Button variant="outline" onClick={pauseAlerts} disabled={!alertsEnabled}>
                Pause Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">krish@radiusagent.com</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Change Email
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Password</div>
                  <div className="text-sm text-muted-foreground">Keep your account protected.</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Reset password
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Pause alerts</h4>
                  <div className="text-sm text-muted-foreground">Stops all listing notifications.</div>
                </div>
                <Button variant="outline" onClick={pauseAlerts} disabled={!alertsEnabled}>
                  Pause Alerts
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-destructive">Delete account</h4>
                  <div className="text-sm text-muted-foreground">Removes all saved homes, searches, and messages.</div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteAccountConfirm}>Delete account</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

