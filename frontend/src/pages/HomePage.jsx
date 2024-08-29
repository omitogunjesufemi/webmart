/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Hero from "../components/Hero";
import ProductListing from "../components/ProductListing";

export default function HomePage({logoutBl=false}) {
  const logout = () => {
    localStorage.removeItem('AUTH_API');
    localStorage.removeItem('USR_FNAME');
    localStorage.removeItem('USR_LNAME');
    localStorage.removeItem('USR_EMAIL');
  }

  if (logoutBl) {
    logout();
  }

  return (
    <>
      {logoutBl ? 
        <Navigate to="/" /> : (<>
        <Hero />
        <ProductListing isHome={true}/>
      </>)}
    </>
  )
}
