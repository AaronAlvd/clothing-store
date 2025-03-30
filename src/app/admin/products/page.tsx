"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Filter, Plus, Search, Trash2, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    category: "T-Shirts",
    price: 29.99,
    inventory: 125,
    status: "Active",
    size: ["S", "M", "L", "XL"],
    color: "White",
    tags: ["Essential", "Bestseller"],
    dateAdded: "2023-05-10",
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    category: "Pants",
    price: 59.99,
    inventory: 89,
    status: "Active",
    size: ["30", "32", "34", "36"],
    color: "Blue",
    tags: ["Denim", "Casual"],
    dateAdded: "2023-05-15",
  },
  {
    id: "3",
    name: "Wool Sweater",
    category: "Sweaters",
    price: 79.99,
    inventory: 45,
    status: "Active",
    size: ["M", "L", "XL"],
    color: "Gray",
    tags: ["Winter", "Warm"],
    dateAdded: "2023-04-20",
  },
  {
    id: "4",
    name: "Leather Jacket",
    category: "Outerwear",
    price: 199.99,
    inventory: 12,
    status: "Low Stock",
    size: ["S", "M", "L"],
    color: "Black",
    tags: ["Premium", "Trending"],
    dateAdded: "2023-03-15",
  },
  {
    id: "5",
    name: "Cotton Socks (3-Pack)",
    category: "Accessories",
    price: 12.99,
    inventory: 230,
    status: "Active",
    size: ["One Size"],
    color: "Mixed",
    tags: ["Basics", "Essentials"],
    dateAdded: "2023-06-01",
  },
  {
    id: "6",
    name: "Summer Dress",
    category: "Dresses",
    price: 49.99,
    inventory: 0,
    status: "Out of Stock",
    size: ["XS", "S", "M"],
    color: "Floral",
    tags: ["Summer", "Casual"],
    dateAdded: "2023-04-10",
  },
  {
    id: "7",
    name: "Winter Coat",
    category: "Outerwear",
    price: 149.99,
    inventory: 35,
    status: "Active",
    size: ["M", "L", "XL", "XXL"],
    color: "Navy",
    tags: ["Winter", "Warm"],
    dateAdded: "2023-02-20",
  },
  {
    id: "8",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    inventory: 67,
    status: "Active",
    size: ["7", "8", "9", "10", "11"],
    color: "Black/Red",
    tags: ["Sports", "Athletic"],
    dateAdded: "2023-05-25",
  },
  {
    id: "9",
    name: "Beanie Hat",
    category: "Accessories",
    price: 19.99,
    inventory: 5,
    status: "Low Stock",
    size: ["One Size"],
    color: "Red",
    tags: ["Winter", "Accessories"],
    dateAdded: "2023-03-05",
  },
  {
    id: "10",
    name: "Formal Shirt",
    category: "Shirts",
    price: 69.99,
    inventory: 42,
    status: "Active",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Blue",
    tags: ["Formal", "Business"],
    dateAdded: "2023-04-15",
  },
]

// Available filter options
const categories = ["T-Shirts", "Shirts", "Pants", "Dresses", "Sweaters", "Outerwear", "Accessories", "Footwear"]

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "7", "8", "9", "10", "11", "30", "32", "34", "36"]

