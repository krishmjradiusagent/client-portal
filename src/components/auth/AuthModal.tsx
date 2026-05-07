"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth, authIntentCopy, type AuthIntent, type AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// ─── Sign-Up Form ─────────────────────────────────────────────────────────────

function SignUpForm({
  intent,
  onSuccess,
  onSwitchToSignIn,
}: {
  intent: AuthIntent | null;
  onSuccess: (user: AuthUser) => void;
  onSwitchToSignIn: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const subtitle = intent ? authIntentCopy[intent] : "To search & save your progress, you need an account.";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Mock: simulate network
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    onSuccess({
      id: `user-${Date.now()}`,
      firstName: fullName.trim().split(/\s+/)[0] || fullName.trim(),
      lastName: fullName.trim().split(/\s+/).slice(1).join(" "),
      email: email.trim(),
    });
  };

  const field = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    type = "text",
    placeholder = ""
  ) => (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => { onChange(e.target.value); setErrors((p) => ({ ...p, [id]: "" })); }}
        className={cn("h-9 bg-background text-sm", errors[id] && "border-destructive focus-visible:ring-destructive")}
        autoComplete={type === "password" ? "new-password" : undefined}
      />
      {errors[id] && <p className="text-[11px] text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-1 space-y-3" noValidate>
      {field("fullName", "Full Name", fullName, setFullName, "text", "John Smith")}
      {field("email", "Email", email, setEmail, "email", "you@example.com")}

      <Button type="submit" className="h-10 w-full text-sm font-semibold" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
        Sign Up
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Sign In
        </button>
      </p>

      <p className="text-center text-[10px] leading-relaxed text-muted-foreground/60">
        By creating an account you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}

// ─── Sign-In Form ─────────────────────────────────────────────────────────────

function SignInForm({
  onSuccess,
  onSwitchToSignUp,
}: {
  onSuccess: (user: AuthUser) => void;
  onSwitchToSignUp: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // Mock: parse first/last from email
    const namePart = email.split("@")[0].replace(/[._]/g, " ");
    const [first = "User", ...rest] = namePart.split(" ");
    onSuccess({
      id: `user-${Date.now()}`,
      firstName: first.charAt(0).toUpperCase() + first.slice(1),
      lastName: rest.join(" ") || "",
      email: email.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="si-email" className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
          Email
        </Label>
        <Input
          id="si-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
          className={cn("h-10 text-sm bg-background", errors.email && "border-destructive focus-visible:ring-destructive")}
          autoComplete="email"
        />
        {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="si-password" className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
            Password
          </Label>
          <button
            type="button"
            className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="si-password"
            type={showPass ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
            className={cn("h-10 pr-10 text-sm bg-background", errors.password && "border-destructive focus-visible:ring-destructive")}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] text-destructive">{errors.password}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-11 font-semibold text-sm"
        disabled={loading}
      >
        {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
        Sign In
      </Button>

      <Separator />

      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────

export function AuthModal() {
  const { authMode, setAuthMode, pendingAuthIntent, signIn } = useAuth();

  const isOpen = authMode !== null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => { if (!open) setAuthMode(null); }}
    >
      <DialogContent className="max-h-[88vh] overflow-hidden border border-border bg-card p-0 sm:max-w-[420px]">
        {/* Header */}
        <div className="space-y-1 px-6 pb-3 pt-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">
              {authMode === "signup" ? "Sign Up" : "Sign In"}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {authMode === "signup"
                ? (pendingAuthIntent
                    ? authIntentCopy[pendingAuthIntent]
                    : "To search & save your progress, you need an account.")
                : "Welcome back. Sign in to continue where you left off."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Separator />

        <div className="px-6 pb-5 pt-3">
          {authMode === "signup" ? (
            <SignUpForm
              intent={pendingAuthIntent}
              onSuccess={signIn}
              onSwitchToSignIn={() => setAuthMode("signin")}
            />
          ) : (
            <SignInForm
              onSuccess={signIn}
              onSwitchToSignUp={() => setAuthMode("signup")}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
