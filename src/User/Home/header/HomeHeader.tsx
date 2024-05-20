import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import "./HomeHeader.css";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  url: string;
  price: number;
  onSale?: boolean;
  priceOnSale: number;
}

interface State {
  products: Product[];
  showMore: boolean;
}

const HomeHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const topMenuRef = useRef<HTMLUListElement | null>(null);

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
  //   const [products, setProducts] = useState([
  //     {
  //       id: 1,
  //       name: "Degrey Balo Simili Nap Basic - SNAP",
  //       imgUrl:
  //         "https://i.pinimg.com/564x/ae/3a/fb/ae3afb000d14aa416ea16a5560484473.jpg",
  //       price: 350000,
  //       onSale: true,
  //       priceSale: 400000,
  //     },
  //     {
  //       id: 2,
  //       name: "Degrey Balo Leather Quốc Dân - BQDL",
  //       imgUrl:
  //         "https://i.pinimg.com/564x/ae/3a/fb/ae3afb000d14aa416ea16a5560484473.jpg",
  //       price: 300000,
  //       onSale: true,
  //       priceSale: 350000,
  //     },
  //     {
  //       id: 3,
  //       name: "Degrey Balo Leather Quốc Dân - LMT",
  //       imgUrl:
  //         "https://i.pinimg.com/564x/ae/3a/fb/ae3afb000d14aa416ea16a5560484473.jpg",
  //       price: 300000,
  //       onSale: false,
  //       priceSale: 0,
  //     },
  //     {
  //       id: 4,
  //       name: "Degrey Balo Leather Quốc Dân - LMT",
  //       imgUrl:
  //         "https://i.pinimg.com/564x/ae/3a/fb/ae3afb000d14aa416ea16a5560484473.jpg",
  //       price: 300000,
  //       onSale: false,
  //       priceSale: 0,
  //     },
  //   ]);

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
  //         {products.map((product) => {
  //           return (
  //             <>
  //               <li className="myLi block">
  //                 <a
  //                   key={product.id}
  //                   className="products"
  //                   href="/"
  //                   onClick={() => handleClick(product.id)}
  //                 >
  //                   <div className="textContent">
  //                     <p className="name-product text-[16px]">{product.name}</p>
  //                     <div className="price flex flex-row">
  //                       {product.onSale ? (
  //                         <>
  //                           <p className="realPrice">{product.price} vnđ</p>
  //                           <p className="salePrice line-through text-slate-400 ml-5">
  //                             {product.priceSale} vnđ
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
  //                     style={{ backgroundImage: `url(${product.imgUrl})` }}
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

  const filterSearch = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("inputSearchAuto-3");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUl");
    li = document.getElementsByClassName("myLi");

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const [showProductList, setShowProductList] = useState(false);
  const toggleProductList = (e) => {
    e.preventDefault();
    setShowProductList(!showProductList);
  };

  return (
    <>
      <header className=" p-10 mx-auto my-[-10px] z-[99999] !fixed">
        <nav className="flex flex-row justify-between items-center fixed top-0 left-0 w-full h-[10%] z-50 bg-pinky-200">
          <div className="logo flex-1 basis-2/6 text-center text-pinky-600 cursor-pointer">
            <h3 className=" text-2xl font-bold">Melanie</h3>
            <div className="flex flex-row items-center justify-center">
              <div className="subheadline-deco-line"></div>
              <div className=" text-[10px]">More Products</div>
              <div className="subheadline-deco-line"></div>
            </div>
          </div>
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
              className={`ct-menu-top-header ${
                activeMenuItem === "COLLECTION"
                  ? "ct-menu-top-header-active"
                  : ""
              }`}
            >
              <a href="#" onClick={() => handleMenuItemClick("dress")}>
                COLLECTION
              </a>
            </li>
            <li
              className={`ct-menu-top-header ${
                activeMenuItem === "TRENDS" ? "ct-menu-top-header-active" : ""
              }`}
            >
              <a href="#" onClick={() => handleMenuItemClick("jackets")}>
                TRENDS
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

          <div
            className="search-box flex basis-3/6 lg:basis-1/3"
            onClick={toggleProductList}
          >
            <form className="searchform-product relative w-full lg:w-[90%] lg:ml-5 h-10 border-2 rounded-full border-pinky-600 border-solid  text-pinky-600 bg-slate-100">
              <button
                onClick={toggleProductList}
                className="iconSearch absolute padding-0 top-1 left-0 bottom-0 w-[55px] transition-opacity"
              >
                <FontAwesomeIcon
                  className="mr-5 p-1"
                  icon={faMagnifyingGlass}
                />
              </button>
              <div className="search-inner ml-10">
                <input type="hidden" name="type" value={"product"} />
                <input
                  id="inputSearchAuto-3"
                  className="visible outline-none absolute top-[6px] bg-slate-100"
                  name="q"
                  autoComplete="off"
                  type="text"
                  placeholder="Tìm kiếm"
                  onKeyUp={filterSearch}
                />
              </div>
            </form>
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