const colors = [
  { name: "White", hex: "#FFFFFF", border: true },
  { name: "Black", hex: "#000000" },
  { name: "Gray", hex: "#808080" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00", border: true },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB", border: true },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Mixed", hex: "linear-gradient(45deg, #FF0000, #0000FF, #008000, #FFFF00)" },
]

const tags = [
  "Bestseller",
  "New Arrival",
  "Sale",
  "Trending",
  "Essential",
  "Basics",
  "Premium",
  "Casual",
  "Formal",
  "Business",
  "Sports",
  "Athletic",
  "Winter",
  "Summer",
  "Denim",
]

const priceRanges = [
  { label: "Under $25", min: 0, max: 24.99 },
  { label: "$25 - $49.99", min: 25, max: 49.99 },
  { label: "$50 - $99.99", min: 50, max: 99.99 },
  { label: "$100 - $199.99", min: 100, max: 199.99 },
  { label: "$200 and above", min: 200, max: Number.POSITIVE_INFINITY },
]

const statusOptions = ["Active", "Low Stock", "Out of Stock"]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Filter states
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([])
  const [customPriceRange, setCustomPriceRange] = useState<{ min: string; max: string }>({ min: "", max: "" })

  // Active filters count
  const activeFiltersCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    selectedTags.length +
    selectedStatus.length +
    selectedPriceRanges.length +
    (customPriceRange.min || customPriceRange.max ? 1 : 0)

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
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedTags([])
    setSelectedStatus([])
    setSelectedPriceRanges([])
    setCustomPriceRange({ min: "", max: "" })
  }

  // Apply custom price range
  const applyCustomPriceRange = () => {
    const min = customPriceRange.min ? Number.parseFloat(customPriceRange.min) : 0
    const max = customPriceRange.max ? Number.parseFloat(customPriceRange.max) : Number.POSITIVE_INFINITY

    // Filter products by the custom price range
    return (product: any) => {
      if (!customPriceRange.min && !customPriceRange.max) return true
      return product.price >= min && product.price <= max
    }
  }

  // Get filtered and sorted products
  const filteredProducts = products
    .filter((product) => {
      // Search query filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      // Size filter
      const matchesSize = selectedSizes.length === 0 || product.size.some((size) => selectedSizes.includes(size))

      // Color filter
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)

      // Tag filter
      const matchesTags = selectedTags.length === 0 || product.tags.some((tag) => selectedTags.includes(tag))

      // Status filter
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(product.status)

      // Price range filter (predefined ranges)
      const matchesPriceRange =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((rangeIndex) => {
          const range = priceRanges[rangeIndex]
          return product.price >= range.min && product.price <= range.max
        })

      // Custom price range filter
      const matchesCustomPriceRange = applyCustomPriceRange()(product)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesColor &&
        matchesTags &&
        matchesStatus &&
        matchesPriceRange &&
        matchesCustomPriceRange
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

  // Handle select all products
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Handle select individual product
  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  // Handle delete confirmation
  const confirmDelete = (id: string | null = null) => {
    if (id) {
      setProductToDelete(id)
    }
    setShowDeleteModal(true)
  }

  // Handle delete products
  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
    } else if (selectedProducts.length > 0) {
      setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
      setSelectedProducts([])
    }
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product inventory</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
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
            placeholder="Search products..."
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

          {selectedProducts.length > 0 && (
            <button
              type="button"
              onClick={() => confirmDelete()}
              className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected ({selectedProducts.length})
            </button>
          )}
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name={`category-${category}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm ${
                      selectedSizes.includes(size)
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`group relative inline-flex items-center justify-center rounded-md border p-1 ${
                      selectedColors.includes(color.name) ? "border-blue-500" : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)}
                    title={color.name}
                  >
                    <span
                      className={`block h-6 w-6 rounded-sm ${color.border ? "border border-gray-200" : ""}`}
                      style={{
                        background: color.hex,
                      }}
                    ></span>
                    {selectedColors.includes(color.name) && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-white drop-shadow-md"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price</h3>
              <div className="space-y-1">
                {priceRanges.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <input
                      id={`price-${index}`}
                      name={`price-${index}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedPriceRanges.includes(index)}
                      onChange={() => toggleFilter(index, selectedPriceRanges, setSelectedPriceRanges)}
                    />
                    <label htmlFor={`price-${index}`} className="ml-2 text-sm text-gray-700">
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
                    value={customPriceRange.min}
                    onChange={(e) => setCustomPriceRange({ ...customPriceRange, min: e.target.value })}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    value={customPriceRange.max}
                    onChange={(e) => setCustomPriceRange({ ...customPriceRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <div className="space-y-1">
                {statusOptions.map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      id={`status-${status}`}
                      name={`status-${status}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedStatus.includes(status)}
                      onChange={() => toggleFilter(status, selectedStatus, setSelectedStatus)}
                    />
                    <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs ${
                      selectedTags.includes(tag)
                        ? "bg-blue-50 text-blue-700 border-blue-300"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => toggleFilter(tag, selectedTags, setSelectedTags)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <div
                    key={`active-category-${category}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {category}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedSizes.map((size) => (
                  <div
                    key={`active-size-${size}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Size: {size}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedSizes(selectedSizes.filter((s) => s !== size))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedColors.map((color) => (
                  <div
                    key={`active-color-${color}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Color: {color}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedColors(selectedColors.filter((c) => c !== color))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedTags.map((tag) => (
                  <div
                    key={`active-tag-${tag}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Tag: {tag}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedStatus.map((status) => (
                  <div
                    key={`active-status-${status}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    Status: {status}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedStatus(selectedStatus.filter((s) => s !== status))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedPriceRanges.map((rangeIndex) => (
                  <div
                    key={`active-price-${rangeIndex}`}
                    className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {priceRanges[rangeIndex].label}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== rangeIndex))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(customPriceRange.min || customPriceRange.max) && (
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    Price: {customPriceRange.min || "0"} - {customPriceRange.max || "∞"}
                    <button
                      type="button"
                      className="ml-1.5 text-blue-500 hover:text-blue-700"
                      onClick={() => setCustomPriceRange({ min: "", max: "" })}
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
                <th scope="col" className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Product Name
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
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {sortField === "category" &&
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
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    {sortField === "price" &&
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
                  onClick={() => handleSort("inventory")}
                >
                  <div className="flex items-center">
                    Inventory
                    {sortField === "inventory" &&
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
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
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.inventory}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <button onClick={() => confirmDelete(product.id)} className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredProducts.length}</span> of{" "}
                <span className="font-medium">{filteredProducts.length}</span> results
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Delete Product</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {productToDelete
                          ? "Are you sure you want to delete this product? This action cannot be undone."
                          : `Are you sure you want to delete ${selectedProducts.length} selected products? This action cannot be undone.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false)
                    setProductToDelete(null)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

