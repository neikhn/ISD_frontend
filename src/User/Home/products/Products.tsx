import React, { useEffect, useState } from "react";
import { useProductContext } from "../../ProductContext/ProductContext.tsx";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  countInStock: number;
  rating: number;
  onSale?: boolean;
  discount: number;
  type: string;
  quantity?: number;
  isfavourite?: boolean;
}

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

const Products = () => {
  const { products } = useProductContext();
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getProductById = (_id: string) => {
    return products.find((product) => product._id === _id);
  };

  const toggleFavourite = (productId: string) => {
    const product = getProductById(productId);
    if (!product) {
      return; // Handle the case where the product isn't found
    }

    setFavourites((prevFavourites) => {
      const productIndex = prevFavourites.findIndex(
        (fav) => fav._id === productId
      );

      let updatedFavourites: Product[];
      let isFavorited = false;

      if (productIndex >= 0) {
        // Product is already favorited, remove it
        updatedFavourites = prevFavourites.filter(
          (fav) => fav._id !== productId
        );
        toast.warning("Đã xóa sản phẩm khỏi danh sách yêu thích");
      } else {
        // Product is not favorited, add it
        updatedFavourites = [...prevFavourites, product];
        isFavorited = true;
        toast.success("Đã thêm sản phẩm vào danh sách yêu thích");
      }

      try {
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      } catch (error) {
        console.error("Failed to update localStorage:", error);
        toast.error("Lỗi khi cập nhật dữ liệu. Vui lòng thử lại.");
      }

      const heartIcon = document.getElementById(`heartIcon-${productId}`);
      if (heartIcon) {
        if (isFavorited) {
          localStorage.setItem("activeHeartId", productId); // Store active ID
          heartIcon.classList.add("text-red-600");
        } else {
          localStorage.removeItem("activeHeartId"); // Remove on unfavorite
          heartIcon.classList.remove("text-red-600");
        }
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
        const storedFavourites = JSON.parse(storedFavouritesJson);
        setFavourites(storedFavourites);
      } catch (error) {
        console.error("Failed to parse stored favourites:", error);
      }
    } else {
      console.error("No stored favourites found");
    }

    const activeHeartId = localStorage.getItem("activeHeartId");
    if (activeHeartId) {
      const heartIcon = document.getElementById(`heartIcon-${activeHeartId}`);
      if (heartIcon) {
        heartIcon.classList.add("text-red-600");
      }
    }
  }, []);

  const displayProducts = showMore ? products : products.slice(0, 8);

  return (
    <>
      {/* SUB HEADLINE */}
      <div className="subheadline flex">
        <div className="subheadline-deco-line"></div>
        <div className="subheadline-label">More Products</div>
        <div className="subheadline-deco-line"></div>
      </div>
      {/* END SUB HEADLINE */}

      {/* <!-- START TITLE --> */}
      <div className="title">
        <div className="flex flex-col justify-center items-center w-[95%] lg:w-[65%] mx-auto mb-16">
          <div className="page-headline mt-[100px] mb-[40px] leading-[2rem] lg:leading-[4rem]">
            <div className="w-full my-3 text-[#D94B4B] text-4xl font-normal leading-5 text-center">
              Hiện đang thịnh hành
            </div>
            <div className="text-[18px] text-slate-500 mb-4 text-center">
              Các sản phẩm được các khách hàng mua nhiều với đa số đều có phản
              hồi tốt
            </div>
          </div>
          <div className="lmt-subheadline flex">
            <div className="lmt-subheadline-label flex flex-row gap-2 lg:gap-8">
              <div className="lmt-breadcumbers lmt-breadcumbers-active">
                Đồ Bò
              </div>
              <div className="lmt-breadcumbers">Váy Đầm</div>
              <div className="lmt-breadcumbers flex items-center">Quần</div>
              <div className="lmt-breadcumbers">Trang sức</div>
              <div className="lmt-breadcumbers">Giảm giá</div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- END TITLE --> */}

      {/* MORE PRODUCTS */}
      <div className="feature-mugs w-[90%] lg:w-[80%] mx-auto mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 h-auto">
          {displayProducts.map((product) => (
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

              <div className="flex flex-row justify-between mb-7">
                <div className="basic-3/4">
                  <h1 className="text-l lg:text-[18px] text-black mb-5 overflow-hidden whitespace-nowrap overflow-ellipsis w-[170px]">
                    {product.name}
                  </h1>
                  <h1 className=" text-xs text-[#000] mb-8">
                    <FontAwesomeIcon icon={faStar}/> {product.rating} đánh giá
                  </h1>
                  <h1 className=" text-l lg:text-[18px] text-[#000]">
                    {formatPrice(product.price)}
                  </h1>
                </div>
                <div className="basic-1/4 flex flex-col justify-between items-center">
                  <div>{<StarRating />}</div>
                  <div className="text-s text-pinky-600 font-semibold">
                    {product.countInStock > 0 ? "Còn hàng "  + product.countInStock : "Out of stock"}
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
        {products.length > 8 && (
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={toggleShowMore}
              className="button bg-white text-pinky-600"
            >
              {showMore ? "Show Less" : "Show More Products"}
            </button>
          </div>
        )}
      </div>
      {/* END MORE PRODUCTS */}
    </>
  );
};

export default Products;
