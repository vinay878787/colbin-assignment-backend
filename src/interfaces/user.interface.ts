export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  website?: string;
  createdAt?: Date;
}
