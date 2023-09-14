import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '~~/servers/connect';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        console.log(id,'id')
        // Check if ID is provided
        if (!id) {
            return NextResponse.json({ error: 'ID is required' },{status:400});
        }

        const db = await connectToDatabase('OpenEstate_properties');
        if (!db) {
            return NextResponse.json({ error: 'Not connected to the database' },{status:400});
        }
        
        const coll = db.collection('properties');
        
        // Convert the ID string to an ObjectId
        const objectId = new ObjectId(id);

        const document = await coll.findOne({ _id: objectId });

        if (!document) {
            return NextResponse.json({ error: 'Document not found' },{status:400});
        }

        console.log('Document:', document);
      
            return NextResponse.json({ data:document },{status:200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
}
