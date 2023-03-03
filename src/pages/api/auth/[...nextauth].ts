import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
   // Configure one or more authentication providers
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID || '',
         clientSecret: process.env.GITHUB_SECRET || '',
      }),
      // ...add more providers here
      Credentials({
         name: 'Custom Login',
         credentials: {
            email: { label: 'Email:', type: 'email', placeholder: 'email@google.com' },
            password: { label: 'Password:', type: 'password', placeholder: 'password' },
         },
         async authorize(credentials) {
            return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
         }
      })
   ],
   //CustomPages
   pages: {
      signIn: '/auth/login',
      newUser: '/auth/register'
   },
   session: {
      maxAge: 5292000, //30d
      strategy: 'jwt',
      updateAge: 86400 //cada día
   },
   callbacks: {
      async jwt({ token, account, user }) {
         if (account) {
            token.accessToken = account.access_token;
            switch (account.type) {
               case 'oauth':
                  token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                  break;
               case 'credentials':
                  token.user = user;
                  break;
            }
         }
         return token;
      },

      async session({ session, token, user }) {
         session.accessToken = token.accessToken as any;
         session.user = token.user as any;
         return session;
      }
   }
}
export default NextAuth(authOptions)