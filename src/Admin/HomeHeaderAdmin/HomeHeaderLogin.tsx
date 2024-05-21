/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "../../User/ProductContext/ProductContext.tsx";
import {
  faHeart as farHeart,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  viewer: string;
  onSale?: boolean;
  priceOnSale: number;
  quantity?: number;
  isfavourite?: boolean;
}

const HomeHeader = () => {
  const [isActive] = useState(false);
  const { loadStoredSearchResults } = useProductContext();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const topMenuRef = useRef<HTMLUListElement | null>(null);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
  };

  useEffect(() => {
    loadStoredSearchResults();
  }, []);

  return (
    <>
      <header className="p-10 mx-auto my-[-10px] z-[99999] !fixed">
        <nav className="flex flex-row justify-between items-center fixed top-0 left-0 w-full h-[10%] z-50 bg-pinky-200">
          <NavLink
            className="logo flex-1 basis-1/6 p-5 lg:p-0 text-center text-pinky-600 cursor-pointer"
            to={"/home"}
          >
            <h3 className="text-xl lg:text-2xl font-bold">Melanie</h3>
            <div className="flex flex-row items-center justify-center">
              <div className="subheadline-deco-line"></div>
              <div className="lg:block hidden lg:text-[10px]">
                More Products
              </div>
              <div className="subheadline-deco-line"></div>
            </div>
          </NavLink>
          <ul
            id="top-menu"
            ref={topMenuRef}
            className={`basis-5/6 ${
              isActive ? "" : "hidden"
            } lg:flex lg:items-center lg:justify-center lg:gap-16 uppercase text-sm text-pinky-600 font-medium`}
          >
            <li
              className={`ct-menu-top-header relative ${
                activeMenuItem === "PRODUCT" ? "ct-menu-top-header-active" : ""
              }`}
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <div>PRODUCT</div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showProductMenu && (
                <ul className="absolute top-full left-0 w-[200px] bg-white shadow-lg rounded-lg z-50">
                  <li>
                    <NavLink
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/update-product"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Update Product
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li
              className={`ct-menu-top-header relative ${
                activeMenuItem === "ORDER" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <NavLink to="/order">
                  <div>ORDER</div>
                </NavLink>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default HomeHeader;
