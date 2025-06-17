import dotenv from 'dotenv';
import initDb from './database/connection.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const serverStart = async (): Promise<void> => {
  try {
    await initDb();
    console.log(`Server online. Running on port ${PORT}.`);
  } catch (error) {
    console.error(`Error: Server failed to load.`, (error as Error).message);
  }
};

serverStart();
