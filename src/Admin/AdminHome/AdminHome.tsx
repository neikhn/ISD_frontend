import React, { useState } from "react";
import { toast } from "react-toastify";
import HomeHeaderAdmin from "../HomeHeaderAdmin/HomeHeaderLogin.tsx";
import Footer from "../../User/Home/footer/Footer.tsx";

function AdminHome() {
  const initialProductState = {
    name: "",
    image: "",
    type: "",
    countInStock: "",
    price: "",
    rating: "",
    description: "",
    discount: "",
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://melanine-backend.onrender.com/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Thêm thành công sản phẩm vào danh sách");
        setProduct(initialProductState); // Reset the form values
      } else {
        toast.error(data.message || "Đã xảy ra lỗi khi thêm sản phẩm");
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm");
    }
  };

  return (
    <>
      <HomeHeaderAdmin />
      <h1 className="text-black text-center text-2xl mt-24">Thêm sản phẩm</h1>
      <div className="flex justify-center items-center w-[80%] mx-auto my-12">
        <form
          className="w-[80%] mx-auto text-black basic-2/4 shadow-md p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-8">
            <div className="basic-1/2 flex flex-col">
              <label>Tên:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </div>
            <div className="basic-1/2 flex flex-col">
              <label>Type:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="text"
                name="type"
                value={product.type}
                onChange={handleChange}
                placeholder="Type"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Image:</label>
            <input
              className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
          </div>

          <div className="flex flex-row gap-8">
            <div className="basic-1/3 flex flex-col">
              <label>Price:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            <div className="basic-1/3 flex flex-col">
              <label>Hàng tồn kho:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="number"
                name="countInStock"
                value={product.countInStock}
                onChange={handleChange}
                placeholder="Hàng tồn kho"
              />
            </div>
            <div className="basic-1/3 flex flex-col">
              <label>Đánh giá:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="number"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="Đánh giá"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Description:</label>
            <textarea
              className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Mô tả"
            />
          </div>
          <div className="flex flex-col">
            <label>Discount:</label>
            <input
              className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Giảm giá"
            />
          </div>
          <div className="flex justify-center items-center my-3">
            <button
              className="button border-[1px] border-black border-solid"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
