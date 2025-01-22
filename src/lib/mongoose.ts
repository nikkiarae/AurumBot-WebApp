import mongoose, { Connection } from 'mongoose';
import { IS_PRODUCTION, MONGO_URI } from '@/lib/constants/config';

if (!MONGO_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cached: { conn: Connection | null; promise: Promise<Connection> | null } = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

mongoose.set("strictQuery", false);

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(`${MONGO_URI}`, { tls: IS_PRODUCTION })
      .then((mongoose) => mongoose.connection)
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;