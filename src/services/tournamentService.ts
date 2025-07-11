import {db, collections} from './firebase';
import {
  Tournament,
  TournamentStatus,
  TournamentParticipation,
  ParticipationStatus,
  Match,
  MatchStatus,
  Bracket,
  CreateTournamentForm,
  TournamentFormat,
} from '../types';
import authService from './authService';

class TournamentService {
  // Create new tournament
  async createTournament(
    tournamentData: CreateTournamentForm,
  ): Promise<{success: boolean; tournamentId?: string; error?: string}> {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        return {success: false, error: 'User not authenticated'};
      }

      const tournament: Omit<Tournament, 'id'> = {
        name: tournamentData.name,
        description: tournamentData.description,
        game: tournamentData.game,
        format: tournamentData.format,
        maxParticipants: tournamentData.maxParticipants,
        currentParticipants: 0,
        registrationStart: tournamentData.registrationStart,
        registrationEnd: tournamentData.registrationEnd,
        tournamentStart: tournamentData.tournamentStart,
        tournamentEnd: tournamentData.tournamentEnd,
        prizePool: tournamentData.prizePool,
        rules: tournamentData.rules,
        isPublic: tournamentData.isPublic,
        inviteCode: tournamentData.isPublic
          ? undefined
          : this.generateInviteCode(),
        status: TournamentStatus.DRAFT,
        organizerId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await db.collection(collections.tournaments).add({
        ...tournament,
        registrationStart: tournament.registrationStart.toISOString(),
        registrationEnd: tournament.registrationEnd.toISOString(),
        tournamentStart: tournament.tournamentStart.toISOString(),
        tournamentEnd: tournament.tournamentEnd.toISOString(),
        createdAt: tournament.createdAt.toISOString(),
        updatedAt: tournament.updatedAt.toISOString(),
      });

      return {success: true, tournamentId: docRef.id};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Get tournament by ID
  async getTournament(
    tournamentId: string,
  ): Promise<{success: boolean; tournament?: Tournament; error?: string}> {
    try {
      const doc = await db
        .collection(collections.tournaments)
        .doc(tournamentId)
        .get();

      if (!doc.exists) {
        return {success: false, error: 'Tournament not found'};
      }

      const data = doc.data() as any;
      const tournament: Tournament = {
        id: doc.id,
        ...data,
        registrationStart: new Date(data.registrationStart),
        registrationEnd: new Date(data.registrationEnd),
        tournamentStart: new Date(data.tournamentStart),
        tournamentEnd: new Date(data.tournamentEnd),
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      return {success: true, tournament};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Get tournaments list with filters
  async getTournaments(
    isPublic: boolean = true,
    status?: TournamentStatus,
  ): Promise<{success: boolean; tournaments?: Tournament[]; error?: string}> {
    try {
      let query = db
        .collection(collections.tournaments)
        .where('isPublic', '==', isPublic);

      if (status) {
        query = query.where('status', '==', status);
      }

      const snapshot = await query.orderBy('createdAt', 'desc').get();

      const tournaments: Tournament[] = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          registrationStart: new Date(data.registrationStart),
          registrationEnd: new Date(data.registrationEnd),
          tournamentStart: new Date(data.tournamentStart),
          tournamentEnd: new Date(data.tournamentEnd),
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
      });

      return {success: true, tournaments};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Update tournament status
  async updateTournamentStatus(
    tournamentId: string,
    status: TournamentStatus,
  ): Promise<{success: boolean; error?: string}> {
    try {
      await db.collection(collections.tournaments).doc(tournamentId).update({
        status,
        updatedAt: new Date().toISOString(),
      });

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Register team for tournament
  async registerTeam(
    tournamentId: string,
    teamId: string,
  ): Promise<{success: boolean; error?: string}> {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        return {success: false, error: 'User not authenticated'};
      }

      // Check if already registered
      const existingRegistration = await db
        .collection(collections.participations)
        .where('tournamentId', '==', tournamentId)
        .where('teamId', '==', teamId)
        .get();

      if (!existingRegistration.empty) {
        return {success: false, error: 'Team already registered'};
      }

      const participation: Omit<TournamentParticipation, 'id'> = {
        tournamentId,
        teamId,
        registeredAt: new Date(),
        status: ParticipationStatus.PENDING,
        checkedIn: false,
      };

      await db.collection(collections.participations).add({
        ...participation,
        registeredAt: participation.registeredAt.toISOString(),
      });

      // Update tournament participant count
      await db
        .collection(collections.tournaments)
        .doc(tournamentId)
        .update({
          currentParticipants: db.FieldValue.increment(1),
          updatedAt: new Date().toISOString(),
        });

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Approve team registration
  async approveRegistration(
    participationId: string,
  ): Promise<{success: boolean; error?: string}> {
    try {
      await db.collection(collections.participations).doc(participationId).update({
        status: ParticipationStatus.APPROVED,
      });

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Generate tournament bracket
  async generateBracket(
    tournamentId: string,
  ): Promise<{success: boolean; error?: string}> {
    try {
      // Get approved participants
      const participantsSnapshot = await db
        .collection(collections.participations)
        .where('tournamentId', '==', tournamentId)
        .where('status', '==', ParticipationStatus.APPROVED)
        .get();

      const teamIds = participantsSnapshot.docs.map(doc => doc.data().teamId);

      if (teamIds.length < 2) {
        return {success: false, error: 'Not enough teams to generate bracket'};
      }

      // Get tournament data
      const tournamentResult = await this.getTournament(tournamentId);
      if (!tournamentResult.success || !tournamentResult.tournament) {
        return {success: false, error: 'Tournament not found'};
      }

      const tournament = tournamentResult.tournament;
      const matches = this.createBracketMatches(teamIds, tournament.format);

      // Save matches to database
      const batch = db.batch();
      matches.forEach(match => {
        const docRef = db.collection(collections.matches).doc();
        batch.set(docRef, {
          ...match,
          id: docRef.id,
          scheduledAt: match.scheduledAt?.toISOString(),
          startedAt: match.startedAt?.toISOString(),
          completedAt: match.completedAt?.toISOString(),
          createdAt: match.createdAt.toISOString(),
          updatedAt: match.updatedAt.toISOString(),
        });
      });

      await batch.commit();

      // Update tournament status
      await this.updateTournamentStatus(tournamentId, TournamentStatus.ONGOING);

      return {success: true};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Create bracket matches based on format
  private createBracketMatches(
    teamIds: string[],
    format: TournamentFormat,
  ): Omit<Match, 'id'>[] {
    const matches: Omit<Match, 'id'>[] = [];
    const shuffledTeams = [...teamIds].sort(() => Math.random() - 0.5);

    if (format === TournamentFormat.SINGLE_ELIMINATION) {
      return this.createSingleEliminationMatches(shuffledTeams);
    } else if (format === TournamentFormat.DOUBLE_ELIMINATION) {
      return this.createDoubleEliminationMatches(shuffledTeams);
    }

    return matches;
  }

  // Create single elimination bracket
  private createSingleEliminationMatches(teamIds: string[]): Omit<Match, 'id'>[] {
    const matches: Omit<Match, 'id'>[] = [];
    let round = 1;
    let matchNumber = 1;

    // First round
    for (let i = 0; i < teamIds.length; i += 2) {
      const match: Omit<Match, 'id'> = {
        tournamentId: '', // Will be set by caller
        round,
        matchNumber: matchNumber++,
        team1Id: teamIds[i],
        team2Id: teamIds[i + 1] || undefined,
        status: MatchStatus.PENDING,
        screenshots: [],
        disputes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      matches.push(match);
    }

    return matches;
  }

  // Create double elimination bracket (simplified)
  private createDoubleEliminationMatches(teamIds: string[]): Omit<Match, 'id'>[] {
    // This is a simplified version - full double elimination is more complex
    return this.createSingleEliminationMatches(teamIds);
  }

  // Generate invite code
  private generateInviteCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Get tournament participants
  async getTournamentParticipants(
    tournamentId: string,
  ): Promise<{
    success: boolean;
    participants?: TournamentParticipation[];
    error?: string;
  }> {
    try {
      const snapshot = await db
        .collection(collections.participations)
        .where('tournamentId', '==', tournamentId)
        .get();

      const participants: TournamentParticipation[] = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          registeredAt: new Date(data.registeredAt),
          checkedInAt: data.checkedInAt ? new Date(data.checkedInAt) : undefined,
        };
      });

      return {success: true, participants};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }

  // Get tournament matches
  async getTournamentMatches(
    tournamentId: string,
  ): Promise<{success: boolean; matches?: Match[]; error?: string}> {
    try {
      const snapshot = await db
        .collection(collections.matches)
        .where('tournamentId', '==', tournamentId)
        .orderBy('round')
        .orderBy('matchNumber')
        .get();

      const matches: Match[] = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
          startedAt: data.startedAt ? new Date(data.startedAt) : undefined,
          completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
      });

      return {success: true, matches};
    } catch (error: any) {
      return {success: false, error: error.message};
    }
  }
}

export default new TournamentService();