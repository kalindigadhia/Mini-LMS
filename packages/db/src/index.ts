
import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL) {
  throw new Error("MONGODB_URI missing")
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  }
}

export async function connect() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {

    cached.promise = mongoose.connect(MONGODB_URL)
  }

  cached.conn = await cached.promise

  return cached.conn
}

export * from "./models/assessment"

export * from "./models/attempt"