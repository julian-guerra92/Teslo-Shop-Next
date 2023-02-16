
import { createContext } from 'react';
import { ICartProduct, IOrderSummary } from '../../interfaces/';

interface ContextProps {
   cart: ICartProduct[];
   summary: IOrderSummary;
   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);