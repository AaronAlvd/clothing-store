import type React from "react"
import Link from "next/link"
import { BarChart3, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

function StatCard({
  title,
  value,
  icon,
  change,
  changeType,
}: {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  changeType: "positive" | "negative" | "neutral"
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center">
        <div className="rounded-md bg-blue-50 p-3">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm font-medium ${
            changeType === "positive" ? "text-green-600" : changeType === "negative" ? "text-red-600" : "text-gray-500"
          }`}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your store performance and statistics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$24,567.89"
          icon={<DollarSign className="h-6 w-6 text-blue-600" />}
          change="+12.5%"
          changeType="positive"
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          icon={<ShoppingCart className="h-6 w-6 text-blue-600" />}
          change="+8.2%"
          changeType="positive"
        />
        <StatCard
          title="Products"
          value="156"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          change="+3.1%"
          changeType="positive"
        />
        <StatCard
          title="Customers"
          value="2,543"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          change="+15.3%"
          changeType="positive"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
            <div className="flex space-x-2">
              <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">Weekly</button>
              <button className="rounded-md px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Monthly
              </button>
              <button className="rounded-md px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Yearly
              </button>
            </div>
          </div>
          <div className="mt-6 h-64 w-full bg-gray-50 flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-gray-300" />
            <span className="ml-2 text-sm text-gray-500">Chart placeholder</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((order) => (
                <li key={order} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Order #{Math.floor(Math.random() * 10000)}
                      </p>
                      <p className="truncate text-sm text-gray-500">Customer: John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">${(Math.random() * 200).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
          <Link href="/dashboard/products" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all products
          </Link>
        </div>
        <div className="mt-6 overflow-hidden">
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
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sales
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: "Classic White T-Shirt", category: "T-Shirts", price: "$29.99", sales: 1234 },
                { name: "Slim Fit Jeans", category: "Pants", price: "$59.99", sales: 987 },
                { name: "Wool Sweater", category: "Sweaters", price: "$79.99", sales: 876 },
                { name: "Leather Jacket", category: "Outerwear", price: "$199.99", sales: 654 },
                { name: "Cotton Socks (3-Pack)", category: "Accessories", price: "$12.99", sales: 543 },
              ].map((product, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={`/placeholder.svg?height=40&width=40`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+{Math.floor(Math.random() * 20)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

