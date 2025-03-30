"use client"

import type React from "react"
import Footer from "./footer"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Box, ChevronRight, Home, LogOut, Package, Settings, ShoppingBag, Users } from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  expanded: boolean
}

function NavItem({ href, icon, label, active, expanded }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
      title={expanded ? undefined : label}
    >
      <div className="flex-shrink-0">{icon}</div>
      {expanded && <span>{label}</span>}
    </Link>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex bg-gray-50">
      {/* Permanent sidebar */}
      <div
        className={`fixed top-[65px] left-0 z-10 flex flex-col border-r border-gray-200 bg-white transition-all duration-300 h-[calc(100vh-65px)] ${
          expanded ? "w-64" : "w-16"
        }`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            {expanded && <span className="text-lg font-bold">ClothAdmin</span>}
          </Link>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          <nav className="flex-1 space-y-1">
            <NavItem
              href="/admin"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              active={pathname === "/admin"}
              expanded={expanded}
            />
            <NavItem
              href="/admin/products"
              icon={<Package className="h-5 w-5" />}
              label="Products"
              active={pathname.startsWith("/admin/products")}
              expanded={expanded}
            />
            <NavItem
              href="/admin/orders"
              icon={<Box className="h-5 w-5" />}
              label="Orders"
              active={pathname.startsWith("/admin/orders")}
              expanded={expanded}
            />
            <NavItem
              href="/admin/customers"
              icon={<Users className="h-5 w-5" />}
              label="Customers"
              active={pathname.startsWith("/admin/customers")}
              expanded={expanded}
            />
            <NavItem
              href="/admin/analytics"
              icon={<BarChart3 className="h-5 w-5" />}
              label="Analytics"
              active={pathname.startsWith("/admin/analytics")}
              expanded={expanded}
            />
            <NavItem
              href="/admin/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={pathname.startsWith("/admin/settings")}
              expanded={expanded}
            />
          </nav>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              title={expanded ? undefined : "Logout"}
            >
              <LogOut className="h-5 w-5" />
              {expanded && "Logout"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${expanded ? "ml-64" : "ml-16"}`}>
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

