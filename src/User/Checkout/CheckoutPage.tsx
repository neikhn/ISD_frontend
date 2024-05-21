/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLogin from "../HomeLoggedIn/HeaderLogin/HeaderLogin.tsx";
import Footer from "../Home/footer/Footer.tsx";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmt, shippingAddress } = location.state as {
    cart: any[];
    totalAmt: number;
    shippingAddress: {
      name: string;
      email: string;
      address: string;
      city: string;
      phone: string;
    };
  };

  const userId = localStorage.getItem("user_id"); // Lấy userId từ localStorage

  const handlePlaceOrder = async () => {
    const orderItems = cart.map((item) => ({
      name: item.name,
      amount: item.quantity,
      image: item.image,
      price: item.price,
      discount: item.discount,
      product: item._id,
    }));

    // Tính tổng giá của các mục hàng
    const itemsPrice = orderItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );

    const order = {
      orderItems,
      paymentMethod: "COD",
      itemsPrice: itemsPrice, // Sử dụng tổng giá tính toán được
      shippingPrice: 35000, // Nếu không có phí giao hàng
      totalPrice: totalAmt,
      fullName: shippingAddress.name,
      address: shippingAddress.address,
      city: shippingAddress.city,
      phone: shippingAddress.phone,
      email: shippingAddress.email,
    };

    console.log("Order to be sent:", order); // Thêm dòng này để debug

    try {
      const response = await fetch(
        `http://localhost:3001/api/order/create/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      const result = await response.json();
      if (result.status === "OK") {
        alert("Đơn hàng của bạn đã được đặt thành công bằng phương thức COD!");
        navigate("/home"); // Navigate to home or another page after successful order
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Có lỗi xảy ra khi đặt hàng.");
    }
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
      <div className="information-page text-black mt-24">
        <h1 className="text-center text-[30px]">Điền Thông Tin</h1>
        <div className="information-cart flex flex-row justify-center items-center w-[80%] mx-auto gap-8 my-10">
          <div className="basic-1/2 list-product flex flex-col justify-center items-center w-[50%] h-auto border-[1px] border-black border-solid">
            {cart.map((product) => {
              return (
                <>
                  <div className="product flex flex-row justify-center items-end p-2">
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
          <div className="basic-1/2 w-[40%] h-auto p-8 shadow-md">
            <div className="flex flex-col">
              <h3>Tên:</h3>
              <p className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2">
                {shippingAddress.name}
              </p>
            </div>
            <div className="flex flex-col">
              <h3>Email:</h3>
              <p className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2">
                {shippingAddress.email}
              </p>
            </div>
            <div className="flex flex-col">
              <h3>Địa chỉ:</h3>
              <p className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2">
                {shippingAddress.address}
              </p>
            </div>
            <div className="flex flex-col">
              <h3>Thành phố:</h3>
              <p className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2">
                {shippingAddress.city}
              </p>
            </div>
            <div className="flex flex-col">
              <h3>Số điện thoại:</h3>
              <p className="w-[100%] h-auto border-[1px] border-slate-400 bg-slate-200 p-2 my-2">
                {shippingAddress.phone}
              </p>
            </div>
            <button
              className="button border-[1px] border-black border-solid ml-36 mt-5 hover:opacity-70 active:opacity-90"
              type="submit"
              onClick={handlePlaceOrder}
            >
              Đặt hàng COD
            </button>
          </div>
        </div>
      </div>
      {/* End Main Content */}
      <Footer />
    </div>
  );
}

export default CheckoutPage;
