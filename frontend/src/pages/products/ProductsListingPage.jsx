import { useParams } from "react-router-dom";
import ProductListing from "../../components/ProductListing"

export default function ProductsListingPage() {
  let {category} = useParams();
  return (
    <>
    <ProductListing isHome={false} category={category} />
    </>
  )
}
