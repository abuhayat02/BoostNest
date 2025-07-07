import mongoose, { Document } from "mongoose";


export interface IServices {
  _id?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  description?: string;
  price?: number;
  currency?: string;
  deliveryTime?: string;
  feature?: string[];
  thumbnail?: string;
  isActive?: boolean;
  createdAt?: string | Date;
}
export interface IOrder extends Document {
  _id: string,
  paymentScreenShort: string,
  userId: mongoose.Types.ObjectId | string,
  servicesId?: mongoose.Types.ObjectId | IServices | string | undefined,
  paymentRequest: boolean,
  youTubeChannelLink?: string,
  youtubeVideoLink?: string,
  description?: string,
  status: 'Checking' | 'In Progress' | 'Completed' | 'Rejected',
  createdAt: Date | string,
  updatedAt: Date
}


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
  createdAt: Date | string
}

