import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//USER
import HomePage from "./User/Home/HomePage.tsx";
import HomePageLoggedIn from "./User/HomeLoggedIn/HomePageLoggedIn.tsx";
import LoginPage from "./Login/LoginPage.tsx";
import SignUp from "./Login/SignUp.tsx";
import ShoppingCart from "./User/ShoppingCart/DetailProductPage.tsx";
import DetailProduct from "./User/DetailProduct/Product.tsx";
import FavListContainer from "./User/favList/FavListContainer.tsx";
import SearchComponent from "./User/Search/SearchComponent.tsx";
import Profile from "./User/Profile/Profile.tsx";
import { ProductProvider } from "./User/ProductContext/ProductContext.tsx";
import CheckoutPage from "./User/Checkout/CheckoutPage.tsx";
import InformationPage from "./User/InformationPage/InformationPage.tsx";

//ADMIN
import ProductList from "./Admin/AdminProductList/ProductList.tsx";
import AdminHome from "./Admin/AdminHome/AdminHome.tsx";

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
              <Route path="/home" element={<HomePageLoggedIn />} />
              <Route path="/favourite" element={<FavListContainer />} />
              <Route path="/product/:productName" element={<DetailProduct />} />
              <Route path="/carts" element={<ShoppingCart />} />
              <Route path="/search" element={<SearchComponent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/information" element={<InformationPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Admin */}
              <Route path="/update-product" element={<ProductList />} />
              <Route path="/admin" element={<AdminHome />} />
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
