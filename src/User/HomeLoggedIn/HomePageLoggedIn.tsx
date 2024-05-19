import React, { useRef } from "react";
import HeaderLogin from "./HeaderLogin/HeaderLogin.tsx";
import HomeVideoStory from "./HomeStory/HomeVideoStory.tsx";
import HomeSlider from "../Home/slider/HomeSlider.tsx";
import FeatureProducts from "../Home/special/FeatureProducts.tsx";
import Products from "../Home/products/Products.tsx";
import Parallax from "../Home/parallax/Parallax.tsx";
import Subcribe from "../Home/subcribes/Subcribe.tsx";
import Footer from "../Home/footer/Footer.tsx";

function HomePageLoggedIn() {
  const slideRef = useRef(null);
  return (
    <>
      <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
        <HeaderLogin />
        <HomeVideoStory />
        <HomeSlider slideRef={slideRef} />
        <FeatureProducts />
        <Products />
        <Parallax />
        <Subcribe />
        <Footer />
      </div>
    </>
  );
}
export default HomePageLoggedIn;
