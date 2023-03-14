import { IUser, IShippingAddres, IOrderSummary } from './';
import { ISize } from './';

export interface IOrder {
   _id?: string;
   user?: IUser | string;
   orderItems: IOrderItems[];
   shippingAdrress: IShippingAddres;
   paymentResult?: string;
   summaryOrder: IOrderSummary;
   isPaid: boolean;
   paidAt?: string;
}

export interface IOrderItems {
   _id: string;
   title: string;
   size: ISize;
   quantity: number;
   slug: string;
   image: string;
   price: number;
   gender: string;
}