export function OrderHistory() {
  const orders = [
    {
      id: "12345",
      date: "March 15, 2023",
      total: 120.96,
      items: 3,
      status: "Delivered",
    },
    {
      id: "12344",
      date: "February 28, 2023",
      total: 85.5,
      items: 2,
      status: "Delivered",
    },
    {
      id: "12343",
      date: "January 12, 2023",
      total: 210.75,
      items: 4,
      status: "Delivered",
    },
    {
      id: "12342",
      date: "December 5, 2022",
      total: 45.99,
      items: 1,
      status: "Delivered",
    },
  ]

  return (
    <div className="rounded-lg border">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Order History</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-md border p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{order.items} items</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="text-sm text-gray-600 hover:text-gray-900">View Order</button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Buy Again</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

