import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Tournament, TournamentStatus, GameType, TournamentFormat } from '../types';

export const createTournament = async (tournamentData: Omit<Tournament, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'tournaments'), {
      ...tournamentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(`Error creating tournament: ${error.message}`);
  }
};

export const updateTournament = async (id: string, updates: Partial<Tournament>): Promise<void> => {
  try {
    const tournamentRef = doc(db, 'tournaments', id);
    await updateDoc(tournamentRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    throw new Error(`Error updating tournament: ${error.message}`);
  }
};

export const deleteTournament = async (id: string): Promise<void> => {
  try {
    const tournamentRef = doc(db, 'tournaments', id);
    await deleteDoc(tournamentRef);
  } catch (error: any) {
    throw new Error(`Error deleting tournament: ${error.message}`);
  }
};

export const getTournament = async (id: string): Promise<Tournament | null> => {
  try {
    const tournamentRef = doc(db, 'tournaments', id);
    const tournamentDoc = await getDoc(tournamentRef);
    
    if (tournamentDoc.exists()) {
      const data = tournamentDoc.data();
      return {
        id: tournamentDoc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        registrationStart: data.registrationStart.toDate(),
        registrationEnd: data.registrationEnd.toDate(),
        tournamentStart: data.tournamentStart.toDate(),
        tournamentEnd: data.tournamentEnd.toDate(),
      } as Tournament;
    }
    
    return null;
  } catch (error: any) {
    throw new Error(`Error getting tournament: ${error.message}`);
  }
};

export const getTournaments = async (
  filters?: {
    status?: TournamentStatus;
    game?: GameType;
    isPublic?: boolean;
    organizerId?: string;
  },
  limitCount?: number
): Promise<Tournament[]> => {
  try {
    let q = collection(db, 'tournaments');
    const constraints: any[] = [];
    
    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters?.game) {
      constraints.push(where('game', '==', filters.game));
    }
    
    if (filters?.isPublic !== undefined) {
      constraints.push(where('isPublic', '==', filters.isPublic));
    }
    
    if (filters?.organizerId) {
      constraints.push(where('organizerId', '==', filters.organizerId));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    if (limitCount) {
      constraints.push(limit(limitCount));
    }
    
    const querySnapshot = await getDocs(query(q, ...constraints));
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        registrationStart: data.registrationStart.toDate(),
        registrationEnd: data.registrationEnd.toDate(),
        tournamentStart: data.tournamentStart.toDate(),
        tournamentEnd: data.tournamentEnd.toDate(),
      } as Tournament;
    });
  } catch (error: any) {
    throw new Error(`Error getting tournaments: ${error.message}`);
  }
};

export const subscribeToTournaments = (
  callback: (tournaments: Tournament[]) => void,
  filters?: {
    status?: TournamentStatus;
    game?: GameType;
    isPublic?: boolean;
    organizerId?: string;
  }
) => {
  let q = collection(db, 'tournaments');
  const constraints: any[] = [];
  
  if (filters?.status) {
    constraints.push(where('status', '==', filters.status));
  }
  
  if (filters?.game) {
    constraints.push(where('game', '==', filters.game));
  }
  
  if (filters?.isPublic !== undefined) {
    constraints.push(where('isPublic', '==', filters.isPublic));
  }
  
  if (filters?.organizerId) {
    constraints.push(where('organizerId', '==', filters.organizerId));
  }
  
  constraints.push(orderBy('createdAt', 'desc'));
  
  return onSnapshot(query(q, ...constraints), (querySnapshot) => {
    const tournaments = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        registrationStart: data.registrationStart.toDate(),
        registrationEnd: data.registrationEnd.toDate(),
        tournamentStart: data.tournamentStart.toDate(),
        tournamentEnd: data.tournamentEnd.toDate(),
      } as Tournament;
    });
    
    callback(tournaments);
  });
};

export const generateBracket = async (tournamentId: string): Promise<void> => {
  try {
    // This is a placeholder for bracket generation logic
    // In a real implementation, you would:
    // 1. Get all approved participants
    // 2. Generate bracket structure based on tournament format
    // 3. Create matches
    // 4. Update tournament status
    
    await updateTournament(tournamentId, {
      status: 'in-progress',
    });
  } catch (error: any) {
    throw new Error(`Error generating bracket: ${error.message}`);
  }
};