import {authentication, db, collections} from './firebase';
import {User, UserRole} from '../types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

class AuthService {
  // Sign up with email and password
  async signUp(
    email: string,
    password: string,
    displayName: string,
    role: UserRole = UserRole.PARTICIPANT,
  ): Promise<{success: boolean; user?: User; error?: string}> {
    try {
      const userCredential = await authentication.createUserWithEmailAndPassword(
        email,
        password,
      );

      // Update profile
      await userCredential.user.updateProfile({
        displayName,
      });

      // Create user document in Firestore
      const userData: User = {
        id: userCredential.user.uid,
        email,
        displayName,
        photoURL: userCredential.user.photoURL || undefined,
        role,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      await db.collection(collections.users).doc(userCredential.user.uid).set({
        ...userData,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });

      return {success: true, user: userData};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Sign in with email and password
  async signIn(
    email: string,
    password: string,
  ): Promise<{success: boolean; user?: User; error?: string}> {
    try {
      const userCredential = await authentication.signInWithEmailAndPassword(
        email,
        password,
      );

      // Update last login time
      await db
        .collection(collections.users)
        .doc(userCredential.user.uid)
        .update({
          lastLoginAt: new Date().toISOString(),
        });

      // Get user data from Firestore
      const userDoc = await db
        .collection(collections.users)
        .doc(userCredential.user.uid)
        .get();

      if (userDoc.exists) {
        const userData = userDoc.data() as any;
        const user: User = {
          ...userData,
          createdAt: new Date(userData.createdAt),
          lastLoginAt: new Date(userData.lastLoginAt),
        };
        return {success: true, user};
      }

      return {success: false, error: 'User data not found'};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Sign out
  async signOut(): Promise<{success: boolean; error?: string}> {
    try {
      await authentication.signOut();
      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Reset password
  async resetPassword(
    email: string,
  ): Promise<{success: boolean; error?: string}> {
    try {
      await authentication.sendPasswordResetEmail(email);
      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Get current user
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return authentication.currentUser;
  }

  // Get current user data
  async getCurrentUserData(): Promise<User | null> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) return null;

      const userDoc = await db
        .collection(collections.users)
        .doc(currentUser.uid)
        .get();

      if (userDoc.exists) {
        const userData = userDoc.data() as any;
        return {
          ...userData,
          createdAt: new Date(userData.createdAt),
          lastLoginAt: new Date(userData.lastLoginAt),
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting current user data:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(
    displayName?: string,
    photoURL?: string,
  ): Promise<{success: boolean; error?: string}> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return {success: false, error: 'No user logged in'};
      }

      const updateData: any = {};
      if (displayName) updateData.displayName = displayName;
      if (photoURL) updateData.photoURL = photoURL;

      // Update Firebase Auth profile
      await currentUser.updateProfile(updateData);

      // Update Firestore document
      await db.collection(collections.users).doc(currentUser.uid).update({
        ...updateData,
        updatedAt: new Date().toISOString(),
      });

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
    return authentication.onAuthStateChanged(callback);
  }

  // Delete user account
  async deleteAccount(): Promise<{success: boolean; error?: string}> {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return {success: false, error: 'No user logged in'};
      }

      // Delete user document from Firestore
      await db.collection(collections.users).doc(currentUser.uid).delete();

      // Delete Firebase Auth account
      await currentUser.delete();

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }
}

export default new AuthService();