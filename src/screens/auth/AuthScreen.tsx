import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

const AuthScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>⚔️</Text>
          </View>
          <Text style={styles.appName}>Arena Master</Text>
          <Text style={styles.subtitle}>Platform Manajemen Turnamen E-Sports</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Selamat Datang!</Text>
        <Text style={styles.descriptionText}>
          Kelola turnamen e-sports Anda dengan mudah. Daftar sebagai penyelenggara,
          ikut sebagai peserta, atau saksikan sebagai penonton.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login' as never)}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}>
            Masuk
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register' as never)}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.registerButtonLabel}>
            Daftar Sekarang
          </Button>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Fitur Utama:</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureText}>Buat & Kelola Turnamen</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureText}>Manajemen Tim & Peserta</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Bagan Turnamen Real-time</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔔</Text>
            <Text style={styles.featureText}>Notifikasi Langsung</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#74B9FF',
    textAlign: 'center',
  },
  content: {
    flex: 0.6,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#B2BEC3',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#6C5CE7',
    marginBottom: 15,
    borderRadius: 25,
  },
  registerButton: {
    borderColor: '#6C5CE7',
    borderWidth: 2,
    borderRadius: 25,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButtonLabel: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 30,
  },
  featureText: {
    fontSize: 16,
    color: '#B2BEC3',
    flex: 1,
  },
});

export default AuthScreen;