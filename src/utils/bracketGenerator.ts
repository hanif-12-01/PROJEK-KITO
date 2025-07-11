import { Match, TournamentFormat } from '../types';

interface BracketMatch {
  id: string;
  round: number;
  matchNumber: number;
  team1Id?: string;
  team2Id?: string;
  winnerId?: string;
  nextMatchId?: string;
}

export class BracketGenerator {
  private teams: string[];
  private format: TournamentFormat;
  private matches: BracketMatch[] = [];

  constructor(teams: string[], format: TournamentFormat) {
    this.teams = teams;
    this.format = format;
  }

  generateBracket(): BracketMatch[] {
    this.matches = [];
    
    switch (this.format) {
      case 'Single Elimination':
        return this.generateSingleElimination();
      case 'Double Elimination':
        return this.generateDoubleElimination();
      case 'Round Robin':
        return this.generateRoundRobin();
      default:
        return this.generateSingleElimination();
    }
  }

  private generateSingleElimination(): BracketMatch[] {
    const numTeams = this.teams.length;
    const numRounds = Math.ceil(Math.log2(numTeams));
    const totalMatches = Math.pow(2, numRounds) - 1;
    
    // Add byes if needed
    const teamsWithByes = [...this.teams];
    while (teamsWithByes.length < Math.pow(2, numRounds)) {
      teamsWithByes.push('BYE');
    }

    // Shuffle teams for random seeding
    this.shuffleArray(teamsWithByes);

    // Generate first round matches
    const firstRoundMatches = Math.pow(2, numRounds - 1);
    for (let i = 0; i < firstRoundMatches; i++) {
      const team1Index = i * 2;
      const team2Index = i * 2 + 1;
      
      const match: BracketMatch = {
        id: `match_${i + 1}`,
        round: 1,
        matchNumber: i + 1,
        team1Id: teamsWithByes[team1Index] === 'BYE' ? undefined : teamsWithByes[team1Index],
        team2Id: teamsWithByes[team2Index] === 'BYE' ? undefined : teamsWithByes[team2Index],
        nextMatchId: `match_${Math.floor(i / 2) + firstRoundMatches + 1}`,
      };

      // If one team is BYE, automatically advance the other team
      if (teamsWithByes[team1Index] === 'BYE' && teamsWithByes[team2Index] !== 'BYE') {
        match.winnerId = teamsWithByes[team2Index];
      } else if (teamsWithByes[team2Index] === 'BYE' && teamsWithByes[team1Index] !== 'BYE') {
        match.winnerId = teamsWithByes[team1Index];
      }

      this.matches.push(match);
    }

    // Generate subsequent rounds
    for (let round = 2; round <= numRounds; round++) {
      const matchesInRound = Math.pow(2, numRounds - round);
      const startMatchNumber = this.matches.length + 1;
      
      for (let i = 0; i < matchesInRound; i++) {
        const match: BracketMatch = {
          id: `match_${startMatchNumber + i}`,
          round,
          matchNumber: startMatchNumber + i,
          nextMatchId: round < numRounds ? `match_${startMatchNumber + matchesInRound + Math.floor(i / 2)}` : undefined,
        };
        
        this.matches.push(match);
      }
    }

    return this.matches;
  }

  private generateDoubleElimination(): BracketMatch[] {
    // Generate winners bracket (single elimination)
    const winnersBracket = this.generateSingleElimination();
    
    // Generate losers bracket
    const losersBracket = this.generateLosersBracket();
    
    // Generate finals
    const finals = this.generateFinals();
    
    return [...winnersBracket, ...losersBracket, ...finals];
  }

  private generateLosersBracket(): BracketMatch[] {
    const numTeams = this.teams.length;
    const numRounds = Math.ceil(Math.log2(numTeams)) * 2 - 1;
    const losersBracket: BracketMatch[] = [];
    
    // Losers bracket has more complex structure
    // This is a simplified version
    for (let round = 1; round <= numRounds; round++) {
      const matchesInRound = Math.max(1, Math.floor(numTeams / Math.pow(2, round)));
      
      for (let i = 0; i < matchesInRound; i++) {
        const match: BracketMatch = {
          id: `losers_match_${round}_${i + 1}`,
          round,
          matchNumber: i + 1,
        };
        
        losersBracket.push(match);
      }
    }
    
    return losersBracket;
  }

  private generateFinals(): BracketMatch[] {
    return [
      {
        id: 'final_match',
        round: 999, // Special round for finals
        matchNumber: 1,
      },
      {
        id: 'grand_final_match',
        round: 1000, // Special round for grand finals
        matchNumber: 1,
      },
    ];
  }

  private generateRoundRobin(): BracketMatch[] {
    const matches: BracketMatch[] = [];
    const numTeams = this.teams.length;
    let matchNumber = 1;

    // Generate all possible pairings
    for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        const match: BracketMatch = {
          id: `round_robin_match_${matchNumber}`,
          round: 1, // All matches in same round for round robin
          matchNumber,
          team1Id: this.teams[i],
          team2Id: this.teams[j],
        };
        
        matches.push(match);
        matchNumber++;
      }
    }

    return matches;
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Convert bracket matches to Firestore format
  static convertToFirestoreMatches(bracketMatches: BracketMatch[], tournamentId: string): Omit<Match, 'id' | 'createdAt' | 'updatedAt'>[] {
    return bracketMatches.map(match => ({
      tournamentId,
      round: match.round,
      matchNumber: match.matchNumber,
      team1Id: match.team1Id,
      team2Id: match.team2Id,
      winnerId: match.winnerId,
      status: match.winnerId ? 'completed' : 'scheduled',
      scheduledTime: undefined,
      actualStartTime: undefined,
      actualEndTime: undefined,
    }));
  }

  // Get next match for a team
  static getNextMatch(matches: Match[], currentMatchId: string, winnerId: string): Match | null {
    const currentMatch = matches.find(m => m.id === currentMatchId);
    if (!currentMatch) return null;

    // Find the next match in the bracket
    const nextMatch = matches.find(m => 
      m.round === currentMatch.round + 1 && 
      (m.team1Id === winnerId || m.team2Id === winnerId)
    );

    return nextMatch || null;
  }

  // Check if tournament is complete
  static isTournamentComplete(matches: Match[]): boolean {
    const finalMatches = matches.filter(m => m.round === Math.max(...matches.map(match => match.round)));
    return finalMatches.every(match => match.status === 'completed');
  }

  // Get tournament winner
  static getTournamentWinner(matches: Match[]): string | null {
    const finalRound = Math.max(...matches.map(m => m.round));
    const finalMatch = matches.find(m => m.round === finalRound && m.status === 'completed');
    return finalMatch?.winnerId || null;
  }
}