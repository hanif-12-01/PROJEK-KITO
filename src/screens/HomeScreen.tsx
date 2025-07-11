import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Tournament } from '../types';
import TournamentCard from '../components/TournamentCard';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data untuk demo
  const mockTournaments: Tournament[] = [
    {
      id: '1',
      name: 'Piala Kemerdekaan Mobile Legends',
      game: 'Mobile Legends',
      format: 'Single Elimination',
      maxParticipants: 32,
      currentParticipants: 24,
      registrationStart: new Date('2024-08-01'),
      registrationEnd: new Date('2024-08-15'),
      tournamentStart: new Date('2024-08-20'),
      tournamentEnd: new Date('2024-08-25'),
      prizePool: {
        first: 10000000,
        second: 5000000,
        third: 2500000,
        currency: 'IDR',
      },
      rules: 'Aturan turnamen akan diumumkan',
      isPublic: true,
      status: 'registration_open',
      createdBy: 'admin1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Valorant Championship Series',
      game: 'Valorant',
      format: 'Double Elimination',
      maxParticipants: 16,
      currentParticipants: 16,
      registrationStart: new Date('2024-07-15'),
      registrationEnd: new Date('2024-07-30'),
      tournamentStart: new Date('2024-08-05'),
      tournamentEnd: new Date('2024-08-10'),
      prizePool: {
        first: 5000000,
        second: 2500000,
        third: 1000000,
        currency: 'IDR',
      },
      rules: 'Aturan turnamen akan diumumkan',
      isPublic: true,
      status: 'in_progress',
      createdBy: 'admin1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'PUBG Mobile Pro League',
      game: 'PUBG Mobile',
      format: 'Round Robin',
      maxParticipants: 8,
      currentParticipants: 8,
      registrationStart: new Date('2024-06-01'),
      registrationEnd: new Date('2024-06-15'),
      tournamentStart: new Date('2024-07-01'),
      tournamentEnd: new Date('2024-07-31'),
      prizePool: {
        first: 15000000,
        second: 7500000,
        third: 3000000,
        currency: 'IDR',
      },
      rules: 'Aturan turnamen akan diumumkan',
      isPublic: true,
      status: 'completed',
      createdBy: 'admin1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTournaments(mockTournaments);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTournaments();
    setRefreshing(false);
  };

  const handleTournamentPress = (tournamentId: string) => {
    // Navigate to tournament details
    console.log('Navigate to tournament:', tournamentId);
  };

  const handleCreateTournament = () => {
    // Navigate to create tournament screen
    console.log('Navigate to create tournament');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Memuat turnamen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Arena Master</Text>
          <Text style={styles.subtitle}>Platform Turnamen E-Sports Terdepan</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turnamen Aktif</Text>
            <Button
              title="Buat Turnamen"
              onPress={handleCreateTournament}
              variant="primary"
              size="small"
            />
          </View>

          {tournaments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Belum ada turnamen aktif</Text>
              <Button
                title="Buat Turnamen Pertama"
                onPress={handleCreateTournament}
                variant="outline"
                size="medium"
              />
            </View>
          ) : (
            tournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onPress={() => handleTournamentPress(tournament.id)}
              />
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistik</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tournaments.length}</Text>
              <Text style={styles.statLabel}>Total Turnamen</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {tournaments.filter(t => t.status === 'registration_open').length}
              </Text>
              <Text style={styles.statLabel}>Pendaftaran Terbuka</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {tournaments.filter(t => t.status === 'in_progress').length}
              </Text>
              <Text style={styles.statLabel}>Sedang Berlangsung</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
});

export default HomeScreen;