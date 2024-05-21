import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//USER
import HomePage from "./User/Home/HomePage.tsx";
import HomePageLoggedIn from "./User/HomeLoggedIn/HomePageLoggedIn.tsx";
import LoginPage from "./Login/LoginPage.tsx";
import SignUp from "./Login/SignUp.tsx";
import ShoppingCart from "./User/ShoppingCart/DetailProductPage.tsx";
import DetailProduct from "./User/DetailProduct/Product.tsx";
import Dress from "./User/Home/products/Dress/Dress.tsx";
import FavListContainer from "./User/favList/FavListContainer.tsx";
import SearchComponent from "./User/Search/SearchComponent.tsx";
import Profile from "./User/Profile/Profile.tsx";
import { ProductProvider } from "./User/ProductContext/ProductContext.tsx";
import CheckoutPage from "./User/Checkout/CheckoutPage.tsx";
import InformationPage from "./User/InformationPage/InformationPage.tsx";
import TrendsPage from "./User/Trends/Trends.tsx";
import AboutUs from "./User/AboutUs/AboutUs.tsx";
//ADMIN
import ProductList from "./Admin/AdminProductList/ProductList.tsx";
import AdminHome from "./Admin/AdminHome/AdminHome.tsx";
import AdminRoute from "./Admin/AdminRoute/AdminRoute.tsx";
import ProtectedRoute from "./Admin/AdminRoute/ProtectRule.tsx";
import OrderManagement from "./Admin/AdminProductList/ManageOrder.tsx";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ProductProvider>
      <div className="App font-literata">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              {/* USER */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePageLoggedIn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favourite"
                element={
                  <ProtectedRoute>
                    <FavListContainer />
                  </ProtectedRoute>
                }
              />
              {/* Product */}
              <Route path="/product/:productName" element={<DetailProduct />} />
              <Route path="/product/dress" element={<Dress />} />
              <Route
                path="/carts"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchComponent />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/information"
                element={
                  <ProtectedRoute>
                    <InformationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin */}
              <Route
                path="/update-product"
                element={
                  <AdminRoute>
                    <ProductList />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminHome />
                  </AdminRoute>
                }
              />

              <Route
                path="/order"
                element={
                  <AdminRoute>
                    <OrderManagement.OrderList />
                  </AdminRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <AdminRoute>
                    <OrderManagement.OrderDetails />
                  </AdminRoute>
                }
              />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Zoom}
          />
        </header>
      </div>
    </ProductProvider>
  );
}

export default App;
