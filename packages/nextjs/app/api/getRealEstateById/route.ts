import { NextRequest, NextResponse } from "next/server";
import { uri } from "../../../utils/mongoose-utils";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/servers/connect";
import { Properties } from "~~/servers/schema/properties";

export async function POST(req: NextRequest) {
  try {
    let { id } = await req.json();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(id, "id wtf");
    // Check if ID is provided

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    id = Number(id);

    const document = await Properties.findOne({ tokenId: id });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 400 });
    }

    console.log("Document:", document);

    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
