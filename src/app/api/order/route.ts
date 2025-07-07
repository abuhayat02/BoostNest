import databaseConnections from "@/lib/mongodb"
import { authOption } from "@/lib/nextOuthOptions";
import Order from "@/models/order"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import "@/models/services";


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
  const session = await getServerSession(authOption);

  try {
    await databaseConnections();
    if (!session) {
      return NextResponse.json({
        message: "Unauthorize access"
      }, { status: 401 })
    }

    if (session?.user.role === 'admin') {
      const allRequest = await Order.find({})
        .populate("userId")
        .populate("servicesId").sort({ createdAt: -1 });
      return NextResponse.json({ message: "Requested orders", allRequest }, { status: 200 });
    }


    const allRequest = await Order.find({ userId: session?.user.id }).populate('servicesId')
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

export async function PATCH(req: Request) {
  const { status, orderId } = await req.json()
  console.log({ status, orderId })
  try {
    await databaseConnections()
    const orderStatus = await Order.findByIdAndUpdate(orderId, { status })
    return NextResponse.json({ message: "Updated Status", orderStatus }, { status: 200 });

  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('error is 70 , ', e.message)
      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });
    }
  }
}

