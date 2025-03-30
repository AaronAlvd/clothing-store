"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { AuthContextProvider } from "@/context/AuthProvider"
import { Inter } from "next/font/google"

import "./globals.css"

import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <AuthContextProvider>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main>{children}</main>
          {!pathname.startsWith("/admin") && <Footer />}
        </div>
      </body>
      </AuthContextProvider>
    </html>
  )
}

