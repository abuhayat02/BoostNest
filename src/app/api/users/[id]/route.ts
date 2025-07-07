// src/app/api/users/[id]/route.ts

import { NextResponse } from "next/server";
import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";

export async function DELETE(req: Request) {

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    await databaseConnections();

    console.log(id)
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}
