import Link from "next/link"
import Image from "next/image"

export function FeaturedProducts() {
  const products = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "3",
      name: "Casual Hoodie",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "4",
      name: "Summer Dress",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group">
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="mt-1 text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

