
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';
import { IUserResponse } from '../../../interfaces';

type Data =
   | { message: string }
   | { token: string, user: IUserResponse }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return registerUser(req, res);
      default:
         return res.status(404).json({
            message: 'This endpoint does not exist'
         });
   }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { email = '', password = '', firstName = '', lastName = '' } = req.body as {
      email: string, password: string, firstName: string, lastName: string
   };
   if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be equal or more than 6 characters' });
   }
   if (firstName.length < 3) {
      return res.status(400).json({ message: 'First name must be equal or more than 3 characters' });
   }
   if (lastName.length < 3) {
      return res.status(400).json({ message: 'Last name must be equal or more than 3 characters' });
   }
   if (!validations.isValidEmail(email)) {
      return res.status(400).json({ message: 'Email is not valid' });
   }
   await db.connect();
   const user = await User.findOne({ email });
   if (user) {
      await db.disconnect();
      return res.status(400).json({ message: 'Already exist a user with this email' });
   }
   const newUser = new User({
      email: email.toLocaleLowerCase(),
      password: bcrypt.hashSync(password),
      role: 'client',
      firstName,
      lastName
   })
   try {
      await newUser.save({ validateBeforeSave: true });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Review logs on the server' });
   }
   await db.disconnect();
   const { _id, role } = newUser;
   const token = jwt.signToken(_id, email);
   return res.status(200).json({
      token,
      user: {
         email,
         role,
         firstName,
         lastName
      }
   })
}