import { Db, MongoClient } from "mongodb";

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("No uri found");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function getDb(dbName = "budgetdb"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
