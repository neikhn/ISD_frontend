import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

interface UpdateProductProps {
  productId: string;
  currentData: Product;
  onUpdateSuccess: (updatedProduct: Product) => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  productId,
  currentData,
  onUpdateSuccess,
}) => {
  const [productData, setProductData] = useState<Product>(currentData);

  useEffect(() => {
    setProductData(currentData);
    console.log("UpdateProduct currentData:", currentData);
  }, [currentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://melanine-backend.onrender.com/api/product/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_AUTH_TOKEN", // Nếu cần xác thực
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();
      if (data.status === "OK") {
        toast.success("Đã sửa thành công!")
        onUpdateSuccess(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form
      className="w-[50%] text-black basic-2/4 shadow-md p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row gap-8">
        <div className="basic-1/2 flex flex-col">
          <label>Tên:</label>
          <input
            className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div className="basic-1/2 flex flex-col">
          <label>Type:</label>
          <input
            className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
            type="text"
            name="type"
            value={productData.type}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label>Image:</label>
        <input
          className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
          type="text"
          name="image"
          value={productData.image}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-row gap-8">
        <div className="basic-1/3 flex flex-col">
          <label>Price:</label>
          <input
            className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div className="basic-1/3 flex flex-col">
          <label>Hàng tồn kho:</label>
          <input
            className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
          />
        </div>
        <div className="basic-1/3 flex flex-col">
          <label>Đánh giá:</label>
          <input
            className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label>Description:</label>
        <textarea
          className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Discount:</label>
        <input
          className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
          type="number"
          name="discount"
          value={productData.discount}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center items-center my-3">
        <button
          className="button border-[1px] border-black border-solid"
          type="submit"
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
