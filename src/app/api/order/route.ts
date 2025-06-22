import databaseConnections from "@/lib/mongodb"
import Order from "@/models/order"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    await databaseConnections();

    const information = await request.json();
    const userId = information.userId;

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayOrderCount = await Order.countDocuments({
      userId: userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    console.log("submit count = ", todayOrderCount)
    if (todayOrderCount >= 8) {
      return NextResponse.json(
        { message: "You can only place up to 4 orders per day." },
        { status: 403 }
      );
    }

    console.log("submit count = ", todayOrderCount)


    const newOrder = new Order(information);
    await newOrder.save();

    return NextResponse.json({ message: "Order is pending" }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}


export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url)
    let role = searchParams.get('role')
    let userId = searchParams.get("userId")
    console.log({ role, userId })
    await databaseConnections();
    let allRequest;

    if (role === "admin") {
      allRequest = await Order.find({})
        .populate("userId")
        .populate("servicesId");
    } else if (role === "user" && userId) {
      allRequest = await Order.find({ userId })
        .populate("userId")
        .populate("servicesId");
    } else {
      return NextResponse.json({ message: "Unauthorized or Missing Parameters" }, { status: 401 });
    }
    console.log(allRequest, " all request 71")
    return NextResponse.json({ message: "Requested orders", allRequest }, { status: 200 });
  } catch (e: any) {
    console.log(e.message)
    return NextResponse.json({ message: e.message }, { status: 400 })
  }
}


