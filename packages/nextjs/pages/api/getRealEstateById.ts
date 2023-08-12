import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~~/servers/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body;
        console.log(id,'id')
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const db = await connectToDatabase('OpenEstate_properties');
        if (!db) {
            return res.status(400).json({ error: 'Not connected to the database' });
        }
        
        const coll = db.collection('properties');
        
        // Convert the ID string to an ObjectId
        const objectId = new ObjectId(id);

        const document = await coll.findOne({ _id: objectId });

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        console.log('Document:', document);
      
        res.status(200).json({ data: document });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
