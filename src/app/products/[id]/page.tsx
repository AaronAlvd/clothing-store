import Link from "next/link"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700">Classic T-Shirt</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery />
        <ProductInfo id={params.id} />
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <RelatedProducts />
      </div>
    </div>
  )
}

