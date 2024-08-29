/* eslint-disable react/prop-types */
import ShoppingCart from "../../components/ShoppingCart";
import Login from "../account/Login";

export default function CartPage({isLoggedIn = false}) {
  return (
    <>
        {isLoggedIn ?
        (<>
            <ShoppingCart />
        </>) 
        : 
        (<>
            <Login prevUrl="/cart"/>
        </>)}
    </>
  )
}
