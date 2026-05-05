import { AppShell } from "@/components/app-shell"
import "./globals.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
