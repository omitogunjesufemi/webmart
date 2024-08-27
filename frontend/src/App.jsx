import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/products/CategoriesPage";
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import ProductDetail from "./pages/products/ProductDetail";
import ProductListing from "./components/ProductListing";
import OrderSummary from "./pages/orders/OrderSummary";
import ShoppingCart from "./pages/orders/ShoppingCart";
import CheckoutPage from "./pages/orders/CheckoutPage";
import ErrorPage from "./pages/error/ErrorPage";
// import OrdersOverview from "./pages/orders/OrdersOverview";
import OrderReview from "./pages/orders/OrderReview";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />

        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductListing />} />

        <Route path="/cart/" element={<ShoppingCart />} />
        <Route path="/checkout/" element={<CheckoutPage />} />
        <Route path="/confirm-payment" element={<OrderSummary />} />
        <Route path="/orders/:id" element={<OrderReview />} />
        {/* <Route path="/orders" element={<OrdersOverview />} /> */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}
