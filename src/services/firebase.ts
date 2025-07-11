import {FirebaseApp, initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import storage from '@react-native-firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'arena-master-tournament.firebaseapp.com',
  projectId: 'arena-master-tournament',
  storageBucket: 'arena-master-tournament.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-app-id',
};

// Initialize Firebase
let app: FirebaseApp;

try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.log('Firebase initialization error:', error);
}

// Firebase services
export const db = firestore();
export const authentication = auth();
export const cloudMessaging = messaging();
export const cloudStorage = storage();

// Collections
export const collections = {
  users: 'users',
  tournaments: 'tournaments',
  teams: 'teams',
  matches: 'matches',
  participations: 'participations',
  notifications: 'notifications',
  disputes: 'disputes',
  brackets: 'brackets',
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Get FCM token
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (
  imageUri: string,
  path: string,
  fileName: string,
): Promise<string | null> => {
  try {
    const reference = cloudStorage().ref(`${path}/${fileName}`);
    await reference.putFile(imageUri);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Delete image from Firebase Storage
export const deleteImage = async (imageURL: string): Promise<boolean> => {
  try {
    const reference = cloudStorage().refFromURL(imageURL);
    await reference.delete();
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export default app;