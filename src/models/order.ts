import { IOrder } from "@/interfaces/interfaces";
import mongoose, { Model, Schema } from "mongoose";

let orderSchema: Schema<IOrder> = new mongoose.Schema({
  paymentScreenShort: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  servicesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  youTubeChannelLink: {
    type: String,
    required: false

  },
  youtubeVideoLink: {
    type: String,
    required: false

  },
  description: {
    type: String,
    required: false
  },
  paymentRequest: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

let Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema)

export default Order

