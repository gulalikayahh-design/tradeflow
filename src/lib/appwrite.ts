import { Client, Account, Databases, Storage, ID, Permission, Role } from 'appwrite';

const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '6a8a912a0020db9368df';

export const DB_ID = '6a8a93d70014aedaba8e';
export const COLLECTION_ID = 'deals';
export const BUCKET_ID = 'trade_docs';

export const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID, Permission, Role };
