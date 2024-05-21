import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useProductContext } from "../ProductContext/ProductContext.tsx";
import HeaderLogin from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudMeatball,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Footer from "../Home/footer/Footer.tsx";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  rating: number;
  countInStock: number;
  onSale?: boolean;
  discount: number;
  quantity?: number;
  isfavourite?: boolean;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchComponent = () => {
  const query = useQuery();
  const searchTerm = query.get("query");
  const { filteredProducts, loadStoredSearchResults } = useProductContext();
  const [favourites, setFavourites] = useState<Product[]>([]);
  const { products } = useProductContext();

  useEffect(() => {
    loadStoredSearchResults();
  }, [loadStoredSearchResults]);

  const getProductById = (_id: string) => {
    return products.find((product) => product._id === _id);
  };

  const toggleFavourite = (productId: string) => {
    const product = getProductById(productId);
    if (!product) {
      return; // Handle the case where the product isn't found
    }

    setFavourites((prevFavourites) => {
      const isFavorited = prevFavourites.some((fav) => fav._id === productId);
      let updatedFavourites;

      if (isFavorited) {
        updatedFavourites = prevFavourites.filter(
          (fav) => fav._id !== productId
        );
        // Using setTimeout to ensure toast is not called in quick succession
        setTimeout(
          () => toast.warning("Đã xóa sản phẩm khỏi danh sách yêu thích"),
          0
        );
      } else {
        updatedFavourites = [...prevFavourites, product];
        // Using setTimeout to ensure toast is not called in quick succession
        setTimeout(
          () => toast.success("Đã thêm sản phẩm vào danh sách yêu thích"),
          0
        );
      }

      try {
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      } catch (error) {
        console.error("Failed to update localStorage:", error);
        toast.error("Lỗi khi cập nhật dữ liệu. Vui lòng thử lại.");
      }

      return updatedFavourites;
    });
  };

  const handClickBuyNow = (productId: string) => {
    const product = getProductById(productId);
    if (!product) {
      return; // Handle the case where the product isn't found
    }

    // Save product details to localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  const formatPrice = (price: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(price) + " VND"
    );
  };

  useEffect(() => {
    const storedFavouritesJson = localStorage.getItem("favourites");

    if (storedFavouritesJson) {
      try {
        const storedFavourites: Product[] = JSON.parse(storedFavouritesJson);
        setFavourites(storedFavourites);
      } catch (error) {
        console.error("Failed to parse stored favourites:", error);
      }
    } else {
      console.error("No stored favourites found");
    }
  }, []);

  return (
    <div>
      <HeaderLogin />
      <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto mt-24">
        {/* Search Result */}
        <div className="line flex justify-center items-center w-full h-16 bg-gradient-to-r from-pinky-50 to-pinky-600 mb-10">
          <div className="box-container flex justify-center items-center h-12 bg-white rounded-full px-4">
            <h1 className=" text-xl text-[#FF9894] font-semibold text-center">
              Search Results for "{searchTerm}"
            </h1>
          </div>
        </div>

        <div className="feature-mugs w-[90%] lg:w-[80%] mx-auto mb-24">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 h-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="product-card w-full h-[400px] sm:h-[450px] px-3 pt-5 bg-white shadow-md rounded-md mb-10"
                >
                  <div
                    className="relative w-full h-[150px] sm:h-[200px] rounded-md bg-cover bg-no-repeat bg-center mb-5"
                    style={{
                      backgroundImage: Array.isArray(product.image)
                        ? `url(${product.image[0]})`
                        : `url(${product.image})`,
                    }}
                  >
                    <div
                      id={`heartIcon-${product._id}`}
                      className={`absolute top-2 left-2 cursor-pointer drop-shadow-2xl ${
                        favourites.find((fav) => fav._id === product._id)
                          ? "text-red-600"
                          : ""
                      }`}
                      onClick={() => toggleFavourite(product._id)}
                    >
                      <FontAwesomeIcon
                        className="hover:opacity-85 active:opacity-90"
                        icon={faHeart}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-7">
                    <h1 className="text-l lg:text-[18px] font-bold text-black mb-5 overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                      {product.name}
                    </h1>
                    <h1 className=" text-xs text-[#000] mb-8">
                      <FontAwesomeIcon icon={faStar} /> {product.rating} đánh
                      giá
                    </h1>
                    <div className="flex flex-row justify-between">
                      <h1 className=" text-l lg:text-[18px] text-[#000]">
                        {formatPrice(product.price)}
                      </h1>
                      <div className="basic-1/2 lg:basic-1/4 flex flex-col justify-end items-end">
                        <div className="text-xs xs:text-s text-pinky-600 font-semibold">
                          {product.countInStock > 0
                            ? "Còn hàng " + product.countInStock
                            : "Out of stock"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavLink
                    to={`/product/${product._id}`} // Ensure the link is using the product ID
                    onClick={() => handClickBuyNow(product._id)} // Ensure product ID is passed here
                    className="buttonBuyNow flex justify-center items-center w-full h-12 rounded-xl bg-white border-2  border-red-600 text-pinky-600 hover:opacity-70 active:opacity-90 font-semibold cursor-pointer"
                  >
                    MUA NGAY
                  </NavLink>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center my-40">
              <FontAwesomeIcon
                className="text-black w-[100px] h-[100px]"
                icon={faCloudMeatball}
              />
              <p className="text-black mt-5 text-xl">
                Không có sản phẩm tìm kiếm
              </p>
            </div>
          )}
        </div>
        {/* END MORE PRODUCTS */}
      </div>

      <Footer />
    </div>
  );
};

export default SearchComponent;
