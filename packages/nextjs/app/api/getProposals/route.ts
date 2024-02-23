import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/servers/connect";

export async function POST(req: NextRequest) {
  try {
    const { tokenId } = await req.json();

    const db = await connectToDatabase("OpenEstate");
    if (!db) {
      return NextResponse.json({ error: "not connected to db" }, { status: 400 });
    }
    const coll = db.collection("proposals");

    console.log(tokenId, "tokenid");

    const result = await coll.find({ tokenId: Number(tokenId) }).toArray();
    // console.log(result);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
