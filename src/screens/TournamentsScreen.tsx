import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const TournamentsScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tournaments = [
    {
      id: '1',
      name: 'Piala Kemerdekaan Mobile Legends',
      game: 'mobile-legends',
      participants: 32,
      maxParticipants: 64,
      status: 'registration-open',
      prizePool: 'Rp 50.000.000',
      startDate: '2024-08-17',
    },
    {
      id: '2',
      name: 'Valorant Championship Series',
      game: 'valorant',
      participants: 16,
      maxParticipants: 16,
      status: 'in-progress',
      prizePool: 'Rp 25.000.000',
      startDate: '2024-08-15',
    },
    {
      id: '3',
      name: 'PUBG Mobile Tournament',
      game: 'pubg-mobile',
      participants: 24,
      maxParticipants: 32,
      status: 'registration-open',
      prizePool: 'Rp 30.000.000',
      startDate: '2024-08-20',
    },
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration-open':
        return '#f59e0b';
      case 'in-progress':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registration-open':
        return 'Pendaftaran';
      case 'in-progress':
        return 'Berlangsung';
      case 'completed':
        return 'Selesai';
      default:
        return 'Unknown';
    }
  };

  return (
    <LinearGradient
      colors={['#1f2937', '#111827']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari turnamen..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {[
            { key: 'all', label: 'Semua' },
            { key: 'registration-open', label: 'Pendaftaran' },
            { key: 'in-progress', label: 'Berlangsung' },
            { key: 'completed', label: 'Selesai' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tournaments List */}
        <View style={styles.tournamentsContainer}>
          {tournaments.map((tournament) => (
            <TouchableOpacity
              key={tournament.id}
              style={styles.tournamentCard}
              onPress={() => navigation.navigate('TournamentDetail', { tournamentId: tournament.id })}
            >
              <View style={styles.tournamentHeader}>
                <View style={styles.tournamentInfo}>
                  <Text style={styles.gameIcon}>{getGameIcon(tournament.game)}</Text>
                  <View style={styles.tournamentDetails}>
                    <Text style={styles.tournamentName}>{tournament.name}</Text>
                    <Text style={styles.tournamentDate}>
                      Mulai: {new Date(tournament.startDate).toLocaleDateString('id-ID')}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(tournament.status) }
                ]}>
                  <Text style={styles.statusText}>
                    {getStatusText(tournament.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.tournamentStats}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Peserta</Text>
                  <Text style={styles.statValue}>
                    {tournament.participants}/{tournament.maxParticipants}
                  </Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Hadiah</Text>
                  <Text style={styles.statValue}>{tournament.prizePool}</Text>
                </View>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
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
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filterButton: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterButtonText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  tournamentsContainer: {
    paddingHorizontal: 20,
  },
  tournamentCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tournamentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  gameIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  tournamentDetails: {
    flex: 1,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  tournamentDate: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tournamentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
});

export default TournamentsScreen;