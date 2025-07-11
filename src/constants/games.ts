import { GameType, TournamentFormat } from '../types';
import { colors } from './theme';

export const GAMES: Record<GameType, {
  name: string;
  icon: string;
  color: string;
  description: string;
  maxTeamSize: number;
  minTeamSize: number;
}> = {
  'mobile-legends': {
    name: 'Mobile Legends',
    icon: '🎮',
    color: colors.mobileLegends,
    description: 'MOBA mobile game dengan 5v5 battle',
    maxTeamSize: 5,
    minTeamSize: 5,
  },
  'valorant': {
    name: 'Valorant',
    icon: '🔫',
    color: colors.valorant,
    description: 'Tactical shooter 5v5 dengan karakter unik',
    maxTeamSize: 5,
    minTeamSize: 5,
  },
  'pubg-mobile': {
    name: 'PUBG Mobile',
    icon: '🎯',
    color: colors.pubgMobile,
    description: 'Battle royale mobile dengan 100 pemain',
    maxTeamSize: 4,
    minTeamSize: 1,
  },
  'free-fire': {
    name: 'Free Fire',
    icon: '🔥',
    color: colors.freeFire,
    description: 'Battle royale mobile yang cepat dan intens',
    maxTeamSize: 4,
    minTeamSize: 1,
  },
  'efootball': {
    name: 'eFootball',
    icon: '⚽',
    color: colors.efootball,
    description: 'Simulasi sepak bola realistis',
    maxTeamSize: 11,
    minTeamSize: 1,
  },
  'dota2': {
    name: 'Dota 2',
    icon: '🗡️',
    color: colors.dota2,
    description: 'MOBA PC dengan strategi kompleks',
    maxTeamSize: 5,
    minTeamSize: 5,
  },
  'csgo': {
    name: 'CS:GO',
    icon: '🎯',
    color: colors.csgo,
    description: 'Tactical shooter 5v5 klasik',
    maxTeamSize: 5,
    minTeamSize: 5,
  },
  'lol': {
    name: 'League of Legends',
    icon: '⚔️',
    color: colors.lol,
    description: 'MOBA PC dengan 140+ champion',
    maxTeamSize: 5,
    minTeamSize: 5,
  },
};

export const TOURNAMENT_FORMATS: Record<TournamentFormat, {
  name: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}> = {
  'single-elimination': {
    name: 'Single Elimination',
    description: 'Setiap tim hanya memiliki satu kesempatan. Jika kalah, langsung tersingkir.',
    advantages: [
      'Cepat selesai',
      'Jumlah pertandingan minimal',
      'Cocok untuk turnamen besar',
    ],
    disadvantages: [
      'Tim yang kalah tidak ada kesempatan kedua',
      'Bisa ada tim yang tidak puas',
    ],
  },
  'double-elimination': {
    name: 'Double Elimination',
    description: 'Tim harus kalah dua kali untuk tersingkir. Ada upper dan lower bracket.',
    advantages: [
      'Tim mendapat kesempatan kedua',
      'Lebih fair untuk semua tim',
      'Menghasilkan pemenang yang lebih kuat',
    ],
    disadvantages: [
      'Lebih banyak pertandingan',
      'Lebih lama selesai',
      'Kompleks untuk diatur',
    ],
  },
  'round-robin': {
    name: 'Round Robin',
    description: 'Setiap tim bertanding melawan semua tim lainnya.',
    advantages: [
      'Sangat fair',
      'Semua tim bertemu semua',
      'Ranking yang akurat',
    ],
    disadvantages: [
      'Banyak pertandingan',
      'Sangat lama selesai',
      'Tidak cocok untuk turnamen besar',
    ],
  },
};

export const getGameColor = (gameType: GameType): string => {
  return GAMES[gameType].color;
};

export const getGameName = (gameType: GameType): string => {
  return GAMES[gameType].name;
};

export const getFormatName = (format: TournamentFormat): string => {
  return TOURNAMENT_FORMATS[format].name;
};