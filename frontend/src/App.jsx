import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/products/CategoriesPage";
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import ProductDetail from "./pages/products/ProductDetail";
import PaymentPage from "./pages/orders/PaymentPage";
import ErrorPage from "./pages/error/ErrorPage";
import OrdersOverview from "./pages/orders/OrdersOverview";
import OrderReview from "./pages/orders/OrderReview";
import ProductsListingPage from "./pages/products/ProductsListingPage";
import CartPage from "./pages/orders/CartPage";
import CheckoutPage from "./pages/orders/CheckoutPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('USR_EMAIL') ? true : false);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn}/>}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />

        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsListingPage />} />

        <Route path="/cart" element={<CartPage isLoggedIn={isLoggedIn}/>} />
        <Route path="/checkout" element={<CheckoutPage isLoggedIn={isLoggedIn}/>} />
        <Route path="/confirm-payment" element={<PaymentPage isLoggedIn={isLoggedIn}/>} />
        <Route path="/orders/:id" element={<OrderReview />} />
        <Route path="/orders" element={<OrdersOverview />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<HomePage logoutBl={true} />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}
