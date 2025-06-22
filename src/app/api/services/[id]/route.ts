import { NextResponse } from "next/server";
import databaseConnections from "@/lib/mongodb";
import Service from "@/models/services";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await databaseConnections();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid Service ID" }, { status: 400 });
    }

    const service = await Service.findById(params.id);

    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(
      { service, message: "Single service fetched" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
