"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function ProductSort() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Featured")

  const options = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Selling"]

  return (
    <div className="relative">
      <button className="flex items-center gap-1 text-sm" onClick={() => setOpen(!open)}>
        Sort by: <span className="font-medium">{selected}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  selected === option ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={() => {
                  setSelected(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

