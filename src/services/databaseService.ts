import firestore from '@react-native-firebase/firestore';
import { 
  Tournament, 
  Team, 
  User, 
  Match, 
  Registration, 
  Notification 
} from '../types';

class DatabaseService {
  // Tournament operations
  async createTournament(tournament: Omit<Tournament, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await firestore().collection('tournaments').add({
        ...tournament,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  }

  async getTournament(tournamentId: string): Promise<Tournament | null> {
    try {
      const doc = await firestore().collection('tournaments').doc(tournamentId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as Tournament;
      }
      return null;
    } catch (error) {
      console.error('Error getting tournament:', error);
      throw error;
    }
  }

  async updateTournament(tournamentId: string, updates: Partial<Tournament>): Promise<void> {
    try {
      await firestore().collection('tournaments').doc(tournamentId).update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  }

  async getPublicTournaments(): Promise<Tournament[]> {
    try {
      const snapshot = await firestore()
        .collection('tournaments')
        .where('isPublic', '==', true)
        .where('status', 'in', ['registration_open', 'in_progress'])
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Tournament);
    } catch (error) {
      console.error('Error getting public tournaments:', error);
      throw error;
    }
  }

  // Team operations
  async createTeam(team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await firestore().collection('teams').add({
        ...team,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  async getTeam(teamId: string): Promise<Team | null> {
    try {
      const doc = await firestore().collection('teams').doc(teamId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as Team;
      }
      return null;
    } catch (error) {
      console.error('Error getting team:', error);
      throw error;
    }
  }

  async updateTeam(teamId: string, updates: Partial<Team>): Promise<void> {
    try {
      await firestore().collection('teams').doc(teamId).update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  // User operations
  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      await firestore().collection('users').doc(user.id).set({
        ...user,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<User | null> {
    try {
      const doc = await firestore().collection('users').doc(userId).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    try {
      await firestore().collection('users').doc(userId).update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Registration operations
  async registerTeam(tournamentId: string, teamId: string): Promise<string> {
    try {
      const docRef = await firestore().collection('registrations').add({
        tournamentId,
        teamId,
        status: 'pending',
        registeredAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error registering team:', error);
      throw error;
    }
  }

  async getTournamentRegistrations(tournamentId: string): Promise<Registration[]> {
    try {
      const snapshot = await firestore()
        .collection('registrations')
        .where('tournamentId', '==', tournamentId)
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Registration);
    } catch (error) {
      console.error('Error getting tournament registrations:', error);
      throw error;
    }
  }

  async updateRegistrationStatus(registrationId: string, status: Registration['status']): Promise<void> {
    try {
      const updates: any = { status };
      if (status === 'approved') {
        updates.approvedAt = firestore.FieldValue.serverTimestamp();
      } else if (status === 'rejected') {
        updates.rejectedAt = firestore.FieldValue.serverTimestamp();
      } else if (status === 'checked_in') {
        updates.checkedInAt = firestore.FieldValue.serverTimestamp();
      }

      await firestore().collection('registrations').doc(registrationId).update(updates);
    } catch (error) {
      console.error('Error updating registration status:', error);
      throw error;
    }
  }

  // Match operations
  async createMatch(match: Omit<Match, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await firestore().collection('matches').add({
        ...match,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  }

  async getTournamentMatches(tournamentId: string): Promise<Match[]> {
    try {
      const snapshot = await firestore()
        .collection('matches')
        .where('tournamentId', '==', tournamentId)
        .orderBy('round', 'asc')
        .orderBy('matchNumber', 'asc')
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Match);
    } catch (error) {
      console.error('Error getting tournament matches:', error);
      throw error;
    }
  }

  async updateMatchScore(matchId: string, team1Score: number, team2Score: number): Promise<void> {
    try {
      const winnerId = team1Score > team2Score ? 'team1' : 'team2';
      await firestore().collection('matches').doc(matchId).update({
        team1Score,
        team2Score,
        winnerId,
        status: 'completed',
        actualEndTime: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating match score:', error);
      throw error;
    }
  }

  // Notification operations
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await firestore().collection('notifications').add({
        ...notification,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      const snapshot = await firestore()
        .collection('notifications')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notification);
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await firestore().collection('notifications').doc(notificationId).update({
        isRead: true,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Real-time listeners
  onTournamentUpdate(tournamentId: string, callback: (tournament: Tournament) => void) {
    return firestore()
      .collection('tournaments')
      .doc(tournamentId)
      .onSnapshot(doc => {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() } as Tournament);
        }
      });
  }

  onMatchUpdate(matchId: string, callback: (match: Match) => void) {
    return firestore()
      .collection('matches')
      .doc(matchId)
      .onSnapshot(doc => {
        if (doc.exists) {
          callback({ id: doc.id, ...doc.data() } as Match);
        }
      });
  }

  onUserNotifications(userId: string, callback: (notifications: Notification[]) => void) {
    return firestore()
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot(snapshot => {
        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notification);
        callback(notifications);
      });
  }
}

export default new DatabaseService();