
import { MongoClient, ServerApiVersion,Db } from 'mongodb';
 const uri = "mongodb+srv://admin:admin@cluster0.ainnpst.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    
    deprecationErrors: true,
    
  }
});

async function connectToDatabase(dbName:string) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    return client.db(dbName);
    
  } catch(error){
    console.log(error);
  }
}
export {connectToDatabase};
