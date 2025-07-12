import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const DashboardScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const menuItems = [
    {
      title: 'Create Tournament',
      subtitle: 'Create new tournament',
      color: '#007AFF',
      onPress: () => Alert.alert('Coming Soon', 'Create Tournament feature will be available soon!'),
    },
    {
      title: 'My Tournaments',
      subtitle: 'View your tournaments',
      color: '#34C759',
      onPress: () => Alert.alert('Coming Soon', 'My Tournaments feature will be available soon!'),
    },
    {
      title: 'Browse Tournaments',
      subtitle: 'Find tournaments to join',
      color: '#FF9500',
      onPress: () => Alert.alert('Coming Soon', 'Browse Tournaments feature will be available soon!'),
    },
    {
      title: 'My Profile',
      subtitle: 'Manage your profile',
      color: '#AF52DE',
      onPress: () => Alert.alert('Coming Soon', 'My Profile feature will be available soon!'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Arena Master</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to Arena Master</Text>
          <Text style={styles.welcomeSubtext}>
            Your tournament management platform
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: item.color }]}
              onPress={item.onPress}
            >
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Active Tournaments</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>My Teams</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Wins</Text>
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#888888',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuItem: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
});

export default DashboardScreen;