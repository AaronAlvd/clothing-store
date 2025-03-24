import Link from "next/link"

export function CartSummary() {
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
          <Link
            href="/checkout"
            className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-900 flex items-center justify-center"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="mt-4 w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50 flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

