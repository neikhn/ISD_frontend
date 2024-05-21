/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLogin from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";

function InformationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, totalAmt } = location.state as {
    cart: any[];
    totalAmt: number;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shippingAddress = { name, email, address, city, phone };
    navigate("/checkout", { state: { cart, totalAmt, shippingAddress } });
  };
  function formatPrice(price: number) {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      }).format(price) + " VND"
    );
  }
  return (
    <div className="content-wrapper font-Karla max-w-screen-2xl text-base mx-auto">
      <HeaderLogin />
      {/* Main Content */}
      <div className="information-page text-black mt-40 lg:mt-24">
        <h1 className="text-center text-[30px]">Điền Thông Tin</h1>
        <div className="information-cart flex flex-col lg:flex-row justify-center items-center w-[80%] mx-auto gap-8 my-10">
          <div className="basic-1/2 list-product flex flex-col justify-center items-center w-full lg:w-[50%] h-auto border-[1px] border-black border-solid">
            {cart.map((product) => {
              return (
                <>
                  <div className="product flex flex-row justify-center items-start lg:items-end p-2 text-xs md:text-l">
                    <img
                      className="w-20 h-20 object-cover"
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={`Image of ${product.name}`}
                    />
                    <div className="product-info flex flex-col gap-2 ml-5">
                      <p className="font-semibold">{product.name}</p>
                      <p>{formatPrice(product.price)}</p>
                    </div>
                    <p className="ml-5">Số lượng: {product.quantity}</p>
                    <p className="ml-5">
                      Tổng giá sản phẩm:{" "}
                      {formatPrice(product.quantity * product.price)}
                    </p>
                  </div>

                  <div className="w-[100%] h-[1px] bg-gradient-to-r from-slate-200 to-slate-600"></div>
                </>
              );
            })}
            <div className="total-price mt-8 flex justify-center items-center pl-3 pb-3 font-semibold">
              {" "}
              Tổng cộng: {formatPrice(totalAmt)}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="basic-1/2 w-[40%] h-auto p-8 shadow-md"
          >
            <div className="flex flex-col">
              <label>Tên:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Email:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Địa chỉ:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Thành phố:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Số điện thoại:</label>
              <input
                className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button className="button border-[1px] border-black border-solid ml-36 mt-5 hover:opacity-70 active:opacity-90" type="submit">Tiếp tục</button>
          </form>
        </div>
      </div>
      {/* End Main Content */}
      <Footer />
    </div>
  );
}

export default InformationPage;
