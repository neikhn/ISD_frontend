import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  return (
    <div className="information-page text-black">
      <h1>Điền Thông Tin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thành phố:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tiếp tục</button>
      </form>
    </div>
  );
}

export default InformationPage;
