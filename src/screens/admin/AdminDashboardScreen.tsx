import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const AdminDashboardScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalTournaments: 15,
    activeTournaments: 8,
    totalParticipants: 324,
    pendingRegistrations: 12,
  };

  const recentTournaments = [
    {
      id: '1',
      name: 'Piala Kemerdekaan Mobile Legends',
      status: 'registration-open',
      participants: 32,
      maxParticipants: 64,
    },
    {
      id: '2',
      name: 'Valorant Championship Series',
      status: 'in-progress',
      participants: 16,
      maxParticipants: 16,
    },
  ];

  const pendingRegistrations = [
    {
      id: '1',
      teamName: 'Team Alpha',
      tournamentName: 'Piala Kemerdekaan Mobile Legends',
      registeredAt: '2024-08-15 14:30',
    },
    {
      id: '2',
      teamName: 'Gaming Elite',
      tournamentName: 'PUBG Mobile Tournament',
      registeredAt: '2024-08-15 13:45',
    },
  ];

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard Admin</Text>
          <Text style={styles.subtitle}>Kelola turnamen dan peserta</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalTournaments}</Text>
            <Text style={styles.statLabel}>Total Turnamen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.activeTournaments}</Text>
            <Text style={styles.statLabel}>Aktif</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalParticipants}</Text>
            <Text style={styles.statLabel}>Peserta</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.pendingRegistrations}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CreateTournament')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Buat Turnamen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionText}>Kelola Peserta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>Generate Bracket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionText}>Input Skor</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Tournaments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Turnamen Terbaru</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          {recentTournaments.map((tournament) => (
            <TouchableOpacity
              key={tournament.id}
              style={styles.tournamentCard}
              onPress={() => navigation.navigate('TournamentDetail', { tournamentId: tournament.id })}
            >
              <View style={styles.tournamentHeader}>
                <Text style={styles.tournamentName}>{tournament.name}</Text>
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
                <Text style={styles.tournamentParticipants}>
                  {tournament.participants}/{tournament.maxParticipants} Tim
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Registrations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pendaftaran Pending</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          
          {pendingRegistrations.map((registration) => (
            <View key={registration.id} style={styles.registrationCard}>
              <View style={styles.registrationInfo}>
                <Text style={styles.teamName}>{registration.teamName}</Text>
                <Text style={styles.tournamentName}>{registration.tournamentName}</Text>
                <Text style={styles.registrationTime}>
                  Daftar: {registration.registeredAt}
                </Text>
              </View>
              <View style={styles.registrationActions}>
                <TouchableOpacity style={styles.approveButton}>
                  <Text style={styles.approveButtonText}>Setujui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectButton}>
                  <Text style={styles.rejectButtonText}>Tolak</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
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
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    marginHorizontal: '1%',
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
  tournamentCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tournamentStats: {
    marginTop: 5,
  },
  tournamentParticipants: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(107, 114, 128, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  registrationCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  registrationInfo: {
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 5,
  },
  registrationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  registrationActions: {
    flexDirection: 'row',
    gap: 10,
  },
  approveButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  approveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AdminDashboardScreen;