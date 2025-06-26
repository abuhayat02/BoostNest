import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import databaseConnections from "@/lib/mongodb";
import { isValidEmail } from "@/lib/emailvalidation";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "email is not valid " }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 })
  }
  try {
    await databaseConnections()
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "user not found in this gmail" }, { status: 400 })
    }
    if (!user.password) {
      return NextResponse.json({ message: "No password found for this user" }, { status: 400 });
    }

    const dec_password = await bcrypt.compare(password, user.password)
    if (!dec_password) {
      return NextResponse.json({ message: "incorrect password" }, { status: 400 })
    }
    return NextResponse.json({ message: "successful " }, { status: 201 })
  } catch (e: unknown) {
    if (e instanceof Error) {

      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });

    }
  }
}