"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample customer data with additional fields
const initialCustomers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    orders: 8,
    totalSpent: 789.95,
    lastOrder: "2023-06-15",
    status: "Active",
    type: "Returning",
    location: "New York, USA",
    joinDate: "2022-03-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    orders: 5,
    totalSpent: 459.75,
    lastOrder: "2023-06-14",
    status: "Active",
    type: "Regular",
    location: "Los Angeles, USA",
    joinDate: "2022-05-22",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "+1 (555) 345-6789",
    orders: 12,
    totalSpent: 1245.5,
    lastOrder: "2023-06-12",
    status: "Active",
    type: "VIP",
    location: "Chicago, USA",
    joinDate: "2021-11-05",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    totalSpent: 189.99,
    lastOrder: "2023-06-10",
    status: "Inactive",
    type: "New",
    location: "Miami, USA",
    joinDate: "2023-05-18",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "dwilson@example.com",
    phone: "+1 (555) 567-8901",
    orders: 7,
    totalSpent: 678.45,
    lastOrder: "2023-06-08",
    status: "Active",
    type: "Returning",
    location: "Seattle, USA",
    joinDate: "2022-08-30",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 678-9012",
    orders: 15,
    totalSpent: 1567.25,
    lastOrder: "2023-06-05",
    status: "Active",
    type: "VIP",
    location: "Boston, USA",
    joinDate: "2021-07-12",
  },
  {
    id: "7",
    name: "Robert Garcia",
    email: "rgarcia@example.com",
    phone: "+1 (555) 789-0123",
    orders: 2,
    totalSpent: 129.99,
    lastOrder: "2023-05-28",
    status: "Inactive",
    type: "New",
    location: "Austin, USA",
    joinDate: "2023-04-05",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lmartinez@example.com",
    phone: "+1 (555) 890-1234",
    orders: 9,
    totalSpent: 879.5,
    lastOrder: "2023-06-02",
    status: "Active",
    type: "Returning",
    location: "Denver, USA",
    joinDate: "2022-01-15",
  },
  {
    id: "9",
    name: "James Taylor",
    email: "jtaylor@example.com",
    phone: "+1 (555) 901-2345",
    orders: 0,
    totalSpent: 0,
    lastOrder: "",
    status: "Inactive",
    type: "New",
    location: "Portland, USA",
    joinDate: "2023-06-01",
  },
  {
    id: "10",
    name: "Patricia Anderson",
    email: "panderson@example.com",
    phone: "+1 (555) 012-3456",
    orders: 20,
    totalSpent: 2345.75,
    lastOrder: "2023-06-16",
    status: "Active",
    type: "VIP",
    location: "San Francisco, USA",
    joinDate: "2021-03-22",
  },
]

// Available filter options
const locations = [
  "New York, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Miami, USA",
  "Seattle, USA",
  "Boston, USA",
  "Austin, USA",
  "Denver, USA",
  "Portland, USA",
  "San Francisco, USA",
]

const customerTypes = ["New", "Regular", "Returning", "VIP"]

const customerStatuses = ["Active", "Inactive"]

const orderRanges = [
  { label: "No orders", min: 0, max: 0 },
  { label: "1-5 orders", min: 1, max: 5 },
  { label: "6-10 orders", min: 6, max: 10 },
  { label: "11-20 orders", min: 11, max: 20 },
  { label: "21+ orders", min: 21, max: Number.POSITIVE_INFINITY },
]

const spendingRanges = [
  { label: "No spending", min: 0, max: 0 },
  { label: "Under $250", min: 0.01, max: 250 },
  { label: "$250 - $500", min: 250, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { label: "$2,000+", min: 2000, max: Number.POSITIVE_INFINITY },
]

const lastOrderPeriods = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "Last 6 months", days: 180 },
  { label: "Last year", days: 365 },
  { label: "More than a year", days: -1 }, // Special case for more than a year
]

