export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'participant' | 'viewer';
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  captainId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'captain' | 'member';
  joinedAt: Date;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
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
  organizerId: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  round: number;
  matchNumber: number;
  status: MatchStatus;
  scheduledTime: Date;
  winnerId?: string;
  loserId?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  team1Score: number;
  team2Score: number;
  winnerId?: string;
  status: MatchStatus;
  scheduledTime: Date;
}

export interface PrizePool {
  first: number;
  second: number;
  third: number;
  currency: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: any;
  createdAt: Date;
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

export type MatchStatus = 
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export type NotificationType = 
  | 'match-schedule'
  | 'match-result'
  | 'tournament-update'
  | 'registration-approved'
  | 'registration-rejected'
  | 'general';

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

export type RegistrationStatus = 
  | 'pending'
  | 'approved'
  | 'rejected';

export interface Dispute {
  id: string;
  matchId: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  evidence?: string[];
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type DisputeStatus = 
  | 'open'
  | 'under-review'
  | 'resolved'
  | 'dismissed';