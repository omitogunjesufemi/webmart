export default function ProductCard() {
  return (
    <section>
        <div className="card bg-base-100 w-25 shadow">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">Category</div>
                </h2>
                <p>$ 100.10</p>
                <div className="card-actions justify-left">
                </div>
            </div>
        </div>
    </section>
  )
}
