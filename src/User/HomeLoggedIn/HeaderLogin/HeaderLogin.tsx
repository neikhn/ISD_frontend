/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
// import useLocalStorage from "../../useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "../../ProductContext/ProductContext.tsx";

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

interface State {
  products: Product[];
  showMore: boolean;
}

const HomeHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearch, loadStoredSearchResults } = useProductContext();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const topMenuRef = useRef<HTMLUListElement | null>(null);
  const [showProductMenu, setShowProductMenu] = useState(false);

  // const [showProductList, setShowProductList] = useState(false);
  // const [displayLimit, setDisplayLimit] = useState(5);

  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     name: "Image-1",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_3t/548.jpg",
  //     price: 60.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: true,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 2,
  //     name: "Image-2",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_3t/15250.jpg",
  //     price: 50.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "Image-3",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_3t/6629.jpeg",
  //     price: 50.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 0,
  //   },
  //   {
  //     id: 4,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: true,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 5,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 6,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: true,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 7,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 8,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 70.0,
  //   },
  //   {
  //     id: 9,
  //     name: "Image-4",
  //     url: "https://4kwallpapers.com/images/walls/thumbs_2t/5391.jpeg",
  //     price: 80.0,
  //     viewer: "(4.1k) Customer Reviews",
  //     onSale: false,
  //     priceOnSale: 70.0,
  //   },
  // ]);

  // const filteredProducts = products
  //   .filter((product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .slice(0, displayLimit);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // setDisplayLimit(5);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(`Navigating to /search?query=${searchTerm}`); // Debug
      handleSearch(searchTerm);
      navigate(`/search?query=${searchTerm}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isActive &&
        topMenuRef.current &&
        !topMenuRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };
    const handleTouchOutside = (event: TouchEvent) => {
      if (
        isActive &&
        topMenuRef.current &&
        !topMenuRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [isActive]);

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

  // const ProductList = () => {
  //   const navigate = useNavigate();

  //   const handleClick = (productId) => {
  //     const product = products.find((product) => product.id === productId);
  //     if (product) {
  //       navigate(`/product?key=${product.id}`);
  //     }
  //   };

  //   return (
  //     <div>
  //       <ul id="myUl" className=" w-[100%] block lg:w-full overflow-y-auto">
  //         {filteredProducts.map((product) => {
  //           return (
  //             <>
  //               <li className="myLi block">
  //                 <a
  //                   href="/"
  //                   key={product.id}
  //                   className="products"
  //                   onClick={() => handleClick(product.id)}
  //                 >
  //                   <div className="textContent">
  //                     <p className="name-product text-[16px]">{product.name}</p>
  //                     <div className="price flex flex-row">
  //                       {product.onSale ? (
  //                         <>
  //                           <p className="realPrice">{product.price} vnđ</p>
  //                           <p className="salePrice line-through text-slate-400 ml-5">
  //                             {product.priceOnSale} vnđ
  //                           </p>
  //                         </>
  //                       ) : (
  //                         <>
  //                           <p className="realPrice">{product.price} vnđ </p>
  //                         </>
  //                       )}
  //                     </div>
  //                   </div>
  //                   <div
  //                     className="imgProduct w-[50px] h-[50px] ml-[5rem] lg:ml-[15rem] bg-cover bg-black"
  //                     style={{ backgroundImage: `url(${product.url})` }}
  //                   ></div>
  //                 </a>
  //               </li>
  //             </>
  //           );
  //         })}
  //       </ul>

  //       <a
  //         href="/products"
  //         className="flex justify-center  mt-2 hover:text-pinky-400"
  //       >
  //         Product More
  //       </a>
  //     </div>
  //   );
  // };

  // const toggleProductList = (e) => {
  //   e.preventDefault();
  //   setShowProductList(!showProductList);
  // };

  useEffect(() => {
    loadStoredSearchResults();
  }, []);

  return (
    <>
      <header className=" p-10 mx-auto my-[-10px] z-[99999] !fixed">
        <nav className="flex flex-row justify-between items-center fixed top-0 left-0 w-full h-[10%] z-50 bg-pinky-200">
          <NavLink
            className="logo flex-1 basis-1/6 p-5 lg:p-0 text-center text-pinky-600 cursor-pointer"
            to={"/home"}
          >
            <h3 className=" text-xl lg:text-2xl font-bold">Melanie</h3>
            <div className="flex flex-row items-center justify-center">
              <div className="subheadline-deco-line"></div>
              <div className="lg:block hidden  lg:text-[10px]">
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
                activeMenuItem === "PRODUCT" ? "ct-menu-top-header-active" : ""
              }`}
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <div className="flex flex-row justify-center items-center gap-3">
                <div>CATEGORY</div>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              {showProductMenu && (
                <ul className="absolute top-full left-0 w-[200px] bg-white shadow-lg rounded-lg z-50">
                  <li>
                    <NavLink
                      to="/product/dress"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Váy
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
              <a href="/trends" onClick={() => handleMenuItemClick("jackets")}>
                TRENDS
              </a>
            </li>
            <li
              className={`ct-menu-top-header ${
                activeMenuItem === "ABOUT US" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <a href="/about-us" onClick={() => handleMenuItemClick("jeans")}>
                ABOUT US
              </a>
            </li>
          </ul>

          <div
            className="search-box flex basis-3/6 lg:basis-2/6 ml-10"
            // onClick={toggleProductList}
          >
            <form
              className="searchform-product relative w-full lg:w-[90%] lg:ml-5 h-10 border-2 rounded-full border-pinky-600 border-solid  text-pinky-600 bg-slate-100"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
            >
              <button
                type="button"
                // onClick={toggleProductList}
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
                  className="hidden xs:block outline-none absolute w-[50%] top-[6px] bg-slate-100"
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

          {/*Fav and Cart*/}
          <div className="basis-1/6 flex flex-row justify-center items-center gap-10 ml-10">
            <a href="/favourite" className="w-6 h-6 text-black">
              <FontAwesomeIcon icon={farHeart} />
              {/* <span className="absolute top-5 right-31.5 text-sm text-center rounded-full px-1 bg-red-600 text-white">
                {favoritesCount}
              </span> */}
            </a>
            <a href="/carts" className="w-6 h-6 text-black relative">
              <FontAwesomeIcon
                className=" before:absolute before:top-5 before:w-5 before:h-5 before:bg-red-600 before:z-50 "
                icon={faPaperPlane}
              />
              {/* <span className="absolute bottom-4 text-sm text-center rounded-full px-1 bg-red-600 text-white">
                4
              </span> */}
            </a>
            <a href="/profile" className="block w-6 h-6 text-black">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
          {/* MENU BAR */}
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
      {/* {showProductList && (
        <div className="contentProduct animate-slideDown">
          <ProductList />
        </div>
      )} */}
    </>
  );
};

export default HomeHeader;
