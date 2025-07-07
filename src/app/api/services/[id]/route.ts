import { NextResponse } from "next/server";
import databaseConnections from "@/lib/mongodb";
import Service from "@/models/services";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await databaseConnections();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Service ID" }, { status: 400 });
    }

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(
      { service, message: "Single service fetched" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: "something is wrong" }, { status: 400 });
    }
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  // console.log("our delate services is - 39 no line ", id)
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Service ID" }, { status: 400 });
  }

  try {
    await databaseConnections()
    const res = await Service.deleteOne({ _id: id })
    return NextResponse.json({ message: 'deleted services', response: res }, { status: 200 });

  } catch (e: unknown) {
    if (e instanceof Error) {

      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });

    }

  }
}

