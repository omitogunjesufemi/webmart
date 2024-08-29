/* eslint-disable react/prop-types */
import Checkout from "../../components/Checkout"
import Login from "../account/Login"

export default function CheckoutPage({isLoggedIn=false}) {
  return (
    <>
    {isLoggedIn ?
    (<>
        <Checkout />
    </>) 
    : 
    (<>
        <Login prevUrl="/checkout"/>
    </>)}
    </>
  )
}
