import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../store/AuthContext';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Email dan password harus diisi');
      return;
    }

    if (!isLogin && !displayName.trim()) {
      Alert.alert('Error', 'Nama lengkap harus diisi');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal melakukan autentikasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Arena Master</Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#8E8E93"
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan password"
                placeholderTextColor="#8E8E93"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Button
              title={isLogin ? 'Masuk' : 'Daftar'}
              onPress={handleSubmit}
              loading={loading}
              size="large"
              style={styles.submitButton}
            />
          </View>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            </Text>
            <Button
              title={isLogin ? 'Daftar' : 'Masuk'}
              onPress={() => setIsLogin(!isLogin)}
              variant="outline"
              size="small"
            />
          </View>

          {/* Features */}
          <View style={styles.features}>
            <Text style={styles.featuresTitle}>Fitur Utama</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏆</Text>
                <Text style={styles.featureText}>Kelola Turnamen E-Sports</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>👥</Text>
                <Text style={styles.featureText}>Manajemen Tim & Peserta</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📊</Text>
                <Text style={styles.featureText}>Bracket Generator Otomatis</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🔔</Text>
                <Text style={styles.featureText}>Notifikasi Real-Time</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  submitButton: {
    marginTop: 10,
  },
  toggleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  toggleText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  features: {
    alignItems: 'center',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
});

export default AuthScreen;