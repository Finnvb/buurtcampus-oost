import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://finn:7yWXTI8q913ZET9t@cluster0.l3oacxx.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}
