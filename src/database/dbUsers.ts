
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { db } from './';


export const checkUserEmailPassword = async (email: string, password: string) => {
   await db.connect();
   const user = await User.findOne({ email });
   await db.disconnect();
   if (!user) {
      return null;
   }
   if (!bcrypt.compareSync(password, user.password!)) {
      return null;
   }
   const { role, firstName, lastName, _id } = user;
   return {
      _id,
      email: email.toLowerCase(),
      role,
      firstName,
      lastName
   }
}

//*Esta función crea o verifica el usuario OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
   await db.connect();
   const user = await User.findOne({ email: oAuthEmail });
   if (user) {
      await db.disconnect();
      const { _id, firstName, lastName, email, role } = user;
      return {
         _id,
         firstName,
         lastName,
         email,
         role
      }
   }
   const newUser = new User({
      email: oAuthEmail,
      firstName: oAuthName,
      lastName: oAuthName, //!Posible mejora posterior a la implemenetación
      password: '@',
      role: 'client'
   })
   await newUser.save();
   await db.disconnect();
   const { _id, firstName, email, role } = newUser;
   return {
      _id,
      firstName,
      email,
      role
   }
}