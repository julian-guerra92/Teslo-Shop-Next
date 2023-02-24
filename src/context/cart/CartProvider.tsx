
import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrderSummary, IShippingAddres } from '../../interfaces/';

export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   summary: IOrderSummary;
   address?: IShippingAddres;
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   summary: {
      numberOfItems: 0,
      subTotal: 0,
      taxRate: 0,
      total: 0,
   },
   address: undefined
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
      dispatch({ type: 'Cart - Update order summary', payload: orderSummary });
   }, [state.cart])

   useEffect(() => {
      try {
         const cookieAddress = Cookie.get('addressData') ? JSON.parse(Cookie.get('addressData')!) : undefined;
         dispatch({type: 'Cart - Load address from cookie', payload: cookieAddress});
      } catch (error) {
         dispatch({type: 'Cart - Load address from cookie', payload: undefined});
      }
   }, [])


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

   const updateAddress = (address: IShippingAddres) => {
      Cookie.set('addressData', JSON.stringify(address));
      dispatch({type: 'Cart - Update address', payload: address});
   }

   return (
      <CartContext.Provider value={{
         ...state,
         //methods
         addProductToCart,
         removeCartProduct,
         updateCartQuantity,
         updateAddress
      }}>
         {children}
      </CartContext.Provider>
   )
}