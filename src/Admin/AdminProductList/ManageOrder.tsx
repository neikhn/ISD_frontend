import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import HomeHeader from "../HomeHeaderAdmin/HomeHeaderLogin.tsx";
import Footer from "../../User/Home/footer/Footer.tsx";

const API_BASE_URL = "https://melanine-backend.onrender.com/api/order"; // Đổi URL thành URL API của bạn

interface OrderItem {
  name: string;
  amount: number;
  image: string[];
  price: number;
  discount: number;
  product: string; // Assuming it's a product ID
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

interface Order {
  _id: string;
  user: string; // Assuming it's a user ID
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const getAllOrders = () => {
  return axios.get(`${API_BASE_URL}/get-all-order`);
};

const getOrderDetails = (orderId: string) => {
  return axios.get(`${API_BASE_URL}/get-details-order/${orderId}`);
};

const cancelOrder = (orderId: string, orderItems: OrderItem[]) => {
  return axios.delete(`${API_BASE_URL}/cancel-order/${orderId}`, {
    data: { orderItems },
  });
};

const formatPrice = (price: number) => {
  return (
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(price) + " VND"
  );
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="text-black">
      <HomeHeader />
      <h1 className="mt-24 text-center text-2xl font-bold">Order List</h1>
      <ul className="flex flex-col justify-center items-center gap-3 mt-3">
        {currentOrders.map((order) => (
          <li
            className="flex flex-row justify-center items-center p-3 border-[1px] border-black border-solid w-[50%] hover:text-pinky-400"
            key={order._id}
          >
            <Link to={`/order/${order._id}`}>
              Order ID: {order._id} --- {formatPrice(order.totalPrice)}
            </Link>
          </li>
        ))}
      </ul>

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
    </div>
  );
};

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (id) {
          // Ensure id is not undefined
          const response = await getOrderDetails(id);
          setOrder(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch order details", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!order) return;

    confirmAlert({
      title: "Xác nhận",
      message: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      buttons: [
        {
          label: "Có",
          onClick: async () => {
            try {
              if (id) {
                // Ensure id is not undefined
                await cancelOrder(id, order.orderItems);
                navigate("/orders");
              }
            } catch (error) {
              console.error("Failed to cancel order", error);
            }
          },
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HomeHeader />
      <div className="mt-24 text-black">
        <div
          className="flex flex-row justify-between items-center"
          key={order._id}
          style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
        >
          <div className="w-[180px] flex flex-row justify-center items-center">
            <h2 className="ml-5 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {order.shippingAddress.fullName}
            </h2>
          </div>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.phone}</p>
          <p>{formatPrice(order.totalPrice)}</p>
          <div className="flex flex-col p-2">
            <button onClick={handleCancelOrder}>Cancel Order</button>
          </div>
        </div>

        <div className="mt-4 mb-12">
          <h2 className="text-xl font-bold text-center">Order Items</h2>
          <ul className="flex flex-col justify-center items-center gap-3 mt-3">
            {order.orderItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-row justify-between items-center p-3 border-[1px] border-black border-solid  w-[70%]"
              >
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.amount}</p>
                    <p>Price: {formatPrice(item.price)}</p>
                  </div>
                </div>
                <p>Total: {formatPrice(item.price * item.amount)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const OrderManagement = {
  OrderList,
  OrderDetails,
};

export default OrderManagement;
