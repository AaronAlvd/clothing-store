"use client"

import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { login } from "@/actions/auth"

import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await login(email, password)
  }

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-sm">
        <div className="flex justify-center mb-6">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40 0C51.25 0 60.5 8.96 60.5 20C60.5 31.04 51.25 40 40 40C28.75 40 19.5 31.04 19.5 20C19.5 8.96 28.75 0 40 0Z"
              fill="#CC0000"
            />
            <path d="M28.5 12H33.5V28H28.5V12Z" fill="white" />
            <path d="M46.5 12H51.5V28H46.5V12Z" fill="white" />
            <path d="M34 12H46V17H34V12Z" fill="white" />
            <path d="M34 23H46V28H34V23Z" fill="white" />
            <path d="M34 17.5H40V22.5H34V17.5Z" fill="white" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Login to your StyleHub account</h1>
        <p className="text-center mb-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-black font-semibold">
            Register
          </Link>
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line x1="2" x2="22" y1="2" y2="22"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          <div>
            <Link href="#" className="text-sm text-black">
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-xs text-gray-700">
            By signing up or signing in, you agree to our{" "}
            <Link href="#" className="font-semibold">
              Terms of Use
            </Link>{" "}
            and have read our{" "}
            <Link href="#" className="font-semibold">
              Privacy Policy
            </Link>
            . Health and its{" "}
            <Link href="#" className="font-semibold">
              affiliates
            </Link>{" "}
            may use your email address to send updates, ads, and offers. Opt out via{" "}
            <Link href="#" className="font-semibold">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 h-12 border border-gray-300 rounded-md hover:bg-gray-50">
            <FcGoogle className="text-[20px]"/>
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 h-12 border border-gray-300 rounded-md hover:bg-gray-50">
            <IoLogoApple className="text-[20px]"/>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  )
}
