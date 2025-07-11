// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'participant' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  logo?: string;
  members: TeamMember[];
  captainId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  displayName: string;
  role: 'captain' | 'member';
  joinedAt: Date;
}

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  description: string;
  logo?: string;
  game: GameType;
  format: TournamentFormat;
  maxParticipants: number;
  currentParticipants: number;
  registrationStart: Date;
  registrationEnd: Date;
  tournamentStart: Date;
  tournamentEnd: Date;
  prizePool: PrizePool;
  rules: string;
  isPublic: boolean;
  inviteCode?: string;
  status: TournamentStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GameType = 
  | 'Mobile Legends'
  | 'Valorant'
  | 'PUBG Mobile'
  | 'Free Fire'
  | 'eFootball'
  | 'Dota 2'
  | 'League of Legends'
  | 'CS:GO'
  | 'FIFA'
  | 'Other';

export type TournamentFormat = 
  | 'Single Elimination'
  | 'Double Elimination'
  | 'Round Robin'
  | 'Swiss System';

export type TournamentStatus = 
  | 'draft'
  | 'registration_open'
  | 'registration_closed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface PrizePool {
  first: number;
  second: number;
  third: number;
  currency: string;
}

// Match Types
export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  team1Id: string;
  team2Id: string;
  team1Score?: number;
  team2Score?: number;
  winnerId?: string;
  status: MatchStatus;
  scheduledTime?: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type MatchStatus = 
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

// Bracket Types
export interface Bracket {
  id: string;
  tournamentId: string;
  rounds: BracketRound[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BracketRound {
  roundNumber: number;
  matches: Match[];
}

// Registration Types
export interface Registration {
  id: string;
  tournamentId: string;
  teamId: string;
  status: RegistrationStatus;
  registeredAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  checkedInAt?: Date;
}

export type RegistrationStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'checked_in';

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 
  | 'match_schedule'
  | 'match_result'
  | 'tournament_announcement'
  | 'registration_approved'
  | 'registration_rejected'
  | 'check_in_reminder';

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  AdminDashboard: undefined;
  ParticipantDashboard: undefined;
  TournamentList: undefined;
  TournamentDetail: { tournamentId: string };
  CreateTournament: undefined;
  EditTournament: { tournamentId: string };
  TeamList: undefined;
  TeamDetail: { teamId: string };
  CreateTeam: undefined;
  EditTeam: { teamId: string };
  BracketView: { tournamentId: string };
  MatchDetail: { matchId: string };
  Profile: undefined;
  Settings: undefined;
};

export type AdminTabParamList = {
  Dashboard: undefined;
  Tournaments: undefined;
  Teams: undefined;
  Participants: undefined;
  Settings: undefined;
};

export type ParticipantTabParamList = {
  Dashboard: undefined;
  Tournaments: undefined;
  MyTeam: undefined;
  Profile: undefined;
  Settings: undefined;
};