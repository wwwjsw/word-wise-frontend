import { initializeApp } from 'firebase/app';
import { initFirestore } from '@next-auth/firebase-adapter';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  // Outras configurações do firebase...
};

// Inicialize o app do Firebase
const app = initializeApp(firebaseConfig);

// Exporte os módulos do Firestore e Auth
export const firestore = initFirestore();
export const auth = getAuth(app);
