import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Input, Header } from '../components';
import { colors, typography, spacing } from '../constants/theme';
import { signIn, signUp } from '../services/auth';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!isLogin && !formData.username) {
      newErrors.username = 'Username wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        // Navigation will be handled by auth state change
      } else {
        await signUp(formData.email, formData.password, formData.username);
        Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Arena Master" subtitle="Login atau Daftar" />
      
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🏆</Text>
            <Text style={styles.appName}>Arena Master</Text>
            <Text style={styles.tagline}>Platform Turnamen E-Sports Terdepan</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>
              {isLogin ? 'Masuk ke Akun' : 'Buat Akun Baru'}
            </Text>

            {!isLogin && (
              <Input
                label="Username"
                placeholder="Masukkan username"
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value)}
                error={errors.username}
                autoCapitalize="none"
              />
            )}

            <Input
              label="Email"
              placeholder="Masukkan email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Masukkan password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              error={errors.password}
              secureTextEntry
            />

            <Button
              title={isLogin ? 'Masuk' : 'Daftar'}
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitButton}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              </Text>
              <Button
                title={isLogin ? 'Daftar' : 'Masuk'}
                onPress={() => setIsLogin(!isLogin)}
                variant="ghost"
                size="small"
              />
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Fitur Unggulan:</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎮</Text>
              <Text style={styles.featureText}>Turnamen berbagai game populer</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏅</Text>
              <Text style={styles.featureText}>Hadiah menarik untuk pemenang</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>Akses mudah dari mobile</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  switchText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: spacing.xs,
  },
  featuresContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
});