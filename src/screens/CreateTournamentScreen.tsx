import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { GameType, TournamentFormat } from '../types';
import Button from '../components/Button';

const CreateTournamentScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    game: 'Mobile Legends' as GameType,
    format: 'Single Elimination' as TournamentFormat,
    maxParticipants: '',
    registrationStart: '',
    registrationEnd: '',
    tournamentStart: '',
    tournamentEnd: '',
    prizeFirst: '',
    prizeSecond: '',
    prizeThird: '',
    rules: '',
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);

  const games: GameType[] = [
    'Mobile Legends',
    'Valorant',
    'PUBG Mobile',
    'Free Fire',
    'eFootball',
    'Dota 2',
    'League of Legends',
    'CS:GO',
    'FIFA',
    'Other',
  ];

  const formats: TournamentFormat[] = [
    'Single Elimination',
    'Double Elimination',
    'Round Robin',
    'Swiss System',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Nama turnamen harus diisi');
      return false;
    }
    if (!formData.maxParticipants || parseInt(formData.maxParticipants) < 2) {
      Alert.alert('Error', 'Jumlah peserta minimal 2');
      return false;
    }
    if (!formData.registrationStart || !formData.registrationEnd || !formData.tournamentStart || !formData.tournamentEnd) {
      Alert.alert('Error', 'Semua tanggal harus diisi');
      return false;
    }
    if (!formData.prizeFirst || !formData.prizeSecond || !formData.prizeThird) {
      Alert.alert('Error', 'Semua hadiah harus diisi');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Sukses',
        'Turnamen berhasil dibuat!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back or to tournament list
              console.log('Navigate back');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Gagal membuat turnamen. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Buat Turnamen Baru</Text>
          <Text style={styles.subtitle}>Isi informasi turnamen Anda</Text>
        </View>

        <View style={styles.form}>
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Dasar</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Turnamen *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Masukkan nama turnamen"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Game *</Text>
              <View style={styles.pickerContainer}>
                {games.map((game) => (
                  <Button
                    key={game}
                    title={game}
                    onPress={() => handleInputChange('game', game)}
                    variant={formData.game === game ? 'primary' : 'outline'}
                    size="small"
                    style={styles.pickerButton}
                  />
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Format Turnamen *</Text>
              <View style={styles.pickerContainer}>
                {formats.map((format) => (
                  <Button
                    key={format}
                    title={format}
                    onPress={() => handleInputChange('format', format)}
                    variant={formData.format === format ? 'primary' : 'outline'}
                    size="small"
                    style={styles.pickerButton}
                  />
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Jumlah Maksimal Peserta *</Text>
              <TextInput
                style={styles.input}
                value={formData.maxParticipants}
                onChangeText={(value) => handleInputChange('maxParticipants', value)}
                placeholder="Contoh: 32"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jadwal</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pendaftaran Dibuka *</Text>
              <TextInput
                style={styles.input}
                value={formData.registrationStart}
                onChangeText={(value) => handleInputChange('registrationStart', value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pendaftaran Ditutup *</Text>
              <TextInput
                style={styles.input}
                value={formData.registrationEnd}
                onChangeText={(value) => handleInputChange('registrationEnd', value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Turnamen Mulai *</Text>
              <TextInput
                style={styles.input}
                value={formData.tournamentStart}
                onChangeText={(value) => handleInputChange('tournamentStart', value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Turnamen Selesai *</Text>
              <TextInput
                style={styles.input}
                value={formData.tournamentEnd}
                onChangeText={(value) => handleInputChange('tournamentEnd', value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8E8E93"
              />
            </View>
          </View>

          {/* Prize Pool */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hadiah (IDR)</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Juara 1 *</Text>
              <TextInput
                style={styles.input}
                value={formData.prizeFirst}
                onChangeText={(value) => handleInputChange('prizeFirst', value)}
                placeholder="Contoh: 10000000"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Juara 2 *</Text>
              <TextInput
                style={styles.input}
                value={formData.prizeSecond}
                onChangeText={(value) => handleInputChange('prizeSecond', value)}
                placeholder="Contoh: 5000000"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Juara 3 *</Text>
              <TextInput
                style={styles.input}
                value={formData.prizeThird}
                onChangeText={(value) => handleInputChange('prizeThird', value)}
                placeholder="Contoh: 2500000"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aturan Turnamen</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Aturan (Opsional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.rules}
                onChangeText={(value) => handleInputChange('rules', value)}
                placeholder="Masukkan aturan turnamen..."
                placeholderTextColor="#8E8E93"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.submitSection}>
            <Button
              title="Buat Turnamen"
              onPress={handleSubmit}
              loading={loading}
              size="large"
              style={styles.submitButton}
            />
          </View>
        </View>
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
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  form: {
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
  inputGroup: {
    marginBottom: 16,
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
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerButton: {
    marginBottom: 8,
  },
  submitSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    width: '100%',
  },
});

export default CreateTournamentScreen;