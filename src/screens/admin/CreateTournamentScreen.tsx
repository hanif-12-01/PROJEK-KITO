import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const CreateTournamentScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    game: '',
    format: '',
    maxParticipants: '',
    registrationStart: '',
    registrationEnd: '',
    tournamentStart: '',
    tournamentEnd: '',
    prizePool: '',
    rules: '',
    isPublic: true,
  });

  const games = [
    { key: 'mobile-legends', label: 'Mobile Legends', icon: '📱' },
    { key: 'valorant', label: 'Valorant', icon: '🎯' },
    { key: 'pubg-mobile', label: 'PUBG Mobile', icon: '🔫' },
    { key: 'free-fire', label: 'Free Fire', icon: '🔥' },
    { key: 'efootball', label: 'eFootball', icon: '⚽' },
    { key: 'dota2', label: 'Dota 2', icon: '🗡️' },
    { key: 'csgo', label: 'CS:GO', icon: '🔫' },
    { key: 'lol', label: 'League of Legends', icon: '⚔️' },
  ];

  const formats = [
    { key: 'single-elimination', label: 'Single Elimination' },
    { key: 'double-elimination', label: 'Double Elimination' },
    { key: 'round-robin', label: 'Round Robin' },
  ];

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.game || !formData.format || !formData.maxParticipants) {
      Alert.alert('Error', 'Mohon isi semua field yang diperlukan');
      return;
    }

    // Create tournament logic here
    Alert.alert('Sukses', 'Turnamen berhasil dibuat!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <LinearGradient
      colors={['#1f2937', '#111827']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Buat Turnamen Baru</Text>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Dasar</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nama Turnamen *</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan nama turnamen"
                placeholderTextColor="#9ca3af"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Deskripsi</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Deskripsi turnamen"
                placeholderTextColor="#9ca3af"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Game *</Text>
              <View style={styles.optionsContainer}>
                {games.map((game) => (
                  <TouchableOpacity
                    key={game.key}
                    style={[
                      styles.optionButton,
                      formData.game === game.key && styles.optionButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, game: game.key })}
                  >
                    <Text style={styles.optionIcon}>{game.icon}</Text>
                    <Text style={[
                      styles.optionText,
                      formData.game === game.key && styles.optionTextActive
                    ]}>
                      {game.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Format Turnamen *</Text>
              <View style={styles.optionsContainer}>
                {formats.map((format) => (
                  <TouchableOpacity
                    key={format.key}
                    style={[
                      styles.optionButton,
                      formData.format === format.key && styles.optionButtonActive
                    ]}
                    onPress={() => setFormData({ ...formData, format: format.key })}
                  >
                    <Text style={[
                      styles.optionText,
                      formData.format === format.key && styles.optionTextActive
                    ]}>
                      {format.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Maksimal Peserta *</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: 32"
                placeholderTextColor="#9ca3af"
                value={formData.maxParticipants}
                onChangeText={(text) => setFormData({ ...formData, maxParticipants: text })}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jadwal</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pendaftaran Dibuka</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
                value={formData.registrationStart}
                onChangeText={(text) => setFormData({ ...formData, registrationStart: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pendaftaran Ditutup</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
                value={formData.registrationEnd}
                onChangeText={(text) => setFormData({ ...formData, registrationEnd: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Turnamen Mulai</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
                value={formData.tournamentStart}
                onChangeText={(text) => setFormData({ ...formData, tournamentStart: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Turnamen Selesai</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9ca3af"
                value={formData.tournamentEnd}
                onChangeText={(text) => setFormData({ ...formData, tournamentEnd: text })}
              />
            </View>
          </View>

          {/* Prize Pool & Rules */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hadiah & Aturan</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Total Hadiah</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Rp 50.000.000"
                placeholderTextColor="#9ca3af"
                value={formData.prizePool}
                onChangeText={(text) => setFormData({ ...formData, prizePool: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Aturan Turnamen</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Aturan dan ketentuan turnamen"
                placeholderTextColor="#9ca3af"
                value={formData.rules}
                onChangeText={(text) => setFormData({ ...formData, rules: text })}
                multiline
                numberOfLines={6}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Jenis Turnamen</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    formData.isPublic && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, isPublic: true })}
                >
                  <Text style={[
                    styles.optionText,
                    formData.isPublic && styles.optionTextActive
                  ]}>
                    Publik
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    !formData.isPublic && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, isPublic: false })}
                >
                  <Text style={[
                    styles.optionText,
                    !formData.isPublic && styles.optionTextActive
                  ]}>
                    Privat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Buat Turnamen</Text>
          </TouchableOpacity>
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
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(55, 65, 81, 0.8)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
    minWidth: 100,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  optionIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  optionText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateTournamentScreen;