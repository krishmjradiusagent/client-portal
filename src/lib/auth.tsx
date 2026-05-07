"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export type AuthMode = "signin" | "signup" | null;

export type AuthIntent =
  | "save_search"
  | "message_agent"
  | "add_home_value"
  | "favorite_property"
  | "reject_property"
  | "protected_action";

export const authIntentCopy: Record<AuthIntent, string> = {
  save_search: "Create an account to save this search and keep your progress.",
  message_agent: "Create an account to message your agent.",
  add_home_value: "Create an account to add your home and track its value.",
  favorite_property: "Create an account to save homes you like.",
  reject_property: "Create an account to hide homes you are not interested in.",
  protected_action: "Create an account to save your progress.",
};

// ─── Context ──────────────────────────────────────────────────────────────────

type AuthContextValue = {
  authUser: AuthUser | null;
  authMode: AuthMode;
  pendingAuthIntent: AuthIntent | null;
  setAuthMode: (mode: AuthMode) => void;
  requireAuth: (intent: AuthIntent, callback?: () => void) => void;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
  pendingCallback: React.MutableRefObject<(() => void) | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [pendingAuthIntent, setPendingAuthIntent] = useState<AuthIntent | null>(null);
  const pendingCallback = React.useRef<(() => void) | null>(null);

  const requireAuth = useCallback(
    (intent: AuthIntent, callback?: () => void) => {
      if (authUser) {
        callback?.();
        return;
      }
      setPendingAuthIntent(intent);
      pendingCallback.current = callback ?? null;
      setAuthMode("signup");
    },
    [authUser]
  );

  const signIn = useCallback((user: AuthUser) => {
    setAuthUser(user);
    setAuthMode(null);
    const cb = pendingCallback.current;
    pendingCallback.current = null;
    setPendingAuthIntent(null);
    if (cb) cb();
  }, []);

  const signOut = useCallback(() => {
    setAuthUser(null);
    setAuthMode(null);
    setPendingAuthIntent(null);
    pendingCallback.current = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authMode,
        pendingAuthIntent,
        setAuthMode,
        requireAuth,
        signIn,
        signOut,
        pendingCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
