import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Navbar } from "@/components/nav"
import { Preloader } from "@/components/preloader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CortexCalc Brain Trainer",
  description: "Sharpen Your Mind, One Question at a Time!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Bungee&family=Open+Sans:wght@400;600;700&family=Orbitron:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background min-h-screen`}>
        <Preloader />
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-[200px] opacity-5 text-cyan-400 animate-float-slow">+</div>
            <div className="absolute top-1/3 right-1/4 text-[180px] opacity-5 text-fuchsia-400 animate-float-medium">
              ÷
            </div>
            <div className="absolute bottom-1/4 left-1/3 text-[220px] opacity-5 text-mint-400 animate-float-fast">
              ×
            </div>
            <div className="absolute bottom-1/3 right-1/3 text-[160px] opacity-5 text-gold-400 animate-float-slow">
              π
            </div>
            <div className="absolute top-2/3 left-1/2 text-[190px] opacity-5 text-violet-400 animate-float-medium">
              √
            </div>
            <div className="absolute top-1/2 right-1/5 text-[170px] opacity-5 text-blue-400 animate-float-fast">∑</div>
            <div className="absolute bottom-1/5 left-1/5 text-[210px] opacity-5 text-fuchsia-400 animate-float-slow">
              %
            </div>
          </div>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
