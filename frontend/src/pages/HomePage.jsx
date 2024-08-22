import Hero from "../components/Hero";
import ProductListing from "../components/ProductListing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductListing isHome={true}/>
    </>
  )
}
