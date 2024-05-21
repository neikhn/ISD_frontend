// types.d.ts hoặc có thể định nghĩa ngay trong file nếu không muốn tạo file riêng
export interface OrderItem {
  name: string;
  amount: number;
  image: string[];
  price: number;
  discount: number;
  product: string; // Assuming it's a product ID
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

export interface Order {
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

export interface Product {
  _id: string;
  name: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  image: string | string[];
  price: number;
  countInStock: number;
  rating: number;
  onSale?: boolean;
  discount: number;
  type: string;
  description: string;
  quantity?: number;
  isfavourite?: boolean;
}
