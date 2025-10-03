import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function getDb(dbName = "budgetdb"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
