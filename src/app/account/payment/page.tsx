import { AccountNav } from "@/components/account-nav"
import { PaymentMethods } from "@/components/payment-methods"

export default function PaymentPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Payment Methods</h1>
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <AccountNav />
        </div>
        <div className="md:col-span-3">
          <PaymentMethods />
        </div>
      </div>
    </div>
  )
}

