import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const signUp = async (
  email: string,
  password: string,
  username: string,
  role: 'admin' | 'participant' | 'viewer' = 'participant'
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Update display name
    await updateProfile(firebaseUser, {
      displayName: username,
    });

    // Create user document in Firestore
    const userData: Omit<User, 'id'> = {
      email,
      username,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    return {
      id: firebaseUser.uid,
      ...userData,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    return {
      id: firebaseUser.uid,
      ...userDoc.data(),
    } as User;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const firebaseUser = auth.currentUser;
    
    if (!firebaseUser) {
      return null;
    }

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      return null;
    }

    return {
      id: firebaseUser.uid,
      ...userDoc.data(),
    } as User;
  } catch (error: any) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          const user: User = {
            id: firebaseUser.uid,
            ...userDoc.data(),
          } as User;
          callback(user);
        } else {
          callback(null);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};