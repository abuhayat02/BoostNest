import databaseConnections from "@/lib/mongodb"
import { authOption } from "@/lib/nextOuthOptions";
import Service from "@/models/services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const servicesInfo = await request.json()
  const session = await getServerSession(authOption)
  try {
    await databaseConnections()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: 'hey , fuck you hacker , ha ha ha' }, { status: 404 })

    }

    const newServices = new Service(servicesInfo);
    await newServices.save()
    return NextResponse.json({ message: 'successfully posted your services' }, { status: 201 })
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
    const services = await Service.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ services, message: 'all services data' }, { status: 201 })
  } catch (e: unknown) {
    if (e instanceof Error) {

      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'something is wrong' }, { status: 400 });

    }
  }
}




