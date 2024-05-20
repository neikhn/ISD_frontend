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
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearch, loadStoredSearchResults } = useProductContext();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const topMenuRef = useRef<HTMLUListElement | null>(null);
  const [showProductMenu, setShowProductMenu] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleToggleMenu = (e) => {
    const topMenu = document.getElementById("top-menu");
    const toggleTopMenuIcon = document.getElementById("toggle-top-menu-icon");
    if (toggleTopMenuIcon?.contains(e.target)) {
      topMenu?.classList.toggle("hidden");
      topMenu?.classList.toggle("ct-menu-top-header-expanded");
      toggleTopMenuIcon.classList.toggle("ct-menu-top-header-expanded");
    } else {
      if (topMenu?.classList.contains("ct-menu-top-header-expanded")) {
        topMenu.classList.remove("ct-menu-top-header-expanded");
        topMenu.classList.add("hidden");
        toggleTopMenuIcon?.classList.remove("ct-menu-top-header-expanded");
      }
    }
  };

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
            className={`basis-3/6 ${
              isActive ? "" : "hidden"
            } lg:flex lg:items-center lg:justify-center lg:gap-16 uppercase text-sm text-pinky-600 font-medium`}
          >
            <li
              className={`ct-menu-top-header ${
                activeMenuItem === "SHOP" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <a href="/home" onClick={() => handleMenuItemClick("home")}>
                SHOP
              </a>
            </li>
            <li
              className={`ct-menu-top-header relative ${
                activeMenuItem === "COLLECTION"
                  ? "ct-menu-top-header-active"
                  : ""
              }`}
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <div>Product</div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showProductMenu && (
                <ul className="absolute top-full left-0 w-[200px] bg-white shadow-lg rounded-lg z-50">
                  <li>
                    <NavLink
                      to="/add-product"
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
              className={`ct-menu-top-header ${
                activeMenuItem === "TRENDS" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <a href="#" onClick={() => handleMenuItemClick("jackets")}>
                Order
              </a>
            </li>
            <li
              className={`ct-menu-top-header ${
                activeMenuItem === "ABOUT US" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <a href="#" onClick={() => handleMenuItemClick("jeans")}>
                ABOUT US
              </a>
            </li>
          </ul>

          <div className="search-box flex basis-3/6 lg:basis-2/6 ml-10">
            <form
              className="searchform-product relative w-full lg:w-[90%] lg:ml-5 h-10 border-2 rounded-full border-pinky-600 border-solid text-pinky-600 bg-slate-100"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
            >
              <button
                type="button"
                className="iconSearch absolute padding-0 top-1 left-0 bottom-0 w-[55px] transition-opacity"
              >
                <FontAwesomeIcon
                  className="mr-5 p-1"
                  icon={faMagnifyingGlass}
                />
              </button>
              <div className="search-inner ml-10">
                <input
                  id="inputSearchAuto-3"
                  className="visible outline-none absolute w-[50%] top-[6px] bg-slate-100"
                  name="q"
                  autoComplete="off"
                  type="text"
                  placeholder="Search ..."
                  onKeyDown={handleKeyPress}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>

          <div className="basis-1/6 flex flex-row justify-center items-center gap-10 ml-10">
            <a href="/favourite" className="w-6 h-6 text-black">
              <FontAwesomeIcon icon={farHeart} />
            </a>
            <a href="/carts" className="w-6 h-6 text-black relative">
              <FontAwesomeIcon
                className="before:absolute before:top-5 before:w-5 before:h-5 before:bg-red-600 before:z-50"
                icon={faPaperPlane}
              />
            </a>
            <a href="/profile" className="lg:block hidden w-6 h-6 text-black">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>

          <div
            className="basis-1/6 lg:hidden text-black flex justify-evenly items-center cursor-pointer px-3 sm:px-8"
            onClick={handleToggleMenu}
          >
            <svg
              id="toggle-top-menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="lmt-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HomeHeader;
