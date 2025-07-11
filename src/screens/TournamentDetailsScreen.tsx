import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Tournament, Match } from '../types';
import Button from '../components/Button';

interface TournamentDetailsScreenProps {
  route: {
    params: {
      tournamentId: string;
    };
  };
}

const TournamentDetailsScreen: React.FC<TournamentDetailsScreenProps> = ({ route }) => {
  const { tournamentId } = route.params;
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'bracket' | 'participants'>('info');

  // Mock data untuk demo
  const mockTournament: Tournament = {
    id: tournamentId,
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
    rules: `1. Setiap tim terdiri dari 5 pemain utama dan 1 pemain cadangan
2. Pertandingan menggunakan format Best of 3 (BO3)
3. Semua pemain harus hadir 15 menit sebelum pertandingan dimulai
4. Dilarang menggunakan cheat atau software ilegal
5. Keputusan wasit bersifat mutlak dan tidak dapat diganggu gugat
6. Tim yang tidak hadir dalam waktu 15 menit akan dianggap kalah walkover
7. Semua pertandingan akan disiarkan live melalui platform resmi
8. Hadiah akan dibagikan maksimal 7 hari setelah turnamen selesai`,
    isPublic: true,
    status: 'registration_open',
    createdBy: 'admin1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockMatches: Match[] = [
    {
      id: '1',
      tournamentId,
      round: 1,
      matchNumber: 1,
      team1Id: 'team1',
      team2Id: 'team2',
      team1Score: 2,
      team2Score: 1,
      winnerId: 'team1',
      status: 'completed',
      scheduledTime: new Date('2024-08-20T19:00:00'),
      actualStartTime: new Date('2024-08-20T19:05:00'),
      actualEndTime: new Date('2024-08-20T20:30:00'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      tournamentId,
      round: 1,
      matchNumber: 2,
      team1Id: 'team3',
      team2Id: 'team4',
      status: 'scheduled',
      scheduledTime: new Date('2024-08-20T21:00:00'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  useEffect(() => {
    loadTournamentDetails();
  }, [tournamentId]);

  const loadTournamentDetails = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTournament(mockTournament);
      setMatches(mockMatches);
      setLoading(false);
    }, 1000);
  };

  const handleRegister = () => {
    Alert.alert(
      'Daftar Turnamen',
      'Apakah Anda yakin ingin mendaftar ke turnamen ini?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Daftar', onPress: () => console.log('Register to tournament') },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration_open':
        return '#34C759';
      case 'registration_closed':
        return '#FF9500';
      case 'in_progress':
        return '#007AFF';
      case 'completed':
        return '#8E8E93';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registration_open':
        return 'Pendaftaran Terbuka';
      case 'registration_closed':
        return 'Pendaftaran Ditutup';
      case 'in_progress':
        return 'Sedang Berlangsung';
      case 'completed':
        return 'Selesai';
      default:
        return 'Draft';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Memuat detail turnamen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!tournament) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Turnamen tidak ditemukan</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{tournament.name}</Text>
          <Text style={styles.game}>{tournament.game}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tournament.status) }]}>
            <Text style={styles.statusText}>{getStatusText(tournament.status)}</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
              Informasi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bracket' && styles.activeTab]}
            onPress={() => setActiveTab('bracket')}
          >
            <Text style={[styles.tabText, activeTab === 'bracket' && styles.activeTabText]}>
              Bracket
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'participants' && styles.activeTab]}
            onPress={() => setActiveTab('participants')}
          >
            <Text style={[styles.tabText, activeTab === 'participants' && styles.activeTabText]}>
              Peserta
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <View style={styles.tabContent}>
            {/* Prize Pool */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🏆 Hadiah</Text>
              <View style={styles.prizeContainer}>
                <View style={styles.prizeItem}>
                  <Text style={styles.prizePosition}>1st</Text>
                  <Text style={styles.prizeAmount}>
                    {tournament.prizePool.currency} {tournament.prizePool.first.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.prizeItem}>
                  <Text style={styles.prizePosition}>2nd</Text>
                  <Text style={styles.prizeAmount}>
                    {tournament.prizePool.currency} {tournament.prizePool.second.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.prizeItem}>
                  <Text style={styles.prizePosition}>3rd</Text>
                  <Text style={styles.prizeAmount}>
                    {tournament.prizePool.currency} {tournament.prizePool.third.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            {/* Tournament Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📋 Informasi Turnamen</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Format</Text>
                  <Text style={styles.infoValue}>{tournament.format}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Peserta</Text>
                  <Text style={styles.infoValue}>
                    {tournament.currentParticipants}/{tournament.maxParticipants}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Pendaftaran Dibuka</Text>
                  <Text style={styles.infoValue}>{formatDate(tournament.registrationStart)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Pendaftaran Ditutup</Text>
                  <Text style={styles.infoValue}>{formatDate(tournament.registrationEnd)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Turnamen Mulai</Text>
                  <Text style={styles.infoValue}>{formatDate(tournament.tournamentStart)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Turnamen Selesai</Text>
                  <Text style={styles.infoValue}>{formatDate(tournament.tournamentEnd)}</Text>
                </View>
              </View>
            </View>

            {/* Rules */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📜 Aturan Turnamen</Text>
              <Text style={styles.rulesText}>{tournament.rules}</Text>
            </View>
          </View>
        )}

        {activeTab === 'bracket' && (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Fitur Bracket akan segera hadir!</Text>
          </View>
        )}

        {activeTab === 'participants' && (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoon}>Daftar Peserta akan segera hadir!</Text>
          </View>
        )}

        {/* Action Buttons */}
        {tournament.status === 'registration_open' && (
          <View style={styles.actionContainer}>
            <Button
              title="Daftar Turnamen"
              onPress={handleRegister}
              size="large"
              style={styles.registerButton}
            />
          </View>
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  game: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
  },
  tabContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  prizeContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  prizeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  prizePosition: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  prizeAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoGrid: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rulesText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  comingSoon: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    paddingVertical: 40,
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  registerButton: {
    width: '100%',
  },
});

export default TournamentDetailsScreen;