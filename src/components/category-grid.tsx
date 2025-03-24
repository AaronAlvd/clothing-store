import Link from "next/link"
import Image from "next/image"

export function CategoryGrid() {
  const categories = [
    {
      name: "Men",
      image: "/placeholder.svg?height=300&width=300",
      href: "/products?category=men",
    },
    {
      name: "Women",
      image: "/placeholder.svg?height=300&width=300",
      href: "/products?category=women",
    },
    {
      name: "Accessories",
      image: "/placeholder.svg?height=300&width=300",
      href: "/products?category=accessories",
    },
    {
      name: "Sale",
      image: "/placeholder.svg?height=300&width=300",
      href: "/products?category=sale",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
      {categories.map((category) => (
        <Link key={category.name} href={category.href} className="group relative overflow-hidden rounded-lg">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-medium text-white">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

