"use client"

import { BarChart3, LineChart, PieChart } from "lucide-react"
import { useState } from "react"

import Dropdown from "@/components/analytics/analytics-dropdown"
import DashboardLayout from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const [selectedValue, setSelectedValue] = useState("7days");

  console.log(selectedValue)

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">View your store performance metrics</p>
        </div>
        <Dropdown selected={selectedValue} onChange={setSelectedValue}/>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Revenue</h2>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              +12.5%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold">$24,567.89</p>
          <div className="mt-4 h-64 w-full bg-gray-50 flex items-center justify-center">
            <LineChart className="h-12 w-12 text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">Revenue chart placeholder</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Orders</h2>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              +8.2%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold">1,234</p>
          <div className="mt-4 h-64 w-full bg-gray-50 flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">Orders chart placeholder</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Conversion Rate</h2>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              +3.1%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold">3.2%</p>
          <div className="mt-4 h-64 w-full bg-gray-50 flex items-center justify-center">
            <PieChart className="h-12 w-12 text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">Conversion chart placeholder</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
          <div className="mt-4 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Orders
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Classic White T-Shirt", orders: 234, revenue: 6989.66 },
                  { name: "Slim Fit Jeans", orders: 187, revenue: 11219.13 },
                  { name: "Wool Sweater", orders: 156, revenue: 12479.44 },
                  { name: "Leather Jacket", orders: 89, revenue: 17799.11 },
                  { name: "Cotton Socks (3-Pack)", orders: 321, revenue: 4169.79 },
                ].map((product, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Sales by Category</h2>
          <div className="mt-4 h-80 w-full bg-gray-50 flex items-center justify-center">
            <PieChart className="h-12 w-12 text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">Category chart placeholder</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { name: "T-Shirts", percentage: "32%" },
              { name: "Pants", percentage: "21%" },
              { name: "Sweaters", percentage: "18%" },
              { name: "Outerwear", percentage: "15%" },
              { name: "Accessories", percentage: "9%" },
              { name: "Footwear", percentage: "5%" },
            ].map((category, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.name}</span>
                <span className="text-sm font-medium text-gray-900">{category.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

