import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '~~/servers/connect';

export async function POST(req: NextRequest ) {
    try {
        const {data } = await req.json();

        const db = await connectToDatabase('OpenEstate');
        if (!db) {
            return  NextResponse.json({ error: 'not connected to db' },{status:400});
        }
        const coll = db.collection('proposals');

       
     

        // Perform the upsert operation
        const result = await coll.findOneAndUpdate(
            { proposalId: data.proposalId },
            { $set: {...data} },
            { upsert: true}
          );
      

        return NextResponse.json({ data: result },{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
}
