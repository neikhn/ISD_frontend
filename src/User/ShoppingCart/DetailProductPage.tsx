import React from "react";
import HomeHeader from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";
import ProductCart from "./Cart/ProductCart.tsx";


class DetailProductPage extends React.Component {
  render() {
    return (
      <>
        <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
          <HomeHeader />
          <ProductCart />
          <Footer />
        </div>
      </>
    );
  }
}

export default DetailProductPage;
