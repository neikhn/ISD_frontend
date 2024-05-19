import React from "react";
import HomeHeader from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";
import FavListProduct from "./FavListProduct.tsx";


class FavListContainer extends React.Component {
  render() {
    return (
      <>
        <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
          <HomeHeader />
          <FavListProduct products={[]} />
          <Footer />
        </div>
      </>
    );
  }
}

export default FavListContainer;
