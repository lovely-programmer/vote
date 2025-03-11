import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await prisma.outlook.create({
      data: await req.json(),
    });

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req) => {
  try {
    const data = await prisma.outlook.findMany({
      orderBy: [{ date: "desc" }],
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
