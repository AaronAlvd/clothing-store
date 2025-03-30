"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample order data with additional fields
const initialOrders = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2023-06-15",
    total: 129.99,
    status: "Completed",
    paymentStatus: "Paid",
    items: 3,
    shippingMethod: "Standard",
    customerType: "Returning",
  },
  {
    id: "ORD-1002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-06-14",
    total: 79.95,
    status: "Processing",
    paymentStatus: "Paid",
    items: 2,
    shippingMethod: "Express",
    customerType: "VIP",
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    email: "mbrown@example.com",
    date: "2023-06-12",
    total: 189.5,
    status: "Shipped",
    paymentStatus: "Paid",
    items: 4,
    shippingMethod: "Standard",
    customerType: "Returning",
  },
  {
    id: "ORD-1004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-06-10",
    total: 59.99,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: 1,
    shippingMethod: "Standard",
    customerType: "New",
  },
  {
    id: "ORD-1005",
    customer: "David Wilson",
    email: "dwilson@example.com",
    date: "2023-06-08",
    total: 149.95,
    status: "Completed",
    paymentStatus: "Paid",
    items: 2,
    shippingMethod: "Express",
    customerType: "Regular",
  },
  {
    id: "ORD-1006",
    customer: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    date: "2023-06-05",
    total: 249.99,
    status: "Completed",
    paymentStatus: "Paid",
    items: 5,
    shippingMethod: "Standard",
    customerType: "VIP",
  },
  {
    id: "ORD-1007",
    customer: "Robert Garcia",
    email: "rgarcia@example.com",
    date: "2023-06-03",
    total: 34.95,
    status: "Shipped",
    paymentStatus: "Paid",
    items: 1,
    shippingMethod: "Standard",
    customerType: "New",
  },
  {
    id: "ORD-1008",
    customer: "Lisa Martinez",
    email: "lmartinez@example.com",
    date: "2023-05-30",
    total: 89.99,
    status: "Completed",
    paymentStatus: "Paid",
    items: 2,
    shippingMethod: "Express",
    customerType: "Regular",
  },
  {
    id: "ORD-1009",
    customer: "James Taylor",
    email: "jtaylor@example.com",
    date: "2023-05-28",
    total: 45.5,
    status: "Processing",
    paymentStatus: "Pending",
    items: 1,
    shippingMethod: "Standard",
    customerType: "New",
  },
  {
    id: "ORD-1010",
    customer: "Patricia Anderson",
    email: "panderson@example.com",
    date: "2023-05-25",
    total: 199.99,
    status: "Completed",
    paymentStatus: "Paid",
    items: 3,
    shippingMethod: "Express",
    customerType: "VIP",
  },
]

// Available filter options
const orderStatuses = ["Completed", "Processing", "Shipped", "Cancelled"]
const paymentStatuses = ["Paid", "Pending", "Refunded"]
const shippingMethods = ["Standard", "Express"]
const customerTypes = ["New", "Regular", "Returning", "VIP"]

const totalRanges = [
  { label: "Under $50", min: 0, max: 49.99 },
  { label: "$50 - $99.99", min: 50, max: 99.99 },
  { label: "$100 - $199.99", min: 100, max: 199.99 },
  { label: "$200 and above", min: 200, max: Number.POSITIVE_INFINITY },
]

const itemCountRanges = [
  { label: "1 item", min: 1, max: 1 },
  { label: "2-3 items", min: 2, max: 3 },
  { label: "4-5 items", min: 4, max: 5 },
  { label: "6+ items", min: 6, max: Number.POSITIVE_INFINITY },
]

