import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const initDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('Error finding MONGO URI - check variables.');
    }
    await mongoose.connect(mongoUri);
    console.log('Database has connected successfully.');

    // debug
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray();
      if (collections.length === 0) {
        console.log(`No collections found.`);
      } else {
        collections.forEach((collection) => {
          console.log(`DB has these collections: ${collection.name}`);
        });
      }
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export default initDb;
