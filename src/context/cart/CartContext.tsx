
import { createContext } from 'react';
import { ICartProduct, IOrderSummary, IShippingAddres } from '../../interfaces/';

interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[];
   summary: IOrderSummary;
   address?: IShippingAddres;
   updateAddress: (address: IShippingAddres) => void;
   //*Methods
   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);