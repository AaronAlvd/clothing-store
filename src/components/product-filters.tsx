"use client"

import { useState } from "react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="category-all" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-all" className="ml-2 text-sm">
              All
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="category-tshirts" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-tshirts" className="ml-2 text-sm">
              T-Shirts
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="category-jeans" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-jeans" className="ml-2 text-sm">
              Jeans
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="category-hoodies" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-hoodies" className="ml-2 text-sm">
              Hoodies & Sweatshirts
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="category-dresses" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-dresses" className="ml-2 text-sm">
              Dresses
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="category-jackets" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="category-jackets" className="ml-2 text-sm">
              Jackets
            </label>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Size</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="size-xs" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="size-xs" className="ml-2 text-sm">
              XS
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="size-s" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="size-s" className="ml-2 text-sm">
              S
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="size-m" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="size-m" className="ml-2 text-sm">
              M
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="size-l" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="size-l" className="ml-2 text-sm">
              L
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="size-xl" className="h-4 w-4 rounded border-gray-300" />
            <label htmlFor="size-xl" className="ml-2 text-sm">
              XL
            </label>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          <button className="h-8 w-8 rounded-full bg-black border border-gray-300" title="Black"></button>
          <button className="h-8 w-8 rounded-full bg-white border border-gray-300" title="White"></button>
          <button className="h-8 w-8 rounded-full bg-gray-500 border border-gray-300" title="Gray"></button>
          <button className="h-8 w-8 rounded-full bg-red-500 border border-gray-300" title="Red"></button>
          <button className="h-8 w-8 rounded-full bg-blue-500 border border-gray-300" title="Blue"></button>
          <button className="h-8 w-8 rounded-full bg-green-500 border border-gray-300" title="Green"></button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="min-price" className="sr-only">
                Minimum Price
              </label>
              <input
                type="number"
                id="min-price"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="max-price" className="sr-only">
                Maximum Price
              </label>
              <input
                type="number"
                id="max-price"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900">
        Apply Filters
      </button>
    </div>
  )
}

