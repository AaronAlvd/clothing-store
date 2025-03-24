"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function AccountNav() {
  const pathname = usePathname()

  const links = [
    { name: "Account Overview", href: "/account" },
    { name: "Orders", href: "/account/orders" },
    { name: "Addresses", href: "/account/addresses" },
    { name: "Payment Methods", href: "/account/payment" },
  ]

  return (
    <nav className="space-y-1">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`block rounded-md px-3 py-2 text-sm font-medium ${
            pathname === link.href ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {link.name}
        </Link>
      ))}
      <button className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
        Sign Out
      </button>
    </nav>
  )
}

