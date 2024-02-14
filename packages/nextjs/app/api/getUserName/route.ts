import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import mongoose, { ConnectOptions } from "mongoose";
import { uri } from "~~/utils/mongoose-utils";
import { Name } from "~~/servers/schema/name";

export async function POST(req: NextRequest) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("connected to db")

        const { address } = await req.json();
        console.log(address, "address,name")    
        const nameData = await Name.findOne({ address: address });
        console.log(nameData, "nameData")

        if (!nameData) {
            return NextResponse.json({ name: address }, { status: 200 });
        }
        else {
            return NextResponse.json({ name: nameData.name }, { status: 200 });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
