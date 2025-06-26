import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  _id: string,
  paymentScreenShort: string,
  userId: mongoose.Types.ObjectId,
  servicesId: mongoose.Types.ObjectId,
  paymentRequest: boolean,
  youTubeChannelLink?: string,
  youtubeVideoLink?: string,
  description?: string,
  status: 'Checking' | 'Running' | 'Completed',
  createdAt: Date,
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
  createdAt: Date
}

