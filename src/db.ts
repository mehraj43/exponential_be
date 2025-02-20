import mongoose from 'mongoose';
import env from './conf/env';

const dbURL: any = env.DB_URL;

export const dbConnection = mongoose.createConnection(dbURL);

dbConnection.on('error', (err) => {
  console.error('Error occured while database connection', err);
  throw new Error('Db error occured');
});

dbConnection.once('open', () => {
  console.log('Database connection successful');
});
