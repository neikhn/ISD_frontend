import React, { useState } from 'react';

function AdminHome() {
  const [product, setProduct] = useState({
    name: '',
    image: '',
    type: '',
    countInStock: '',
    price: '',
    rating: '',
    description: '',
    discount: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form className='flex flex-col gap-5 text-black' onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" />
      <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="type" value={product.type} onChange={handleChange} placeholder="Type" />
      <input type="number" name="countInStock" value={product.countInStock} onChange={handleChange} placeholder="Count in Stock" />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" />
      <input type="number" name="rating" value={product.rating} onChange={handleChange} placeholder="Rating" />
      <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description"></textarea>
      <input type="number" name="discount" value={product.discount} onChange={handleChange} placeholder="Discount" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdminHome;
