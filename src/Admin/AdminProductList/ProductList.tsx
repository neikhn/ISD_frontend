/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import HomeHeaderLogin from "../HomeHeaderAdmin/HomeHeaderLogin.tsx";
import Footer from "../../User/Home/footer/Footer.tsx";
import UpdateProduct from "./UpdateProduct.tsx";
import DeleteProduct from "./DeleteProduct.tsx";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  countInStock: number;
  rating: number;
  onSale?: boolean;
  type: string;
  discount: number;
  description: string;
  quantity?: number;
  isfavourite?: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://melanine-backend.onrender.com/api/product/get-all"
        );
        const data = await response.json();
        if (data.status === "OK") {
          setProducts(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateSuccess = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setIsUpdateVisible(false);
  };

  const handleDeleteSuccess = (deletedProductId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setIsUpdateVisible(true);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      <HomeHeaderLogin />
      <h1 className="text-black text-2xl text-center mt-24">
        Danh sách sản phẩm
      </h1>
      <div className="w-[90%] h-auto mx-auto flex flex-row justify-center items-center gap-8 mt-5">
        <div className="basic-2/4 w-[70%] text-slate-500 mt-10  border-[1px] border-black border-solid my-8">
          <div className="label ">
            <ul className="flex flex-row justify-around bg-pinky-400 py-2">
              <li>Tên sản phẩm</li>
              <li>Phân loại hàng</li>
              <li>Giá</li>
              <li>Kho hàng</li>
              <li>Thao tác</li>
            </ul>
          </div>

          {currentProducts.map((product) => (
            <div
              className="text-black flex flex-row justify-between items-center"
              key={product._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
              }}
            >
              <div className=" w-[180px] flex flex-row justify-center items-center">
                <img
                  className="w-20 h-20 object-cover"
                  src={
                    Array.isArray(product.image)
                      ? product.image[0]
                      : product.image
                  }
                  alt={`Image of ${product.name}`}
                />
                <h2 className="ml-5 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {product.name}
                </h2>
              </div>
              <p className="">{product.type}</p>
              <p className="">{product.price}</p>
              <p className="">{product.countInStock}</p>
              <div className="flex flex-col p-2">
                <button
                  className="mb-2"
                  onClick={() => handleUpdateClick(product)}
                >
                  Update
                </button>
                <DeleteProduct
                  productId={product._id}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </div>
            </div>
          ))}
        </div>
        {isUpdateVisible && selectedProduct && (
          <UpdateProduct
            productId={selectedProduct._id}
            currentData={selectedProduct}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>
      <div className="pagination flex justify-center my-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
