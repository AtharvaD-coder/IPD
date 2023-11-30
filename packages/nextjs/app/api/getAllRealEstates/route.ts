import { ObjectId } from 'mongodb';

import { NextResponse } from 'next/server';
import { baseUrl, fetchApi } from '~~/app/utils/fetchApi';
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
        const fetchAdditionalData = async (doc:any) => {
            const d = await fetchApi(`${baseUrl}/properties/detail?externalID=${doc.externalID}`);
            return { ...doc, ...d };
        };

        // Use Promise.all to perform asynchronous operations concurrently
        // const updatedDocuments = await Promise.all(documents.map(fetchAdditionalData));

        // // Save the updated documents back to the database
        // for (const updatedDoc of updatedDocuments) {
        //     await coll.updateOne(
        //         { _id: updatedDoc._id }, // Assuming _id is the unique identifier of each document
        //         { $set: updatedDoc }
        //     );
        // }
   
      
          return NextResponse.json({ data:documents },{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error },{status:500});
    }
}
