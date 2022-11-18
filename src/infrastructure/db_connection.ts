import mongoose from 'mongoose';
const UrlDB = process.env.ME_CONFIG_MONGODB_URL
const DATABESE = process.env.ME_CONFIG_MONGODB_DATABASEE

mongoose.connect(UrlDB!, {
  dbName: DATABESE
})

export const db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to mongodb');
})