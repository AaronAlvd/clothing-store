"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"

export function CartItems() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      quantity: 2,
      size: "M",
      color: "White",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "3",
      name: "Casual Hoodie",
      price: 49.99,
      quantity: 1,
      size: "L",
      color: "Black",
      image: "/placeholder.svg?height=400&width=400",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-lg font-medium mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Cart Items</h2>
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 last:pb-0">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">
                        <Link href={`/products/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="h-8 w-12 border-y border-gray-300 text-center"
                      />
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

