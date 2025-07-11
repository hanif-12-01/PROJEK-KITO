import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Konfigurasi Firebase - Ganti dengan konfigurasi Anda sendiri
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

export default app;