export default function CustomersPage() {
  const [customers] = useState(initialCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>("lastOrder")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter states
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedOrderRanges, setSelectedOrderRanges] = useState<number[]>([])
  const [selectedSpendingRanges, setSelectedSpendingRanges] = useState<number[]>([])
  const [selectedLastOrderPeriods, setSelectedLastOrderPeriods] = useState<number[]>([])
  const [customSpendingRange, setCustomSpendingRange] = useState<{ min: string; max: string }>({ min: "", max: "" })
  const [customOrderRange, setCustomOrderRange] = useState<{ min: string; max: string }>({ min: "", max: "" })
  const [customDateRange, setCustomDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })

  // Active filters count
  const activeFiltersCount =
    selectedLocations.length +
    selectedTypes.length +
    selectedStatuses.length +
    selectedOrderRanges.length +
    selectedSpendingRanges.length +
    selectedLastOrderPeriods.length +
    (customSpendingRange.min || customSpendingRange.max ? 1 : 0) +
    (customOrderRange.min || customOrderRange.max ? 1 : 0) +
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
    setSelectedLocations([])
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedOrderRanges([])
    setSelectedSpendingRanges([])
    setSelectedLastOrderPeriods([])
    setCustomSpendingRange({ min: "", max: "" })
    setCustomOrderRange({ min: "", max: "" })
    setCustomDateRange({ from: "", to: "" })
  }

  // Apply custom spending range
  const applyCustomSpendingRange = () => {
    const min = customSpendingRange.min ? Number.parseFloat(customSpendingRange.min) : 0
    const max = customSpendingRange.max ? Number.parseFloat(customSpendingRange.max) : Number.POSITIVE_INFINITY

    return (customer: any) => {
      if (!customSpendingRange.min && !customSpendingRange.max) return true
      return customer.totalSpent >= min && customer.totalSpent <= max
    }
  }

  // Apply custom order range
  const applyCustomOrderRange = () => {
    const min = customOrderRange.min ? Number.parseInt(customOrderRange.min) : 0
    const max = customOrderRange.max ? Number.parseInt(customOrderRange.max) : Number.POSITIVE_INFINITY

    return (customer: any) => {
      if (!customOrderRange.min && !customOrderRange.max) return true
      return customer.orders >= min && customer.orders <= max
    }
  }

  // Apply custom date range
  const applyCustomDateRange = () => {
    const from = customDateRange.from ? new Date(customDateRange.from) : new Date(0)
    const to = customDateRange.to ? new Date(customDateRange.to) : new Date()

    return (customer: any) => {
      if (!customDateRange.from && !customDateRange.to) return true
      if (!customer.lastOrder) return false

      const lastOrderDate = new Date(customer.lastOrder)
      return lastOrderDate >= from && lastOrderDate <= to
    }
  }

  // Check if a date is within a period
  const isDateWithinPeriod = (dateString: string, days: number) => {
    if (!dateString) return false
    if (days === -1) {
      // More than a year
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return new Date(dateString) < oneYearAgo
    }

    const now = new Date()
    const date = new Date(dateString)
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= days
  }

  // Get filtered and sorted customers
  const filteredCustomers = customers
    .filter((customer) => {
      // Search query filter
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Location filter
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(customer.location)

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(customer.type)

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(customer.status)

      // Order range filter
      const matchesOrderRange =
        selectedOrderRanges.length === 0 ||
        selectedOrderRanges.some((rangeIndex) => {
          const range = orderRanges[rangeIndex]
          return customer.orders >= range.min && customer.orders <= range.max
        })

      // Spending range filter
      const matchesSpendingRange =
        selectedSpendingRanges.length === 0 ||
        selectedSpendingRanges.some((rangeIndex) => {
          const range = spendingRanges[rangeIndex]
          return customer.totalSpent >= range.min && customer.totalSpent <= range.max
        })

      // Last order period filter
      const matchesLastOrderPeriod =
        selectedLastOrderPeriods.length === 0 ||
        selectedLastOrderPeriods.some((periodIndex) => {
          const period = lastOrderPeriods[periodIndex]
          return isDateWithinPeriod(customer.lastOrder, period.days)
        })

      // Custom filters
      const matchesCustomSpendingRange = applyCustomSpendingRange()(customer)
      const matchesCustomOrderRange = applyCustomOrderRange()(customer)
      const matchesCustomDateRange = applyCustomDateRange()(customer)

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesStatus &&
        matchesOrderRange &&
        matchesSpendingRange &&
        matchesLastOrderPeriod &&
        matchesCustomSpendingRange &&
        matchesCustomOrderRange &&
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
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your customer database</p>
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
            placeholder="Search customers..."
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
            {/* Customer Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Type</h3>
              <div className="space-y-1">
                {customerTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      name={`type-${type}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Status</h3>
              <div className="space-y-1">
                {customerStatuses.map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      id={`status-${status}`}
                      name={`status-${status}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => toggleFilter(status, selectedStatuses, setSelectedStatuses)}
                    />
                    <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center">
                    <input
                      id={`location-${location}`}
                      name={`location-${location}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedLocations.includes(location)}
                      onChange={() => toggleFilter(location, selectedLocations, setSelectedLocations)}
                    />
                    <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Count Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Count</h3>
              <div className="space-y-1">
                {orderRanges.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      id={`order-${index}`}
                      name={`order-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedOrderRanges.includes(index)}
                      onChange={() => toggleFilter(index, selectedOrderRanges, setSelectedOrderRanges)}
                    />
                    <label htmlFor={`order-${index}`} className="ml-2 text-sm text-gray-700">
                      {range.label}
                    </label>
                  </div>
                ))}
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customOrderRange.min}
                    onChange={(e) => setCustomOrderRange({ ...customOrderRange, min: e.target.value })}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customOrderRange.max}
                    onChange={(e) => setCustomOrderRange({ ...customOrderRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Total Spent Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Total Spent</h3>
              <div className="space-y-1">
                {spendingRanges.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      id={`spending-${index}`}
                      name={`spending-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedSpendingRanges.includes(index)}
                      onChange={() => toggleFilter(index, selectedSpendingRanges, setSelectedSpendingRanges)}
                    />
                    <label htmlFor={`spending-${index}`} className="ml-2 text-sm text-gray-700">
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
                    value={customSpendingRange.min}
                    onChange={(e) => setCustomSpendingRange({ ...customSpendingRange, min: e.target.value })}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max $"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customSpendingRange.max}
                    onChange={(e) => setCustomSpendingRange({ ...customSpendingRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Last Order Date Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Last Order</h3>
              <div className="space-y-1">
                {lastOrderPeriods.map((period, index) => (
                  <div key={period.label} className="flex items-center">
                    <input
                      id={`period-${index}`}
                      name={`period-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedLastOrderPeriods.includes(index)}
                      onChange={() => toggleFilter(index, selectedLastOrderPeriods, setSelectedLastOrderPeriods)}
                    />
                    <label htmlFor={`period-${index}`} className="ml-2 text-sm text-gray-700">
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
                {selectedTypes.map((type) => (
                  <div
                    key={`active-type-${type}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Type: {type}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedTypes(selectedTypes.filter((t) => t !== type))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedStatuses.map((status) => (
                  <div
                    key={`active-status-${status}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Status: {status}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedStatuses(selectedStatuses.filter((s) => s !== status))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedLocations.map((location) => (
                  <div
                    key={`active-location-${location}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Location: {location}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedLocations(selectedLocations.filter((l) => l !== location))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedOrderRanges.map((rangeIndex) => (
                  <div
                    key={`active-order-${rangeIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {orderRanges[rangeIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedOrderRanges(selectedOrderRanges.filter((r) => r !== rangeIndex))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedSpendingRanges.map((rangeIndex) => (
                  <div
                    key={`active-spending-${rangeIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {spendingRanges[rangeIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedSpendingRanges(selectedSpendingRanges.filter((r) => r !== rangeIndex))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedLastOrderPeriods.map((periodIndex) => (
                  <div
                    key={`active-period-${periodIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {lastOrderPeriods[periodIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() =>
                        setSelectedLastOrderPeriods(selectedLastOrderPeriods.filter((p) => p !== periodIndex))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(customOrderRange.min || customOrderRange.max) && (
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    Orders: {customOrderRange.min || "0"} - {customOrderRange.max || "∞"}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setCustomOrderRange({ min: "", max: "" })}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(customSpendingRange.min || customSpendingRange.max) && (
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    Spent: ${customSpendingRange.min || "0"} - ${customSpendingRange.max || "∞"}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setCustomSpendingRange({ min: "", max: "" })}
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
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Customer
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("orders")}
                >
                  <div className="flex items-center">
                    Orders
                    {sortField === "orders" &&
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
                  onClick={() => handleSort("totalSpent")}
                >
                  <div className="flex items-center">
                    Total Spent
                    {sortField === "totalSpent" &&
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
                  onClick={() => handleSort("lastOrder")}
                >
                  <div className="flex items-center">
                    Last Order
                    {sortField === "lastOrder" &&
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
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={`/placeholder.svg?height=40&width=40&text=${customer.name.charAt(0)}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: {customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{customer.orders}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "Never"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.status}
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
                <span className="font-medium">{filteredCustomers.length}</span> of{" "}
                <span className="font-medium">{filteredCustomers.length}</span> results
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

