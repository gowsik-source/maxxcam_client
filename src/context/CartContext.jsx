import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // to store cart items
  const [cartItems, setCartItems] = useState([]);
  // to manage cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  // to manage promo code field visibility
  const [isPromoCodeOpen, setIsPromoCodeOpen] = useState(false);
  // to manage notes field visibility
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  // to manage promo code input reference
  const [isPromoCodeValue, setIsPromoCodeValue] = useState('');
  // to store promocode value
  const [isPromoCodeError, setIsPromoCodeError] = useState({});
  // to stote promocode error
  const inputRefPromo = useRef(null);
  // to manage notes input reference
  const inputRefNotes = useRef(null);

  const cartIsEmpty = cartItems.length === 0;

  // add products to cart
  const addToCart = (products) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => item.id === products.id);

      if (existingProduct) {
        return prev.map(item => item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...products, quantity: 1 }];
    });
    setIsCartOpen(true);
    return cartIsEmpty ? setIsPromoCodeOpen(false) : null;
  };

  // add products to cart function for quick view component
  const addToCartFromQuickViewHandler = (products, closeQuickViewAfterAddToCart) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => item.id === products.id);

      if (existingProduct) {
        return prev.map(item =>
          item.id === products.id ? { ...item, quantity: item.quantity + products.quantity } : item
        );
      }

      return [...prev, { ...products, quantity: products.quantity }];
    });
    closeQuickViewAfterAddToCart();
    setIsCartOpen(true);
    return cartIsEmpty ? setIsPromoCodeOpen(false) : null;
  };

  // add products to cart function for product details page
  const addToCartFromProductDetailsPageHandler = (userClickedProduct, quantity) => {
    setCartItems(prev => {
      const existingProduct = prev.find(item => item.id === userClickedProduct.id);

      if (existingProduct) {
        return prev.map(item =>
          item.id === userClickedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prev, { ...userClickedProduct, quantity: quantity }];
    });
    setIsCartOpen(true);
    return cartIsEmpty ? setIsPromoCodeOpen(false) : null;
  };

  // delete cart items
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // increase number of Quantity
  const increaseQuantity = (id) => {
    setCartItems(prev => prev.map(items => items.id === id ? { ...items, quantity: items.quantity + 1 } : items))
  };

  // decrease number of Quantity
  const decreaseQuantity = (id) => {
    setCartItems(prev => prev.map(items => items.id === id && items.quantity > 1 ? { ...items, quantity: items.quantity - 1 } : items))
  };

  // const decreaseQuantity = (id) => {
  //   setCartItems(prev => prev.map(items => {
  //     if (items.id === id && items.quantity > 1) {
  //         return { ...items, quantity: items.quantity - 1 };
  //     }
  //     return items;
  //   }));
  // }

  // toggle promo code field visibility
  const promoCodeHandler = () => {
    setIsPromoCodeOpen(prev => !prev);
  }

  // toggle notes field visibility
  const notesHandler = () => {
    setIsNotesOpen(prev => !prev);
  }

  // focus on promo code input when opened
  useEffect(() => {
    if (isPromoCodeOpen) {
      inputRefPromo.current?.focus();
    }
    if (isNotesOpen) {
      inputRefNotes.current?.focus();
    }
  }, [isPromoCodeOpen, isNotesOpen]);

  // to find total price
  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  const navigate = useNavigate();
  // to route my cart page
  const goToMyCart = () => {
    navigate('/view_cart');
    setIsCartOpen(false);
  }

  // promocode error handling and applying promocode
  const promoCodeApplyHandler = async () => {
    let localError = {};
    const cleanedPromoCode = isPromoCodeValue.trim();
    if (!cleanedPromoCode) {
      localError.promoCode = 'Please enter a valid promo code.';
      setIsPromoCodeError(localError);
      return;
    }
    setIsPromoCodeError({});
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        promoCode: isPromoCodeValue,
      });
      console.log(response, 'response from promo code apply handler');
    } catch (error) {
      setIsPromoCodeError({ promoCode: 'Something went wrong. Try again.' });
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        isCartOpen,
        openCart,
        closeCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isPromoCodeOpen,
        promoCodeHandler,
        inputRefPromo,
        totalPrice,
        goToMyCart,
        cartIsEmpty,
        notesHandler,
        isNotesOpen,
        inputRefNotes,
        isPromoCodeValue,
        isPromoCodeError,
        promoCodeApplyHandler,
        setIsPromoCodeValue,
        addToCartFromQuickViewHandler,
        addToCartFromProductDetailsPageHandler
      }}>
      {children}
    </CartContext.Provider>
  )
};
export const useCart = () => useContext(CartContext);
