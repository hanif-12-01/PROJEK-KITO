import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  default: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    ...shadows.medium,
  },
  outlined: {
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  tournamentCard: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  game: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
  },
  details: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    color: colors.textInverse,
    fontWeight: '600',
  },
});

interface TournamentCardProps {
  tournament: {
    id: string;
    name: string;
    game: string;
    format: string;
    status: string;
    currentParticipants: number;
    maxParticipants: number;
    tournamentStart: Date;
    prizePool: {
      first: number;
      currency: string;
    };
    logo?: string;
  };
  onPress: () => void;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onPress,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration-open':
        return colors.success;
      case 'in-progress':
        return colors.warning;
      case 'completed':
        return colors.info;
      default:
        return colors.textTertiary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registration-open':
        return 'Pendaftaran Terbuka';
      case 'registration-closed':
        return 'Pendaftaran Ditutup';
      case 'in-progress':
        return 'Sedang Berlangsung';
      case 'completed':
        return 'Selesai';
      default:
        return status;
    }
  };

  return (
    <Card onPress={onPress} variant="elevated" style={styles.tournamentCard}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {tournament.name}
          </Text>
          <Text style={styles.game}>{tournament.game}</Text>
        </View>
        {tournament.logo && (
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🏆</Text>
          </View>
        )}
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
          <Text style={styles.detailLabel}>Mulai:</Text>
          <Text style={styles.detailValue}>
            {formatDate(tournament.tournamentStart)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hadiah:</Text>
          <Text style={styles.detailValue}>
            {tournament.prizePool.first.toLocaleString()} {tournament.prizePool.currency}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tournament.status) }]}>
          <Text style={styles.statusText}>
            {getStatusText(tournament.status)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

