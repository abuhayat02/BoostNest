import databaseConnections from "@/lib/mongodb"
import Service from "@/models/services";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const servicesInfo = await request.json()
  try {
    await databaseConnections()
    const newServices = new Service(servicesInfo);
    await newServices.save()
    return NextResponse.json({ message: 'successfully posted your services' }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 })
  }
}

export async function GET(request: Request) {

  try {
    await databaseConnections();
    const services = await Service.find({})
    return NextResponse.json({ services, message: 'all services data' }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 })
  }
}