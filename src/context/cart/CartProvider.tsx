
import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrderSummary } from '../../interfaces/';
import Cookie from 'js-cookie';

export interface CartState {
   cart: ICartProduct[];
   summary: IOrderSummary;
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE: CartState = {
   cart: [],
   summary: {
      numberOfItems: 0,
      subTotal: 0,
      taxRate: 0,
      total: 0,
   }
}

export const CartProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   useEffect(() => {
      try {
         const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
         dispatch({ type: 'Cart - LoadCart from Cookies | storage', payload: cookieCart });
      } catch (error) {
         dispatch({ type: 'Cart - LoadCart from Cookies | storage', payload: [] });
      }
   }, [])

   useEffect(() => {
      Cookie.set('cart', JSON.stringify(state.cart));
   }, [state.cart])

   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
      const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);
      const orderSummary = {
         numberOfItems,
         subTotal,
         taxRate: subTotal * taxRate,
         total: subTotal * (1 + taxRate)
      }
      dispatch({type: 'Cart - Update order summary', payload: orderSummary});
   }, [state.cart])

   const addProductToCart = (product: ICartProduct) => {
      const currentCart = [...state.cart];
      const sameProductInCart = currentCart.some(item => item._id === product._id && item.size === product.size);
      if (!sameProductInCart) {
         return dispatch({ type: 'Cart - Update products in cart', payload: [...currentCart, product] });
      }
      currentCart.map(item => {
         if (item._id === product._id && item.size === product.size) {
            item.quantity += product.quantity;
            return item;
         }
         return item;
      })
      dispatch({ type: 'Cart - Update products in cart', payload: currentCart });
   }

   const updateCartQuantity = (product: ICartProduct) => {
      dispatch({ type: 'Cart - Change quantity in cart', payload: product });
   }

   const removeCartProduct = (product: ICartProduct) => {
      dispatch({ type: 'Cart - Remove product in cart', payload: product });
   }

   return (
      <CartContext.Provider value={{
         ...state,
         //methods
         addProductToCart,
         removeCartProduct,
         updateCartQuantity,
      }}>
         {children}
      </CartContext.Provider>
   )
}