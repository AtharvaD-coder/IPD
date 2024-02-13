import { ObjectId } from 'mongodb';
import mongoose, { ConnectOptions } from 'mongoose';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '~~/servers/connect';
import { Properties } from '~~/servers/schema/properties';
import { uri } from '~~/utils/mongoose-utils';

export async function POST(req:Request) {
    try {
        
        let {address}=await req.json();
        console.log(address,'address')
   
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }as ConnectOptions);
        
        const documents = await Properties.find({
            owners: {
              $elemMatch: {
                $eq: address
              }
            }
          });
        console.log('documents',documents);
      
          return NextResponse.json({ data:documents },{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error },{status:500});
    }
}
