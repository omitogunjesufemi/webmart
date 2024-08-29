/* eslint-disable react/prop-types */
import Login from "../account/Login";
import OrderSummary from "./OrderSummary";

export default function PaymentPage({isLoggedIn=false}) {
  return (
    <>
        {isLoggedIn ?
        (<>
            <OrderSummary />
        </>) 
        : 
        (<>
            <Login prevUrl="/confirm-payment"/>
        </>)}
    </>
  )
}
