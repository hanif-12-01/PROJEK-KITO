import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../src/services/firebaseConfig';
import LoginScreen from '../../src/screens/LoginScreen';
import DashboardScreen from '../../src/screens/DashboardScreen';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Loading screen bisa ditambahkan di sini */}
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <DashboardScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});
