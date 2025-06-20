import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string,
  image?: string,
  name: string,
  email: string,
  password?: string
  role: string
}

export interface IYouTubeServices extends Document {
  _id: string,
  title: string,
  subtitle: string,
  category: string,
  description: string,
  price: number,
  currency: "BDT",
  deliveryTime: string,
  feature: string[],
  thumbnail: string,
  isActive: boolean,
  createdAt: Date
}

