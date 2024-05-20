import React from 'react';
import { useProductContext } from '../../User/ProductContext/ProductContext.tsx'; // Import useProductContext

interface DeleteProductProps {
  productId: string;
  onDeleteSuccess: (deletedProductId: string) => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onDeleteSuccess }) => {
  const { products } = useProductContext(); // Use ProductContext

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer YOUR_AUTH_TOKEN' // Nếu cần xác thực
        }
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();
      if (data.status === 'OK') {
        console.log('Product deleted successfully');
        onDeleteSuccess(productId);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <button className='border-[1px] border-black' onClick={handleDelete}>Delete Product</button>
  );
};

export default DeleteProduct;
