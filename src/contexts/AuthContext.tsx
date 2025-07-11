import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: 'admin' | 'participant') => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement Firebase auth state listener
    // const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
    //   if (firebaseUser) {
    //     // Fetch user data from Firestore
    //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    //     if (userDoc.exists()) {
    //       setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
    //     }
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });

    // For now, simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // TODO: Implement Firebase sign in
      // const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in:', email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string, role: 'admin' | 'participant') => {
    try {
      setLoading(true);
      // TODO: Implement Firebase sign up
      // const result = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(result.user, { displayName });
      // await setDoc(doc(db, 'users', result.user.uid), {
      //   email,
      //   displayName,
      //   role,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // });
      console.log('Sign up:', email, displayName, role);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // TODO: Implement Firebase sign out
      // await signOut(auth);
      setUser(null);
      console.log('Sign out');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // TODO: Implement profile update
      // await updateDoc(doc(db, 'users', user.id), {
      //   ...updates,
      //   updatedAt: new Date(),
      // });
      
      setUser(prev => prev ? { ...prev, ...updates } : null);
      console.log('Profile updated:', updates);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};