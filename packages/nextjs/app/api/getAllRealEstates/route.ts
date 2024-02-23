import { NextResponse } from "next/server";
import { uri } from "../../../utils/mongoose-utils";
import { ObjectId } from "mongodb";
import mongoose, { ConnectOptions } from "mongoose";
import { baseUrl, fetchApi } from "~~/app/utils/fetchApi";
import { connectToDatabase } from "~~/servers/connect";
import { Properties } from "~~/servers/schema/properties";

export async function GET(req: Request) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    const documents = await Properties.find({});
    // console.log("documents", documents);

    // Use Promise.all to perform asynchronous operations concurrently
    // const updatedDocuments = await Promise.all(documents.map(fetchAdditionalData));

    // // Save the updated documents back to the database
    // for (const updatedDoc of updatedDocuments) {
    //     await coll.updateOne(
    //         { _id: updatedDoc._id }, // Assuming _id is the unique identifier of each document
    //         { $set: updatedDoc }
    //     );
    // }

    return NextResponse.json({ data: documents }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
