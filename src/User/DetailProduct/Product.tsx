import React, { useEffect, useRef, useState } from "react";
import HomeHeader from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";
import {
  faHeart,
  faMinus,
  faPlus,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductContext } from "../ProductContext/ProductContext.tsx";
import { NavLink, useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  countInStock: number;
  rating: number;
  description: string;
  onSale?: boolean;
  discount: number;
  quantity?: number;
  isfavourite?: boolean;
  type: string;
}

function DetailProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const { addToCart, quantity, handleSetQuantity } = useProductContext();
  const [isVisibleDescription, setVisibleDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const productFromStorage = localStorage.getItem("selectedProduct");
      const favsFromStorage = localStorage.getItem("favourites");
      if (productFromStorage) {
        setProduct(JSON.parse(productFromStorage));
      }
      if (favsFromStorage) {
        setFavourites(JSON.parse(favsFromStorage));
      }
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    }
  }, []);

  const toggleContentDescription = () => {
    setVisibleDescription(!isVisibleDescription);
  };

  const handleQuantityChange = (event) => {
    handleSetQuantity(Number(event.target.value));
  };

  const handleCheckout = () => {
    if (product) {
      toast.success("Thêm sản phẩm thành công!");
      addToCart({ ...product, quantity });
    }
  };

  const toggleFavourite = (product: Product) => {
    setFavourites((prevFavourites) => {
      const productIndex = prevFavourites.findIndex(
        (fav) => fav._id === product._id
      );

      let newFavourites;
      if (productIndex >= 0) {
        newFavourites = prevFavourites.filter((fav) => fav._id !== product._id);
        toast.warning("Đã xóa sản phẩm khỏi danh sách yêu thích");
      } else {
        newFavourites = [...prevFavourites, product];
        toast.success("Đã thêm sản phẩm vào danh sách yêu thích");
      }

      try {
        localStorage.setItem("favourites", JSON.stringify(newFavourites));
      } catch (error) {
        console.error("Failed to update localStorage:", error);
        toast.error("Lỗi khi cập nhật dữ liệu. Vui lòng thử lại.");
      }

      return newFavourites;
    });
  };

  function formatPrice(price: number) {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(price) + " VND"
    );
  }

  const imgRef = useRef<HTMLDivElement>(null);

  const handleClickZoomIn = () => {
    const img = imgRef.current;
    if (img) {
      const isZoomed = img.style.transform === "scale(1.5) translate(30%, 0%)";
      img.style.transform = isZoomed
        ? "scale(1) translate(0, 0)"
        : "scale(1.5) translate(30%, 0%)";
    }
  };

  return (
    <>
      <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
        <HomeHeader />
        {product ? (
          <div className=" max-w-full my-24">
            {/*SLIDER*/}
            <div className="Slider flex justify-center items-center w-full h-12 shadow-md bg-pinky-200 text-xl text-[#FF9494] italic font-bold uppercase mb-5">
              Buy more pay less, áp dụng khi mua 2 sản phẩm
            </div>

            {/*Detail*/}
            <div className="flex flex-col justify-center items-start w-[95%] lg:w-[70%] mx-auto">
              {/*BREADCUMBS*/}
              <div className="flex flex-row justify-start items-start text-[#FF9494] text-l italic mb-2">
                <NavLink to={"/home"}>
                  <p className="hover:opacity-80">Home ||</p>
                </NavLink>
                <NavLink to={"/trends"}>
                  <p className="ml-3 hover:opacity-80">Product ||</p>
                </NavLink>
                <p className="font-bold ml-3"> {product.name}</p>
              </div>
              {/*LINE*/}
              <div className="w-full h-[2px] bg-gradient-to-r from-pinky-50 to-pinky-600 mb-10"></div>
              {/*IMAGE && PRICE && INFORMATION*/}

              <div className="flex flex-col md:flex-row w-full h-[1250px] md:h-[625px] gap-x-10 uppercase mb-0 lg:mb-24">
                {/*IMAGE*/}
                <div
                  ref={imgRef}
                  className="basic-1 md:basis-4/6 relative w-full h-full bg-black bg-cover bg-center shadow-2xl mb-3 md:mb-0"
                  style={{
                    transition: "transform 0.3s ease",
                    backgroundImage: `url(${
                      Array.isArray(product.image)
                        ? product.image[0]
                        : product.image
                    })`,
                  }}
                >
                  <div
                    onClick={handleClickZoomIn}
                    className="iconZoomIn hidden lg:block absolute text-[#FF9494] text-3xl bottom-5 right-5 cursor-pointer hover:opacity-90"
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                  </div>
                </div>
                {/*PRICE && INFORMATION*/}
                <div className="md:basis-3/6 flex flex-col w-full text-[#FF9494]">
                  <div className="productName text-2xl font-bold my-3 overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                    {product.name}
                  </div>

                  <div className="flex flex-row justify-between items-center my-3">
                    <div className="eCode text-l">
                      Mã sản phẩm:{" "}
                      <span className="text-xl font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-[50px]">
                        664B4695270404
                      </span>
                    </div>
                    <div className="condition text-l">
                      Tình Trạng:{" "}
                      <span className="text-xl font-semibold">Like New</span>
                    </div>
                  </div>

                  <div className="text-2xl text-[#FF9494] font-bold my-3">
                    {formatPrice(product.price)}
                  </div>

                  {/*SIZE*/}
                  <div
                    className="flex flex-col my-3 cursor-pointer"
                    aria-required
                  >
                    <div className="w-full h-[2px] bg-gradient-to-r from-pinky-50 to-pinky-600 mb-8"></div>
                    <div className="flex flex-row justify-between">
                      <h3 className="text-2xl font-bold">Freesize</h3>
                      <h3 className="text-2xl font-bold">Dạng: {product.type}</h3>
                    </div>
                    <div className="w-full h-[2px] bg-gradient-to-r from-pinky-50 to-pinky-600 mt-8"></div>
                  </div>

                  {/*QUANTITY*/}
                  <div className="flex flex-col gap-5 my-3">
                    <label htmlFor="products" className="text-xl font-bold">
                      Số lượng
                    </label>
                    <select
                      className="border-2 border-[#FF9494] p-3 rounded-l outline-none hover:opacity-80 active:opacity-90"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      required
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  {/*BUTTON ADD TO CART AND FAVOURITE*/}
                  <div className="flex flex-row justify-between mt-3">
                    <button
                      type="submit"
                      className="border-2 border-solid bg-pinky-600 text-white px-10 py-5 hover:opacity-80 active:opacity-90"
                      onClick={handleCheckout}
                    >
                      Thêm vào giỏ hàng
                    </button>

                    <button
                      type="submit"
                      className="favourite border-2 border-solid bg-pinky-600 text-white px-10 py-5 hover:opacity-80 active:opacity-90"
                      onClick={() => toggleFavourite(product)}
                    >
                      <FontAwesomeIcon className="text-3xl" icon={faHeart} />
                    </button>
                  </div>

                  {/* Description */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-pinky-50 to-pinky-600 my-3"></div>
                  <div className="flex flex-row justify-between mt-3">
                    <h3 className="text-l font-bold">Mô tả sản phẩm</h3>
                    <FontAwesomeIcon
                      icon={isVisibleDescription ? faMinus : faPlus}
                      onClick={toggleContentDescription}
                      className="cursor-pointer"
                    />
                  </div>
                  {isVisibleDescription && (
                    <p className="content-description text-xs leading-5 text-justify w-full h-auto animate-slideDown mt-3">
                      {product.description}
                    </p>
                  )}
                  <div className="w-full h-[2px] bg-gradient-to-r from-pinky-50 to-pinky-600 mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No product details available.</p>
        )}
        <Footer />
      </div>
    </>
  );
}

export default DetailProduct;
