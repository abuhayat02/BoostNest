import { NextResponse } from "next/server";
import { isValidEmail } from "../signup/route";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import databaseConnections from "@/lib/mongodb";

export async function POST(request: Request) {
  let { email, password } = await request.json();
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "email is not valid " }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 })
  }
  try {
    await databaseConnections()
    let user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "user not found in this gmail" }, { status: 400 })
    }
    if (!user.password) {
      return NextResponse.json({ message: "No password found for this user" }, { status: 400 });
    }

    let dec_password = await bcrypt.compare(password, user.password)
    if (!dec_password) {
      return NextResponse.json({ message: "incorrect password" }, { status: 400 })
    }
    return NextResponse.json({ message: "successful " }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}