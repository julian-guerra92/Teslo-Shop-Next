
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';
import { IUserResponse } from '../../../interfaces';

type Data =
   | { message: string }
   | { token: string, user: IUserResponse }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return checkJWT(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         });
   }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { token = '' } = req.cookies;
   let userId = '';
   try {
      userId = await jwt.isValidToken(token);
   } catch (error) {
      return res.status(401).json({
         message: 'Authotization token is not valid'
      })
   }
   await db.connect();
   const user = await User.findById(userId).lean();
   await db.disconnect();
   if (!user) {
      return res.status(400).json({ message: 'Password or Email is not valid' });
   }
   const { _id, role, firstName, lastName, email } = user;
   const newToken = jwt.signToken(_id, email);
   return res.status(200).json({
      token: newToken,
      user: {
         email, 
         role,
         firstName,
         lastName
      }
   })
}