import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Header, TournamentCard, Button } from '../components';
import { colors, spacing, typography } from '../constants/theme';
import { getTournaments, subscribeToTournaments } from '../services/tournament';
import { Tournament, User } from '../types';
import { GAMES } from '../constants/games';

interface HomeScreenProps {
  navigation: any;
  user: User;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, user }) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    loadTournaments();
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToTournaments(
      (updatedTournaments) => {
        setTournaments(updatedTournaments);
        setLoading(false);
      },
      { isPublic: true }
    );

    return () => unsubscribe();
  }, []);

  const loadTournaments = async () => {
    try {
      setLoading(true);
      const data = await getTournaments({ isPublic: true }, 10);
      setTournaments(data);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTournaments();
    setRefreshing(false);
  };

  const handleTournamentPress = (tournament: Tournament) => {
    navigation.navigate('TournamentDetail', { tournamentId: tournament.id });
  };

  const handleCreateTournament = () => {
    navigation.navigate('CreateTournament');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getActiveTournaments = () => {
    return tournaments.filter(t => 
      t.status === 'registration-open' || t.status === 'in-progress'
    );
  };

  const getUpcomingTournaments = () => {
    return tournaments.filter(t => 
      t.status === 'draft' || t.status === 'registration-open'
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Arena Master"
        subtitle={getGreeting()}
        rightIcon={
          <TouchableOpacity onPress={handleProfilePress}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            {getGreeting()}, {user.username}! 👋
          </Text>
          <Text style={styles.welcomeSubtext}>
            Siap bertanding hari ini?
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getActiveTournaments().length}</Text>
            <Text style={styles.statLabel}>Turnamen Aktif</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{tournaments.length}</Text>
            <Text style={styles.statLabel}>Total Turnamen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.role}</Text>
            <Text style={styles.statLabel}>Role Anda</Text>
          </View>
        </View>

        {/* Game Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Filter Game</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                !selectedGame && styles.filterChipActive
              ]}
              onPress={() => setSelectedGame(null)}
            >
              <Text style={[
                styles.filterChipText,
                !selectedGame && styles.filterChipTextActive
              ]}>
                Semua
              </Text>
            </TouchableOpacity>
            {Object.entries(GAMES).map(([key, game]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.filterChip,
                  selectedGame === key && styles.filterChipActive
                ]}
                onPress={() => setSelectedGame(key)}
              >
                <Text style={styles.filterChipIcon}>{game.icon}</Text>
                <Text style={[
                  styles.filterChipText,
                  selectedGame === key && styles.filterChipTextActive
                ]}>
                  {game.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Active Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turnamen Aktif</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllTournaments')}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          {getActiveTournaments().length > 0 ? (
            getActiveTournaments()
              .filter(t => !selectedGame || t.game === selectedGame)
              .map(tournament => (
                <TournamentCard
                  key={tournament.id}
                  tournament={{
                    id: tournament.id,
                    name: tournament.name,
                    game: GAMES[tournament.game]?.name || tournament.game,
                    format: tournament.format,
                    status: tournament.status,
                    currentParticipants: tournament.currentParticipants,
                    maxParticipants: tournament.maxParticipants,
                    tournamentStart: tournament.tournamentStart,
                    prizePool: tournament.prizePool,
                  }}
                  onPress={() => handleTournamentPress(tournament)}
                />
              ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏆</Text>
              <Text style={styles.emptyText}>Belum ada turnamen aktif</Text>
            </View>
          )}
        </View>

        {/* Upcoming Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turnamen Mendatang</Text>
          </View>
          
          {getUpcomingTournaments().length > 0 ? (
            getUpcomingTournaments()
              .filter(t => !selectedGame || t.game === selectedGame)
              .slice(0, 3)
              .map(tournament => (
                <TournamentCard
                  key={tournament.id}
                  tournament={{
                    id: tournament.id,
                    name: tournament.name,
                    game: GAMES[tournament.game]?.name || tournament.game,
                    format: tournament.format,
                    status: tournament.status,
                    currentParticipants: tournament.currentParticipants,
                    maxParticipants: tournament.maxParticipants,
                    tournamentStart: tournament.tournamentStart,
                    prizePool: tournament.prizePool,
                  }}
                  onPress={() => handleTournamentPress(tournament)}
                />
              ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyText}>Belum ada turnamen mendatang</Text>
            </View>
          )}
        </View>

        {/* Create Tournament Button */}
        {user.role === 'admin' && (
          <View style={styles.createSection}>
            <Button
              title="Buat Turnamen Baru"
              onPress={handleCreateTournament}
              variant="primary"
              size="large"
              style={styles.createButton}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  profileIcon: {
    fontSize: 20,
  },
  welcomeSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  filterSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: colors.textInverse,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  createSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  createButton: {
    marginTop: spacing.md,
  },
});