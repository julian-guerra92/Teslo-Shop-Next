
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';

type Data =
   | { message: string }
   | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createOrder(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         });
   }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { orderItems, summaryOrder } = req.body as IOrder;
   //*Verificar que tengamos un Usuario
   const session: any = await getServerSession(req, res, authOptions);
   if (!session) {
      return res.status(401).json({ message: 'You must be authenticated to do this' })
   }
   //*Crear arreglo con los productos que la persona quiere
   const productsIds = orderItems.map(product => product._id);
   await db.connect();
   const dbProducts = await Product.find({ _id: { $in: productsIds } });
   try {
      const subTotal = orderItems.reduce((prev, current) => {
         const dbPice = dbProducts.find(product => product.id === current._id)?.price;
         if (!dbPice) {
            throw new Error('Check the cart again. Some product does not exist!');
         }
         return (dbPice * current.quantity) + prev;
      }, 0);
      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);
      const backendTotal = subTotal * (1 + taxRate);
      if (summaryOrder.total !== backendTotal) {
         throw new Error('The Cart total is not the same as the backedn calculation!');
      }
      //*Guardar en db
      const userId = session.user._id;
      const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
      newOrder.summaryOrder.total = Math.round(newOrder.summaryOrder.total * 100) / 100; //*Redondeo a dos decimales
      await newOrder.save();
      await db.disconnect();
      return res.status(201).json(newOrder);
   } catch (error: any) {
      await db.disconnect();
      console.log(error);
      res.status(400).json({ message: error.message || 'Check servidor logs' });
   }
}
