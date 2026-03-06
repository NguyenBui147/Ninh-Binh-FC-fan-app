import React, { createContext, useState, useContext, ReactNode } from 'react';

// Giả định kiểu Product tương tự như trong DetailedProductsScreen
export interface CartProduct {
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string; // Unique ID cho mỗi mục trong giỏ (kết hợp productID + size)
  product: CartProduct;
  size: string | null;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartProduct, size: string | null, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalCartValue: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartProduct, size: string | null, quantity: number) => {
    setCartItems(prevItems => {
      // Tìm xem sản phẩm có cùng size đã có trong giỏ hàng chưa
      // Nếu sản phẩm không có ID, dùng name làm identifier tạm thời
      const productId = product.id || product.name; 
      const existingItemIndex = prevItems.findIndex(
        item => (item.product.id === productId || item.product.name === productId) && item.size === size
      );

      if (existingItemIndex > -1) {
        // Nếu có rồi, tăng số lượng
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Nếu chưa có, thêm mới
        const newItemId = `${productId}_${size || 'nosize'}`;
        return [...prevItems, { id: newItemId, product, size, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCartValue,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
