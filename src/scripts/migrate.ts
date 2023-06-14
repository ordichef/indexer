import dotenv from 'dotenv'; 
import { Inscription } from '../models/inscription.model';
dotenv.config()

// console.log(process.env)

const migrateAll = async () => {
  try {
    console.log('Migrating ...');
    await Inscription.sync({alter: true});
  } catch (error) {
    console.error('Error when init table', error.message);
  }
}

migrateAll();