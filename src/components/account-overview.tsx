export function AccountOverview() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "January 2023",
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <p className="text-sm text-gray-500">Name:</p>
            <p className="text-sm">{user.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="text-sm text-gray-500">Email:</p>
            <p className="text-sm">{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="text-sm text-gray-500">Member since:</p>
            <p className="text-sm">{user.joined}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900">
            Edit Profile
          </button>
          <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Change Password
          </button>
        </div>
      </div>
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
        <div className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Order #12345</p>
                <p className="text-xs text-gray-500">Placed on March 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$120.96</p>
                <p className="text-xs text-gray-500">3 items</p>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Delivered
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="text-sm text-gray-600 hover:text-gray-900">View Order</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Buy Again</button>
            </div>
          </div>
          <div className="rounded-md border p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Order #12344</p>
                <p className="text-xs text-gray-500">Placed on February 28, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$85.50</p>
                <p className="text-xs text-gray-500">2 items</p>
              </div>
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Delivered
              </span>
            </div>
            <div className="mt-4 flex justify-between">
              <button className="text-sm text-gray-600 hover:text-gray-900">View Order</button>
              <button className="text-sm text-gray-600 hover:text-gray-900">Buy Again</button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-sm text-gray-600 hover:text-gray-900">View All Orders</button>
        </div>
      </div>
    </div>
  )
}

