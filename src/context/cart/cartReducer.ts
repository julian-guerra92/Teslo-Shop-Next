

import { CartState } from './';
import { ICartProduct, IOrderSummary, IShippingAddres } from '../../interfaces';

type CartActionType =
   | { type: 'Cart - LoadCart from Cookies | storage', payload: ICartProduct[] }
   | { type: 'Cart - Update products in cart', payload: ICartProduct[] }
   | { type: 'Cart - Change quantity in cart', payload: ICartProduct }
   | { type: 'Cart - Remove product in cart', payload: ICartProduct }
   | { type: 'Cart - Update order summary', payload: IOrderSummary }
   | { type: 'Cart - Load address from cookie', payload?: IShippingAddres }
   | { type: 'Cart - Update address', payload?: IShippingAddres }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
   switch (action.type) {
      case 'Cart - LoadCart from Cookies | storage':
         return {
            ...state,
            isLoaded: true,
            cart: [...action.payload]
         }
      case 'Cart - Update products in cart':
         return {
            ...state,
            cart: [...action.payload]
         }
      case 'Cart - Change quantity in cart':
         return {
            ...state,
            cart: state.cart.map(item => {
               if (item._id !== action.payload._id || item.size !== action.payload.size) {
                  return item;
               }
               return action.payload;
            })
         }
      case 'Cart - Remove product in cart':
         return {
            ...state,
            cart: state.cart.filter(
               item => (item._id !== action.payload._id || item.size !== action.payload.size)
            )
         }
      case 'Cart - Update order summary':
         return {
            ...state,
            summary: action.payload
         }
      case 'Cart - Update address':
      case 'Cart - Load address from cookie':
         return {
            ...state,
            address: action.payload
         }
      default:
         return state;
   }
}