import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTournaments, setActiveTournaments] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const getGameIcon = (game: string) => {
    const icons: { [key: string]: string } = {
      'mobile-legends': '📱',
      'valorant': '🎯',
      'pubg-mobile': '🔫',
      'free-fire': '🔥',
      'efootball': '⚽',
      'dota2': '🗡️',
      'csgo': '🔫',
      'lol': '⚔️',
    };
    return icons[game] || '🎮';
  };

  return (
    <LinearGradient
      colors={['#1f2937', '#111827']}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, {currentUser?.displayName}!</Text>
          <Text style={styles.subtitle}>Selamat datang di Arena Master</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Turnamen Aktif</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Tim Terdaftar</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Pertandingan Hari Ini</Text>
          </View>
        </View>

        {/* Active Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turnamen Aktif</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tournaments')}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tournamentScroll}>
            {[
              {
                id: '1',
                name: 'Piala Kemerdekaan Mobile Legends',
                game: 'mobile-legends',
                participants: 32,
                maxParticipants: 64,
                status: 'registration-open',
              },
              {
                id: '2',
                name: 'Valorant Championship Series',
                game: 'valorant',
                participants: 16,
                maxParticipants: 16,
                status: 'in-progress',
              },
              {
                id: '3',
                name: 'PUBG Mobile Tournament',
                game: 'pubg-mobile',
                participants: 24,
                maxParticipants: 32,
                status: 'registration-open',
              },
            ].map((tournament) => (
              <TouchableOpacity
                key={tournament.id}
                style={styles.tournamentCard}
                onPress={() => navigation.navigate('TournamentDetail', { tournamentId: tournament.id })}
              >
                <View style={styles.tournamentHeader}>
                  <Text style={styles.gameIcon}>{getGameIcon(tournament.game)}</Text>
                  <View style={[
                    styles.statusBadge,
                    tournament.status === 'in-progress' && styles.statusActive,
                    tournament.status === 'registration-open' && styles.statusOpen,
                  ]}>
                    <Text style={styles.statusText}>
                      {tournament.status === 'in-progress' ? 'Berlangsung' : 'Pendaftaran'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.tournamentName} numberOfLines={2}>
                  {tournament.name}
                </Text>
                <Text style={styles.tournamentParticipants}>
                  {tournament.participants}/{tournament.maxParticipants} Tim
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pertandingan Mendatang</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          {[
            {
              id: '1',
              team1: 'Team Alpha',
              team2: 'Team Beta',
              game: 'mobile-legends',
              time: '19:00 WIB',
              date: 'Hari Ini',
            },
            {
              id: '2',
              team1: 'Valorant Pro',
              team2: 'Gaming Elite',
              game: 'valorant',
              time: '20:30 WIB',
              date: 'Hari Ini',
            },
          ].map((match) => (
            <TouchableOpacity key={match.id} style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.gameIcon}>{getGameIcon(match.game)}</Text>
                <Text style={styles.matchTime}>{match.time}</Text>
              </View>
              <View style={styles.matchTeams}>
                <Text style={styles.teamName}>{match.team1}</Text>
                <Text style={styles.vsText}>VS</Text>
                <Text style={styles.teamName}>{match.team2}</Text>
              </View>
              <Text style={styles.matchDate}>{match.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔍</Text>
              <Text style={styles.actionText}>Cari Turnamen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>Lihat Bagan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionText}>Tim Saya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔔</Text>
              <Text style={styles.actionText}>Notifikasi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  tournamentScroll: {
    marginHorizontal: -5,
  },
  tournamentCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    width: 200,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameIcon: {
    fontSize: 24,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
  },
  statusActive: {
    backgroundColor: '#10b981',
  },
  statusOpen: {
    backgroundColor: '#f59e0b',
  },
  statusText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  tournamentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
  },
  tournamentParticipants: {
    fontSize: 12,
    color: '#9ca3af',
  },
  matchCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchTime: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  vsText: {
    fontSize: 14,
    color: '#9ca3af',
    marginHorizontal: 10,
  },
  matchDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default HomeScreen;