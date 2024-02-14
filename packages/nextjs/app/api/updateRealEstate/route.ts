import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/servers/connect";

export async function POST(req: NextRequest) {
  try {
    console.log(req.body);
    let { data } = await req.json();

    const db = await connectToDatabase("OpenEstate");
    if (!db) {
      return NextResponse.json({ error: "not connected to db" }, { status: 400 });
    }
    const coll = db.collection("properties");
    const query = { tokenId: data.tokenId };
    const update = { $set: data };

    const result = await coll.updateOne(query, update);
    console.log("done");

    return NextResponse.json({ messsge: "done" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
