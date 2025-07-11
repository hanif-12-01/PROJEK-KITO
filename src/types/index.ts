// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt: Date;
}

export enum UserRole {
  ORGANIZER = 'organizer',
  PARTICIPANT = 'participant',
  SPECTATOR = 'spectator'
}

// Game Types
export enum GameType {
  MOBILE_LEGENDS = 'mobile_legends',
  VALORANT = 'valorant',
  PUBG_MOBILE = 'pubg_mobile',
  FREE_FIRE = 'free_fire',
  EFOOTBALL = 'efootball',
  CALL_OF_DUTY = 'call_of_duty',
  OTHER = 'other'
}

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  logoURL?: string;
  description: string;
  game: GameType;
  format: TournamentFormat;
  maxParticipants: number;
  currentParticipants: number;
  registrationStart: Date;
  registrationEnd: Date;
  tournamentStart: Date;
  tournamentEnd: Date;
  prizePool: string;
  rules: string;
  isPublic: boolean;
  inviteCode?: string;
  status: TournamentStatus;
  organizerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TournamentFormat {
  SINGLE_ELIMINATION = 'single_elimination',
  DOUBLE_ELIMINATION = 'double_elimination',
  ROUND_ROBIN = 'round_robin'
}

export enum TournamentStatus {
  DRAFT = 'draft',
  REGISTRATION_OPEN = 'registration_open',
  REGISTRATION_CLOSED = 'registration_closed',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Team Types
export interface Team {
  id: string;
  name: string;
  logoURL?: string;
  description?: string;
  captainId: string;
  members: TeamMember[];
  tournamentIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  displayName: string;
  role: TeamMemberRole;
  joinedAt: Date;
}

export enum TeamMemberRole {
  CAPTAIN = 'captain',
  MEMBER = 'member'
}

// Tournament Participation
export interface TournamentParticipation {
  id: string;
  tournamentId: string;
  teamId: string;
  registeredAt: Date;
  status: ParticipationStatus;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export enum ParticipationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn'
}

// Match Types
export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  team1Id?: string;
  team2Id?: string;
  winnerId?: string;
  loserId?: string;
  score1?: number;
  score2?: number;
  status: MatchStatus;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  nextMatchId?: string;
  loserNextMatchId?: string; // For double elimination
  screenshots: MatchScreenshot[];
  disputes: Dispute[];
  createdAt: Date;
  updatedAt: Date;
}

export enum MatchStatus {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  COMPLETED = 'completed',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled'
}

export interface MatchScreenshot {
  id: string;
  imageURL: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Bracket Types
export interface Bracket {
  id: string;
  tournamentId: string;
  matches: Match[];
  rounds: BracketRound[];
  generated: boolean;
  generatedAt?: Date;
}

export interface BracketRound {
  roundNumber: number;
  name: string;
  matches: string[]; // Match IDs
}

// Dispute Types
export interface Dispute {
  id: string;
  matchId: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  resolvedBy?: string;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export enum DisputeStatus {
  OPEN = 'open',
  UNDER_REVIEW = 'under_review',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  TOURNAMENT_REGISTRATION = 'tournament_registration',
  MATCH_SCHEDULED = 'match_scheduled',
  MATCH_STARTING = 'match_starting',
  MATCH_COMPLETED = 'match_completed',
  TOURNAMENT_UPDATE = 'tournament_update',
  DISPUTE_FILED = 'dispute_filed',
  DISPUTE_RESOLVED = 'dispute_resolved',
  GENERAL = 'general'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Screen Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  TournamentDetails: { tournamentId: string };
  CreateTournament: undefined;
  EditTournament: { tournamentId: string };
  TeamProfile: { teamId: string };
  CreateTeam: undefined;
  EditTeam: { teamId: string };
  MatchDetails: { matchId: string };
  BracketView: { tournamentId: string };
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Tournaments: undefined;
  MyTeams: undefined;
  Notifications: undefined;
  Profile: undefined;
};

// Form Types
export interface CreateTournamentForm {
  name: string;
  description: string;
  game: GameType;
  format: TournamentFormat;
  maxParticipants: number;
  registrationStart: Date;
  registrationEnd: Date;
  tournamentStart: Date;
  tournamentEnd: Date;
  prizePool: string;
  rules: string;
  isPublic: boolean;
  logoFile?: any;
}

export interface CreateTeamForm {
  name: string;
  description?: string;
  logoFile?: any;
}