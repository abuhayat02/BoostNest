import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  console.log("my file : ", file)
  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = buffer.toString("base64");
  const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=47b25851b9d300db92da4ca62f89a4bb`,
    {
      method: "POST",
      body: new URLSearchParams({ image: base64Image }),
    }
  );
  const result = await uploadRes.json();

  if (result.success) {
    return new Response(JSON.stringify({ imageURL: result.data.url }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "Image upload failed" }), { status: 500 });
  }
}
