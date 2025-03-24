"use client"

import { useState } from "react"
import { Heart, Share2, Star } from "lucide-react"

export function ProductInfo({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const product = {
    name: "Classic T-Shirt",
    price: 29.99,
    description: "A comfortable and versatile t-shirt made from 100% cotton. Perfect for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "bg-black" },
      { name: "White", value: "bg-white border border-gray-300" },
      { name: "Gray", value: "bg-gray-500" },
      { name: "Blue", value: "bg-blue-500" },
    ],
    rating: 4.5,
    reviews: 128,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="mt-1 flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="mt-1 text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
      </div>
      <div>
        <h2 className="text-sm font-medium">Color</h2>
        <div className="mt-2 flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`h-8 w-8 rounded-full ${color.value} ${
                selectedColor === color.name ? "ring-2 ring-black ring-offset-2" : ""
              }`}
              onClick={() => setSelectedColor(color.name)}
              title={color.name}
            ></button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium">Size</h2>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`rounded-md border py-2 text-sm ${
                selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium">Quantity</h2>
        <div className="mt-2 flex items-center">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            className="h-8 w-12 border-y border-gray-300 text-center"
          />
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button className="flex-1 rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-900">
          Add to Cart
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50">
          <Heart size={20} />
          <span className="sr-only">Add to Wishlist</span>
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50">
          <Share2 size={20} />
          <span className="sr-only">Share</span>
        </button>
      </div>
      <div>
        <h2 className="text-lg font-medium">Description</h2>
        <div className="mt-4 prose prose-sm">
          <p>{product.description}</p>
          <ul className="list-disc pl-5 mt-4">
            <li>100% cotton material</li>
            <li>Ribbed crew neck</li>
            <li>Short sleeves</li>
            <li>Regular fit</li>
            <li>Machine washable</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

