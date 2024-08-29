/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({isLoggedIn = false}) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Outlet />
      <Footer />
    </>
  )
}
