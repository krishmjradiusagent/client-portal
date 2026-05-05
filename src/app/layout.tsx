import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata = {
  title: "Radius Client Portal Prototype",
  description: "Clickable real-estate search interface prototype.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%235a5ff2'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='Arial' font-size='18' font-weight='700' fill='white'%3ER%3C/text%3E%3C/svg%3E"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
