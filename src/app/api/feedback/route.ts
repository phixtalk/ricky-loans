import { connectToDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { message: "Feedback message is required." },
        { status: 400 }
      );
    }

    const db = await connectToDB();
    const collection = db.collection("feedback");

    const result = await collection.insertOne({
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Feedback sent successfully", id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/feedback:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
