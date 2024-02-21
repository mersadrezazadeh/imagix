import mongoose, { type Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

type MongooseConnection = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    connection: null,
    promise: null,
  };
}

// Doing optimization because Next.js is serverless and make a new connection for every single action so we need to check for any cached connection to not create multiple connections
export async function connectToDatabase() {
  // if we already have a cached connection return it
  if (cached.connection) return cached.connection;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  // if there's no cached connection, we need to create a new connection and return it
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, { dbName: "Imagix", bufferCommands: false });

  cached.connection = await cached.promise;

  return cached.connection;
}
