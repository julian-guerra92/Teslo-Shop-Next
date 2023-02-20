
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';
import { IUserResponse } from '../../../interfaces';

type Data =
   | { message: string }
   | { token: string, user: IUserResponse }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return loginUser(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         });
   }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { email = '', password = '' } = req.body;
   await db.connect();
   const user = await User.findOne({ email });
   await db.disconnect();
   if (!user) {
      return res.status(400).json({ message: 'Password or Email is not valid' });
   }
   if (!bcrypt.compareSync(password, user.password!)) {
      return res.status(400).json({ message: 'Password or Email is not valid' });
   }
   const { _id, role, name } = user;
   const token = jwt.signToken(_id, email);
   return res.status(200).json({
      token,
      user: {
         email, role, name
      }
   })
}