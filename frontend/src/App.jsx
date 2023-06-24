import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ResetPasswordConfirm from "./Components/ResetPasswordConfirm";
import Activate from "./Components/Activate";
import PlaceholderPage from "./Components/PlaceholderPage";
import CustomerListPage from "./components/CustomerListPage";
import CartPage from "./Components/CartPage";
import OrdersPage from "./Components/OrdersPage";
import ProfilePage from "./Components/ProfilePage";
import ListPage from "./Components/ListPage";
import AdminDashboardPage from "./admin/Pages/AdminDashboardPage";
import AdminProductsPage from "./admin/Pages/AdminProductsPage";
import AdminAddProductPage from "./admin/Pages/AdminAddProductPage";
import AdminCommentsPage from "./admin/Pages/AdminCommentsPage";
import AdminOrdersPage from "./admin/Pages/AdminOrdersPage";
import AdminInvoicesPage from "./admin/Pages/AdminInvoicesPage";
import SedanCarPage from "./Components/SedanCarPage";
import HatchbackCarPage from "./Components/HatchbackCarPage";
import SuvCarPage from "./Components/SuvCarPage";
import Car from "./Components/Car";
import ProductPage from "./Components/ProductPage";
import SearchPage from "./Components/SearchPage";
import CategoriesPage from "./Components/CategoriesPage";
import ShoppingCartPage from "./Components/ShoppingCartPage";
import Payment from "./Components/Payment";

import { Provider } from "react-redux";
import store from "./helpers/store";
import Layout from "./Components/Layout";
import CartProvider from "./constants/CartContext";
import WishList from "./Components/WishList";
import AdminCategories from "./admin/Pages/AdminCategoriesPage";
import AdminPriceDiscountPage from "./admin/Pages/AdminPriceDiscountPage";
import Notifications from "./Components/Notifications";
import AdminRequestsPage from "./admin/Pages/AdminRequestsPage";

function App() {

  return (
    <CartProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
          <Routes>
            <Route exact path="/" element={<PlaceholderPage />} />
            <Route exact path="/home" element={<PlaceholderPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route exact path="/activate/:uid/:token" element={<Activate />} />
            <Route exact path="/customerslistpage" element={<CustomerListPage />} />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/hatchbackcarpage" element={<HatchbackCarPage />} />
            <Route exact path="/suvcarpage" element={<SuvCarPage />} />
            <Route exact path="/sedancarpage" element={<SedanCarPage />} />
            <Route exact path="/sedancarpage/:pk_and_pname" element={<Car />} />
            <Route exact path="/hatchbackcarpage/:pk_and_pname" element={<Car />} />
            <Route exact path="/suvcarpage/:pk_and_pname" element={<Car />} />
            <Route exact path="/shoppingcartpage" element={<ShoppingCartPage />} />
            <Route exact path="/orders" element={<OrdersPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/listpage" element={<ListPage />} />
            <Route exact path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route exact path="/admin/products" element={<AdminProductsPage />} />
            <Route exact path="/admin/add-product" element={<AdminAddProductPage />} />
            <Route exact path="/admin/products/:pk_and_pname" element={<AdminPriceDiscountPage />} />
            <Route exact path="/admin/categories" element={<AdminCategories />} />
            <Route exact path="/admin/comments" element={<AdminCommentsPage />} />
            <Route exact path="/admin/orders" element={<AdminOrdersPage />} />
            <Route exact path="/admin/invoices" element={<AdminInvoicesPage />} />
            <Route exact path="/admin/requests" element={<AdminRequestsPage/>} />
            <Route exact path="/cartpage" element={<CartPage />} />
            <Route exact path="/productpage" element={<ProductPage />} />
            <Route exact path="/orderspage" element={<OrdersPage />} />
            <Route exact path="/searchpage" element={<SearchPage />} />
            <Route exact path="/categoriespage" element={<CategoriesPage />} />
            <Route exact path="/paymentpage" element={<Payment />} />
            <Route exact path="/wishlist" element={<WishList />} />
            <Route exact path="/notifications" element={<Notifications />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </CartProvider>
  );
}

export default App;