
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
   numberOfOrders: number;
   paidOrders: number; //isPaid: true
   notPaidOrders: number;
   numbersOfClients: number; // role: cliente
   numberOfProducts: number;
   productsWithNoInventory: number; // 0
   lowInventory: number; //productos con 10 o menos
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   db.connect();
   const [
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numbersOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
   ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ isPaid: true }),
      Order.countDocuments({ isPaid: false }),
      User.countDocuments({ role: 'client' }),
      Product.countDocuments(),
      Product.countDocuments({ inStock: 0 }),
      Product.countDocuments({ inStock: { $lte: 10 } }),
   ])
   db.disconnect();
   res.status(200).json({
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numbersOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
   });
}