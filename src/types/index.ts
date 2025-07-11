export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'participant' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

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
  | 'mobile-legends'
  | 'valorant'
  | 'pubg-mobile'
  | 'free-fire'
  | 'efootball'
  | 'dota2'
  | 'csgo'
  | 'lol';

export type TournamentFormat = 
  | 'single-elimination'
  | 'double-elimination'
  | 'round-robin';

export type TournamentStatus = 
  | 'draft'
  | 'registration-open'
  | 'registration-closed'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface PrizePool {
  total: number;
  currency: string;
  distribution: PrizeDistribution[];
}

export interface PrizeDistribution {
  position: number;
  amount: number;
  percentage: number;
}

export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  teamId: string;
  status: RegistrationStatus;
  registeredAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

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
  startedAt?: Date;
  completedAt?: Date;
  notes?: string;
}

export type MatchStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Bracket {
  id: string;
  tournamentId: string;
  rounds: BracketRound[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BracketRound {
  round: number;
  matches: BracketMatch[];
}

export interface BracketMatch {
  id: string;
  team1Id?: string;
  team2Id?: string;
  winnerId?: string;
  nextMatchId?: string;
  position: number;
}

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

export type NotificationType = 
  | 'match-scheduled'
  | 'match-result'
  | 'tournament-update'
  | 'registration-approved'
  | 'registration-rejected'
  | 'general';

export interface Dispute {
  id: string;
  matchId: string;
  reportedBy: string;
  reason: string;
  description: string;
  evidence?: string[];
  status: DisputeStatus;
  resolvedBy?: string;
  resolution?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export type DisputeStatus = 'open' | 'under-review' | 'resolved' | 'dismissed';