import { AccountNav } from "@/components/account-nav"
import { AccountOverview } from "@/components/account-overview"

export default function AccountPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <AccountNav />
        </div>
        <div className="md:col-span-3">
          <AccountOverview />
        </div>
      </div>
    </div>
  )
}

