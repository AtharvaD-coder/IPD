import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~~/servers/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {tokenId } = req.body;

        const db = await connectToDatabase('OpenEstate_properties');
        if (!db) {
            return res.status(400).json({ error: 'not connected to db' });
        }
        const coll = db.collection('proposals');

        console.log(tokenId,'tokenid')
     


        const result = await coll.find({tokenId:Number(tokenId)}).toArray();
        console.log(result);
        res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
