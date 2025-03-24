import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=600&width=1200" alt="Hero image" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">New Summer Collection</h1>
              <p className="text-white/90 md:text-xl">
                Discover the latest trends and styles for the season. Refresh your wardrobe with our new arrivals.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/products"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200"
                >
                  Shop Now
                </Link>
                <Link
                  href="/products?category=new"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

