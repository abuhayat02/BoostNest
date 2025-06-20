import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const isValidEmail = (email: string) => {
  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\@s]+$/;
  return regExEmail.test(email)
}
export async function POST(request: Request) {
  const { name, email, password } = await request.json()



  if (!email || !name) {
    return NextResponse.json({ message: "all field are required" }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "this is not a valid email" }, { status: 400 })
  }

  try {
    await databaseConnections()
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "user is alrady exist" }, { status: 400 })
    }

    const enc_password = await bcrypt.hash(password, 10)
    const newUser = new User({
      email,
      name,
      password: enc_password
    })

    await newUser.save()
    return NextResponse.json({ message: "user successfully created " }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 })
  }
}