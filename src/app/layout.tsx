import "./globals.css";

export const metadata = {
  title: "Radius Client Portal Prototype",
  description: "Clickable real-estate search interface prototype."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
