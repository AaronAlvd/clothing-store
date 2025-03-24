"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-gray-500 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">StyleHub</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-gray-900">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-gray-900">
              Shop All
            </Link>
            <Link href="/products?category=men" className="text-sm font-medium hover:text-gray-900">
              Men
            </Link>
            <Link href="/products?category=women" className="text-sm font-medium hover:text-gray-900">
              Women
            </Link>
            <Link href="/products?category=accessories" className="text-sm font-medium hover:text-gray-900">
              Accessories
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-500 hover:text-gray-700">
              <Search size={20} />
              <span className="sr-only">Search</span>
            </button>
            <Link href="/account" className="text-gray-500 hover:text-gray-700">
              <User size={20} />
              <span className="sr-only">Account</span>
            </Link>
            <Link href="/cart" className="relative text-gray-500 hover:text-gray-700">
              <ShoppingBag size={20} />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link href="/" className="block py-2 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/products?category=men"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              href="/products?category=women"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              href="/products?category=accessories"
              className="block py-2 text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accessories
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

