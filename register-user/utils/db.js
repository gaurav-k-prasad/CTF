import { config } from "dotenv";
import mongoose from "mongoose";
config()

const MONGO_URI = process.env.MONGO_URI_FLAGWARS;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
