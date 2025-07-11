import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

// Konfigurasi Firebase - Anda perlu mengganti dengan konfigurasi Firebase Anda sendiri
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "arena-master.firebaseapp.com",
  projectId: "arena-master",
  storageBucket: "arena-master.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;