
import { NextResponse } from "next/server";
import databaseConnections from "@/lib/mongodb";
import User from "@/models/user";
import Order from "@/models/order";

export async function DELETE(req: Request) {

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    await databaseConnections();

    console.log(id)
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully", order: deletedOrder }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Something went wrong" }, { status: 500 });
  }
}
