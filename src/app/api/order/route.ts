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
  } catch (e: unknown) {
    if (e instanceof Error) {

      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });

    }
  }
}


export async function GET(request: Request) {
  try {
    await databaseConnections();
    console.log('hello i am line 60')

    const allRequest = await Order.find({})
      .populate("userId")
      .populate("servicesId");

    console.log(allRequest, " all request 71")
    return NextResponse.json({ message: "Requested orders", allRequest }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('error is 70 , ', e.message)
      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });

    }
  }
}


