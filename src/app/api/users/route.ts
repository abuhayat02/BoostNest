import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    await databaseConnections()
    const users = await User.find({}).sort({ createAt: -1 })
    return NextResponse.json({ users }, { status: 200 })
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 404 })
    }
  }

}
