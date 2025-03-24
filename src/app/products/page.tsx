import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-gray-500">Browse our collection of stylish clothing and accessories</p>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <ProductFilters />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">Showing 24 of 100 products</p>
              <ProductSort />
            </div>
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  )
}

