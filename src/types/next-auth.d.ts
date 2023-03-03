
import NextAuth from 'next-auth';

declare module 'next-auth' {
   interface Session {
      accessToken?: string;
   }
}

declare module "next-auth" {
   interface User {
       id?: string
   }
} 