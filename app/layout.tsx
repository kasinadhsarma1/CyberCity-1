import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyberCity - Cybersecurity Tools Hub",
  description: "Your comprehensive platform for cybersecurity tools and resources",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground cyber-grid min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}