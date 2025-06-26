import { IUser } from "@/interfaces/interfaces";
import mongoose, { Model, Schema } from "mongoose";


const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  image: { type: String, required: false },
  role: { type: String, default: 'user' }
}, { timestamps: true })


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User

