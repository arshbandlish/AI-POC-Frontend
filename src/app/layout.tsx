import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POC Chatbot",
  description: "A chatbot that helps you with your queries and provides intelligent responses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
