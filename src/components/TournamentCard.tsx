import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Tournament } from '../types';

interface TournamentCardProps {
  tournament: Tournament;
  onPress: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onPress }) => {
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        {tournament.logo && (
          <Image source={{ uri: tournament.logo }} style={styles.logo} />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {tournament.name}
          </Text>
          <Text style={styles.game}>{tournament.game}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tournament.status) }]}>
          <Text style={styles.statusText}>{getStatusText(tournament.status)}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Format:</Text>
          <Text style={styles.detailValue}>{tournament.format}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Peserta:</Text>
          <Text style={styles.detailValue}>
            {tournament.currentParticipants}/{tournament.maxParticipants}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hadiah:</Text>
          <Text style={styles.detailValue}>
            {tournament.prizePool.currency} {tournament.prizePool.first.toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Mulai:</Text>
          <Text style={styles.detailValue}>{formatDate(tournament.tournamentStart)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.prizePool}>
          Prize Pool: {tournament.prizePool.currency} {tournament.prizePool.first.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  game: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingTop: 12,
  },
  prizePool: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    textAlign: 'center',
  },
});

export default TournamentCard;