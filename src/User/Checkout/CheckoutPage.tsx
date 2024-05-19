import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <div className="checkout-page text-black">
      <h1>Thông Tin Thanh Toán</h1>
      <div>
        <p>Tên: {shippingAddress.name}</p>
        <p>Email: {shippingAddress.email}</p>
        <p>Địa chỉ: {shippingAddress.address}</p>
        <p>Thành phố: {shippingAddress.city}</p>
        <p>Số điện thoại: {shippingAddress.phone}</p>
      </div>
      <button onClick={handlePlaceOrder}>Đặt hàng COD</button>
    </div>
  );
}

export default CheckoutPage;
