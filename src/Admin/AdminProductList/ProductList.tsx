import React, { useState, useEffect } from 'react';
import UpdateProduct from './UpdateProduct.tsx';
import DeleteProduct from './DeleteProduct.tsx';

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/product/get-all');
        const data = await response.json();
        if (data.status === 'OK') {
          setProducts(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateSuccess = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setIsUpdateVisible(false);
  };

  const handleDeleteSuccess = (deletedProductId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  return (
    <div>
      <h1 className='text-black'>Product List</h1>
      {products.map((product) => (
        <div className='text-black' key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h2>{product.name}</h2>
          <p>Type: {product.type}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.countInStock}</p>
          <button onClick={() => { setSelectedProduct(product); setIsUpdateVisible(true); }}>Update</button>
          <DeleteProduct productId={product._id} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      ))}
      {isUpdateVisible && selectedProduct && (
        <UpdateProduct
          productId={selectedProduct._id}
          currentData={selectedProduct}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ProductList;
