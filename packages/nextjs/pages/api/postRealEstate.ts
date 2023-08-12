import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~~/servers/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body);
        let {data}=req.body;
   
        const db=await connectToDatabase('OpenEstate_properties');
        if(!db){
            return   res.status(400).json({ error: 'not connected to db' });
        }
        const coll=db.collection('properties');
        await coll.insertOne(data);
        console.log('done');
      
        res.status(200).json({ messsge:'done' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
