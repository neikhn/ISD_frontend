import React, { useState, useEffect } from 'react';

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

const UpdateProduct: React.FC<UpdateProductProps> = ({ productId, currentData, onUpdateSuccess }) => {
  const [productData, setProductData] = useState<Product>(currentData);

  useEffect(() => {
    setProductData(currentData);
  }, [currentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/product/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Nếu cần xác thực
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (data.status === 'OK') {
        console.log('Product updated successfully:', data.data);
        onUpdateSuccess(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form className='text-black' onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" name="image" value={productData.image} onChange={handleChange} />
      </div>
      <div>
        <label>Type:</label>
        <input type="text" name="type" value={productData.type} onChange={handleChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={productData.price} onChange={handleChange} />
      </div>
      <div>
        <label>Count In Stock:</label>
        <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" name="rating" value={productData.rating} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={productData.description} onChange={handleChange} />
      </div>
      <div>
        <label>Discount:</label>
        <input type="number" name="discount" value={productData.discount} onChange={handleChange} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
