
import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
   if (!process.env.JWT_SECRET_SEED) {
      throw new Error('There is no JWT seed. Please check the environment variables.');
   }
   return jwt.sign(
      //payload
      { _id, email },
      //sedd
      process.env.JWT_SECRET_SEED,
      //options
      { expiresIn: '2h' }
   )
}

export const isValidToken = (token: string): Promise<string> => {
   if (!process.env.JWT_SECRET_SEED) {
      throw new Error('There is no JWT seed. Please check the environment variables.');
   }
   if (token.length <= 10) {
      return Promise.reject('JWT no valid');
   }
   return new Promise((resolve, reject) => {
      try {
         jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
            if (err) return reject('JWT not valid');
            const { _id } = payload as { _id: string };
            resolve(_id);
         })
      } catch (error) {
         console.log(error);
         reject('JWT not valid');
      }
   })
}