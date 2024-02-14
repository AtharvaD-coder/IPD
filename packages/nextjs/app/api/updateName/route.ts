import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "~~/servers/connect";
import mongoose, { ConnectOptions } from "mongoose";
import { uri } from "~~/utils/mongoose-utils";
import { Name } from "~~/servers/schema/name";

export async function POST(req: NextRequest) {
  try {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      // console.log("connected to db")

      const {address,name}=await req.json();
      // console.log(address,name,"address,name")
      const nameData=await Name.findOne({address:address});

      if(!nameData){
        const newNamedata=new Name({
            address:address,
            name:name
        })
        await newNamedata.save()
      }
      else{
        nameData.name=name;
        await nameData.save();
      }


    return NextResponse.json({ messsge: "done" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
