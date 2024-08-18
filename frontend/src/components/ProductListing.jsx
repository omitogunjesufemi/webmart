import ProductCard from "./ProductCard"

ProductCard

export default function ProductListing() {
  return (
    <section className="bg-base-50 px-4 py-10">
        <div className="container-xl lg: container m-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Browse Products</h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 gap-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    </section>
  )
}
