import Link from "next/link"
import Image from "next/image"

export function OrderSummary() {
  const items = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "3",
      name: "Casual Hoodie",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const summary = {
    subtotal: 109.97,
    shipping: 0,
    tax: 10.99,
    total: 120.96,
  }

  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
        <div className="max-h-80 overflow-auto mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 first:pt-0 border-b last:border-0">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  {item.quantity}
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm font-medium">${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Shipping</span>
            <span className="text-sm font-medium">
              {summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Tax</span>
            <span className="text-sm font-medium">${summary.tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4 flex justify-between">
            <span className="text-base font-medium">Total</span>
            <span className="text-base font-medium">${summary.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-900 flex items-center justify-center"
          >
            Complete Order
          </button>
          <Link
            href="/cart"
            className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-center"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

