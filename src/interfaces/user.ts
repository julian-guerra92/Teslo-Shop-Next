
export interface IUser {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   password?: string;
   role: string;
   createdAt?: string;
   updatedAt?: string;
}

export interface IUserResponse {
   email: string;
   firstName: string;
   lastName: string;
   role: string;
}