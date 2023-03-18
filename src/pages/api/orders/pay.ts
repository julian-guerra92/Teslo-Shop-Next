
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { PaypalOrderReponse } from '../../../interfaces';
import { Order } from '../../../models';

type Data = {
   message: string
}

export default function handlrer(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return payOrder(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         });
   }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
   const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
   const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
   const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
   const body = new URLSearchParams('grant_type=client_credentials');
   try {
      const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
         headers: {
            'Authorization': `Basic ${base64Token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })
      return data.access_token;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         console.log(error.response?.data);
      } else {
         console.log(error);
      }
      return null;
   }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   //TODO: validad mongoId
   const paypalBearerToken = await getPaypalBearerToken();
   if (!paypalBearerToken) {
      return res.status(400).json({ message: 'Could not confirm PayPal token' })
   }
   const { transactionId = '', orderId = '' } = req.body;
   const { data } = await axios.get<PaypalOrderReponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
      headers: {
         'Authorization': `Bearer ${paypalBearerToken}` 
      }
   })
   if(data.status !== 'COMPLETED'){
      return res.status(400).json({message: 'Unknown order in Paypal!'});
   }
   await db.connect();
   const dbOrder = await Order.findById(orderId);
   if(!dbOrder){
      await db.disconnect();
      return res.status(400).json({message: 'Order does not exist on our database!'});
   }
   if(dbOrder.summaryOrder.total !== Number(data.purchase_units[0].amount.value)){
      await db.disconnect();
      return res.status(400).json({message: 'Order total value in Paypal not is the same that order in database!'});
   }
   dbOrder.transactionId = transactionId;
   dbOrder.isPaid = true;
   await dbOrder.save();
   await db.disconnect();
   return res.status(200).json({ message: 'Paid order' });
}
