import { IYouTubeServices } from "@/interfaces/interfaces";
import mongoose, { Model, Schema } from "mongoose";

let servicesSchema: Schema<IYouTubeServices> = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  subtitle: { type: String, required: true, unique: false },
  category: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  price: { type: Number, required: true },
  currency: { type: String, default: "BDT" },
  deliveryTime: { type: String, required: true, unique: false },
  feature: [{ type: String, required: true, unique: false }],
  thumbnail: { type: String, required: true, unique: false },
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now(), required: true, unique: false }
})

let Services: Model<IYouTubeServices> = mongoose.models.Services || mongoose.model<IYouTubeServices>("Services", servicesSchema)

export default Services