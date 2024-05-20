import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useProductContext } from "../ProductContext/ProductContext.tsx";
import HeaderLogin from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
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
          <div className="box-container flex justify-center items-center w-[20%] h-12 bg-white rounded-full">
            <h1 className=" text-xl text-[#FF9894] font-semibold text-center">
              Search Results for "{searchTerm}"
            </h1>
          </div>
        </div>

        <div className="feature-mugs w-[90%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 h-auto">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="product-card w-full h-[370px] lg:h-[450px] px-3 pt-5 bg-white shadow-md rounded-md mb-10"
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
                      favourites.some((fav) => fav._id === product._id)
                        ? "text-red-600"
                        : ""
                    }`}
                    onClick={() => toggleFavourite(product._id)}
                  >
                    <FontAwesomeIcon
                      className=" hover:opacity-85 active:opacity-90"
                      icon={faHeart}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between mb-5">
                  <div className="basic-1/2">
                    <h1 className=" text-l lg:text-xl text-[#000] mb-5">
                      {product.name}
                    </h1>
                    <h1 className=" text-xs text-[#000] mb-8">
                      {product.rating}
                    </h1>
                    <h1 className=" text-l lg:text-xl text-[#000]">
                      {formatPrice(product.price)}
                    </h1>
                  </div>
                  <div className="basic-1/2 flex flex-col justify-between items-center">
                    <div>{<StarRating />}</div>
                    <div className="text-s text-pinky-600 font-semibold">
                      {product.countInStock > 0
                        ? "Còn hàng " + product.countInStock
                        : "Out of stock"}
                    </div>
                  </div>
                </div>

                <NavLink
                  to={`/product/${product._id}`}
                  onClick={() => handClickBuyNow(product._id)}
                  className="buttonBuyNow flex justify-center items-center w-full h-12 rounded-xl bg-white border-2  border-red-600 text-pinky-600 hover:opacity-70 active:opacity-90 font-semibold cursor-pointer"
                >
                  MUA NGAY
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        {/* END MORE PRODUCTS */}
      </div>
    </div>
  );
};

export default SearchComponent;