const datePeriods = [
  { label: "Today", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last 6 months", days: 180 },
  { label: "Last year", days: 365 },
]

export default function OrdersPage() {
  const [orders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter states
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState<string[]>([])
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<string[]>([])
  const [selectedShippingMethods, setSelectedShippingMethods] = useState<string[]>([])
  const [selectedCustomerTypes, setSelectedCustomerTypes] = useState<string[]>([])
  const [selectedTotalRanges, setSelectedTotalRanges] = useState<number[]>([])
  const [selectedItemCountRanges, setSelectedItemCountRanges] = useState<number[]>([])
  const [selectedDatePeriods, setSelectedDatePeriods] = useState<number[]>([])
  const [customTotalRange, setCustomTotalRange] = useState<{ min: string; max: string }>({ min: "", max: "" })
  const [customDateRange, setCustomDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })

  // Active filters count
  const activeFiltersCount =
    selectedOrderStatuses.length +
    selectedPaymentStatuses.length +
    selectedShippingMethods.length +
    selectedCustomerTypes.length +
    selectedTotalRanges.length +
    selectedItemCountRanges.length +
    selectedDatePeriods.length +
    (customTotalRange.min || customTotalRange.max ? 1 : 0) +
    (customDateRange.from || customDateRange.to ? 1 : 0)

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Toggle filter selection
  const toggleFilter = (
    value: string | number,
    currentSelected: (string | number)[],
    setSelected: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    if (currentSelected.includes(value)) {
      setSelected(currentSelected.filter((item) => item !== value))
    } else {
      setSelected([...currentSelected, value])
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedOrderStatuses([])
    setSelectedPaymentStatuses([])
    setSelectedShippingMethods([])
    setSelectedCustomerTypes([])
    setSelectedTotalRanges([])
    setSelectedItemCountRanges([])
    setSelectedDatePeriods([])
    setCustomTotalRange({ min: "", max: "" })
    setCustomDateRange({ from: "", to: "" })
  }

  // Apply custom total range
  const applyCustomTotalRange = () => {
    const min = customTotalRange.min ? Number.parseFloat(customTotalRange.min) : 0
    const max = customTotalRange.max ? Number.parseFloat(customTotalRange.max) : Number.POSITIVE_INFINITY

    return (order: any) => {
      if (!customTotalRange.min && !customTotalRange.max) return true
      return order.total >= min && order.total <= max
    }
  }

  // Apply custom date range
  const applyCustomDateRange = () => {
    const from = customDateRange.from ? new Date(customDateRange.from) : new Date(0)
    const to = customDateRange.to ? new Date(customDateRange.to) : new Date()

    return (order: any) => {
      if (!customDateRange.from && !customDateRange.to) return true

      const orderDate = new Date(order.date)
      return orderDate >= from && orderDate <= to
    }
  }

  // Check if a date is within a period
  const isDateWithinPeriod = (dateString: string, days: number) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= days
  }

  // Get filtered and sorted orders
  const filteredOrders = orders
    .filter((order) => {
      // Search query filter
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())

      // Order status filter
      const matchesOrderStatus = selectedOrderStatuses.length === 0 || selectedOrderStatuses.includes(order.status)

      // Payment status filter
      const matchesPaymentStatus =
        selectedPaymentStatuses.length === 0 || selectedPaymentStatuses.includes(order.paymentStatus)

      // Shipping method filter
      const matchesShippingMethod =
        selectedShippingMethods.length === 0 || selectedShippingMethods.includes(order.shippingMethod)

      // Customer type filter
      const matchesCustomerType =
        selectedCustomerTypes.length === 0 || selectedCustomerTypes.includes(order.customerType)

      // Total range filter
      const matchesTotalRange =
        selectedTotalRanges.length === 0 ||
        selectedTotalRanges.some((rangeIndex) => {
          const range = totalRanges[rangeIndex]
          return order.total >= range.min && order.total <= range.max
        })

      // Item count range filter
      const matchesItemCountRange =
        selectedItemCountRanges.length === 0 ||
        selectedItemCountRanges.some((rangeIndex) => {
          const range = itemCountRanges[rangeIndex]
          return order.items >= range.min && order.items <= range.max
        })

      // Date period filter
      const matchesDatePeriod =
        selectedDatePeriods.length === 0 ||
        selectedDatePeriods.some((periodIndex) => {
          const period = datePeriods[periodIndex]
          return isDateWithinPeriod(order.date, period.days)
        })

      // Custom filters
      const matchesCustomTotalRange = applyCustomTotalRange()(order)
      const matchesCustomDateRange = applyCustomDateRange()(order)

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPaymentStatus &&
        matchesShippingMethod &&
        matchesCustomerType &&
        matchesTotalRange &&
        matchesItemCountRange &&
        matchesDatePeriod &&
        matchesCustomTotalRange &&
        matchesCustomDateRange
      )
    })
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      }

      return sortDirection === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA)
    })

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Manage customer orders</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="relative w-full sm:max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            className={`inline-flex items-center rounded-md ${
              showFilters || activeFiltersCount > 0
                ? "bg-blue-50 text-blue-700 border-blue-300"
                : "bg-white text-gray-700 border-gray-300"
            } border px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <button type="button" onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800">
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Order Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Status</h3>
              <div className="space-y-1">
                {orderStatuses.map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      id={`status-${status}`}
                      name={`status-${status}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedOrderStatuses.includes(status)}
                      onChange={() => toggleFilter(status, selectedOrderStatuses, setSelectedOrderStatuses)}
                    />
                    <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Status</h3>
              <div className="space-y-1">
                {paymentStatuses.map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      id={`payment-${status}`}
                      name={`payment-${status}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedPaymentStatuses.includes(status)}
                      onChange={() => toggleFilter(status, selectedPaymentStatuses, setSelectedPaymentStatuses)}
                    />
                    <label htmlFor={`payment-${status}`} className="ml-2 text-sm text-gray-700">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Method Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Method</h3>
              <div className="space-y-1">
                {shippingMethods.map((method) => (
                  <div key={method} className="flex items-center">
                    <input
                      id={`shipping-${method}`}
                      name={`shipping-${method}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedShippingMethods.includes(method)}
                      onChange={() => toggleFilter(method, selectedShippingMethods, setSelectedShippingMethods)}
                    />
                    <label htmlFor={`shipping-${method}`} className="ml-2 text-sm text-gray-700">
                      {method}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Type</h3>
              <div className="space-y-1">
                {customerTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`customer-${type}`}
                      name={`customer-${type}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCustomerTypes.includes(type)}
                      onChange={() => toggleFilter(type, selectedCustomerTypes, setSelectedCustomerTypes)}
                    />
                    <label htmlFor={`customer-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Amount Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Total Amount</h3>
              <div className="space-y-1">
                {totalRanges.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      id={`total-${index}`}
                      name={`total-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedTotalRanges.includes(index)}
                      onChange={() => toggleFilter(index, selectedTotalRanges, setSelectedTotalRanges)}
                    />
                    <label htmlFor={`total-${index}`} className="ml-2 text-sm text-gray-700">
                      {range.label}
                    </label>
                  </div>
                ))}
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min $"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customTotalRange.min}
                    onChange={(e) => setCustomTotalRange({ ...customTotalRange, min: e.target.value })}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max $"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customTotalRange.max}
                    onChange={(e) => setCustomTotalRange({ ...customTotalRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Item Count Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Number of Items</h3>
              <div className="space-y-1">
                {itemCountRanges.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      id={`items-${index}`}
                      name={`items-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedItemCountRanges.includes(index)}
                      onChange={() => toggleFilter(index, selectedItemCountRanges, setSelectedItemCountRanges)}
                    />
                    <label htmlFor={`items-${index}`} className="ml-2 text-sm text-gray-700">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Date</h3>
              <div className="space-y-1">
                {datePeriods.map((period, index) => (
                  <div key={period.label} className="flex items-center">
                    <input
                      id={`date-${index}`}
                      name={`date-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedDatePeriods.includes(index)}
                      onChange={() => toggleFilter(index, selectedDatePeriods, setSelectedDatePeriods)}
                    />
                    <label htmlFor={`date-${index}`} className="ml-2 text-sm text-gray-700">
                      {period.label}
                    </label>
                  </div>
                ))}
                <div className="mt-3 space-y-2">
                  <div>
                    <label htmlFor="date-from" className="block text-xs text-gray-500">
                      From
                    </label>
                    <input
                      type="date"
                      id="date-from"
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={customDateRange.from}
                      onChange={(e) => setCustomDateRange({ ...customDateRange, from: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="date-to" className="block text-xs text-gray-500">
                      To
                    </label>
                    <input
                      type="date"
                      id="date-to"
                      className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={customDateRange.to}
                      onChange={(e) => setCustomDateRange({ ...customDateRange, to: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedOrderStatuses.map((status) => (
                  <div
                    key={`active-status-${status}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Status: {status}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedOrderStatuses(selectedOrderStatuses.filter((s) => s !== status))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedPaymentStatuses.map((status) => (
                  <div
                    key={`active-payment-${status}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Payment: {status}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedPaymentStatuses(selectedPaymentStatuses.filter((s) => s !== status))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedShippingMethods.map((method) => (
                  <div
                    key={`active-shipping-${method}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Shipping: {method}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedShippingMethods(selectedShippingMethods.filter((m) => m !== method))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedCustomerTypes.map((type) => (
                  <div
                    key={`active-customer-${type}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Customer: {type}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedCustomerTypes(selectedCustomerTypes.filter((t) => t !== type))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedTotalRanges.map((rangeIndex) => (
                  <div
                    key={`active-total-${rangeIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {totalRanges[rangeIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedTotalRanges(selectedTotalRanges.filter((r) => r !== rangeIndex))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedItemCountRanges.map((rangeIndex) => (
                  <div
                    key={`active-items-${rangeIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {itemCountRanges[rangeIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() =>
                        setSelectedItemCountRanges(selectedItemCountRanges.filter((r) => r !== rangeIndex))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedDatePeriods.map((periodIndex) => (
                  <div
                    key={`active-date-${periodIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {datePeriods[periodIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedDatePeriods(selectedDatePeriods.filter((p) => p !== periodIndex))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(customTotalRange.min || customTotalRange.max) && (
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    Total: ${customTotalRange.min || "0"} - ${customTotalRange.max || "∞"}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setCustomTotalRange({ min: "", max: "" })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(customDateRange.from || customDateRange.to) && (
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    Date: {customDateRange.from || "Any"} to {customDateRange.to || "Now"}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setCustomDateRange({ from: "", to: "" })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Order ID
                    {sortField === "id" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("customer")}
                >
                  <div className="flex items-center">
                    Customer
                    {sortField === "customer" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("total")}
                >
                  <div className="flex items-center">
                    Total
                    {sortField === "total" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("paymentStatus")}
                >
                  <div className="flex items-center">
                    Payment
                    {sortField === "paymentStatus" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900">
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronUp className="h-5 w-5 rotate-90" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

