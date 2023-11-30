import { ObjectId } from 'mongodb';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '~~/servers/connect';

export async function GET(req:Request) {
    try {
        
   
   
        const db=await connectToDatabase('OpenEstate_properties');
        if(!db){
            return NextResponse.json(({ error: 'not connected to db' }),{status:400});
        }
        const coll=db.collection('properties');
        const documents = await coll.find({}).toArray();
        console.log('documents',documents);
   
      
          return NextResponse.json({ data:documents },{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error },{status:500});
    }
}
