import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  image: string | string[];
  price: number;
  countInStock: number;
  rating: number;
  onSale?: boolean;
  discount: number;
  type: string;
  quantity?: number;
  isfavourite?: boolean;
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  handleSearch: (searchTerm: string) => void;
  loadStoredSearchResults: () => void;
  cart: Product[];
  addToCart: (product: Product) => void;
  incrQty: (productId: string) => void;
  decrQty: (productId: string) => void;
  handleSetQuantity: (quantity: number) => void;
  quantity: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("savedProduct");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/product/get-all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching products", error);
        toast.error("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedProduct", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) return []; // Ensure prevCart is an array
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: (item.quantity || 0) + (product.quantity || 1),
              }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const incrQty = (productId: string) => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) return []; // Ensure prevCart is an array
      return prevCart.map((product) =>
        product._id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      );
    });
  };

  const decrQty = (productId: string) => {
    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) return []; // Ensure prevCart is an array

      let productRemoved = false;

      const updatedCart = prevCart
        .map((product) => {
          if (product._id === productId) {
            const newQuantity = (product.quantity || 0) - 1;
            if (newQuantity > 0) {
              return { ...product, quantity: newQuantity };
            } else {
              productRemoved = true; // Mark that the product is removed
              return null; // Mark product for removal
            }
          }
          return product;
        })
        .filter((product): product is Product => product !== null); // Remove null values

      if (productRemoved) {
        toast.warning("Product removed from cart");
      }

      return updatedCart;
    });
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (searchTerm: string) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    localStorage.setItem("searchResults", JSON.stringify(results));
    localStorage.setItem("searchTerm", searchTerm);
  };

  const loadStoredSearchResults = () => {
    const storedResults = localStorage.getItem("searchResults");
    const storedTerm = localStorage.getItem("searchTerm");
    if (storedResults) {
      setFilteredProducts(JSON.parse(storedResults));
    }
    if (storedTerm) {
      // Optional: Set the search term if needed
    }
  };

  const handleSetQuantity = (qty) => {
    setQuantity(qty);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        handleSearch,
        loadStoredSearchResults,
        cart,
        addToCart,
        incrQty,
        decrQty,
        quantity,
        handleSetQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
