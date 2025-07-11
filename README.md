# Arena Master - Aplikasi Manajemen Turnamen E-Sports

Arena Master adalah aplikasi mobile cross-platform untuk mengelola turnamen e-sports secara terpusat. Aplikasi ini dirancang untuk melayani tiga jenis pengguna utama: Penyelenggara Turnamen (Admin), Peserta (Tim/Pemain), dan Penonton.

## 🎮 Fitur Utama

### Untuk Penyelenggara Turnamen (Admin)
- **Dasbor Admin**: Ringkasan turnamen aktif, pendaftar baru, dan tugas yang perlu diselesaikan
- **Pembuatan Turnamen**: Formulir lengkap untuk membuat turnamen dengan berbagai opsi
- **Manajemen Peserta**: Melihat, menyetujui, atau menolak pendaftaran tim
- **Pembuatan Bagan**: Generator bracket otomatis berdasarkan peserta yang diverifikasi
- **Manajemen Pertandingan**: Input skor dan update bracket secara real-time
- **Penanganan Perselisihan**: Sistem untuk menangani dispute dari peserta

### Untuk Peserta (Tim/Pemain)
- **Pendaftaran & Profil**: Membuat profil pengguna atau tim
- **Pencarian Turnamen**: Menjelajahi turnamen publik dan bergabung dengan turnamen privat
- **Dasbor Peserta**: Melihat jadwal pertandingan dan posisi di bracket
- **Notifikasi Real-Time**: Pemberitahuan otomatis untuk jadwal dan hasil pertandingan
- **Pelaporan Skor**: Upload screenshot sebagai bukti pertandingan

### Untuk Penonton & Publik
- **Antarmuka Publik**: Melihat informasi turnamen tanpa login
- **Live Bracket & Hasil**: Mengikuti progres turnamen secara real-time
- **Profil Tim**: Informasi tentang tim-tim yang berpartisipasi

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React Native (Cross-platform mobile development)
- **Backend**: Firebase (Firestore, Authentication, Storage, Cloud Messaging)
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **UI Components**: Custom components dengan tema dark mode
- **Real-time Updates**: Firebase Firestore real-time listeners

## 📱 Platform yang Didukung

- ✅ Android (APK)
- ✅ iOS (akan tersedia di App Store)
- ✅ Web (PWA - dalam pengembangan)

## 🎨 Desain & UX

- **Tema Gelap**: Dark mode sebagai default untuk komunitas gamer
- **UI Modern**: Desain yang bersih dan profesional
- **Responsif**: Optimal di berbagai ukuran layar
- **Intuitif**: Navigasi yang mudah dan user-friendly

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- React Native CLI
- Android Studio (untuk Android development)
- Xcode (untuk iOS development, macOS only)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/arena-master.git
   cd arena-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Buat proyek Firebase baru
   - Enable Authentication, Firestore, Storage, dan Cloud Messaging
   - Download file konfigurasi dan update `src/services/firebase.ts`

4. **Run aplikasi**
   ```bash
   # Android
   npx react-native run-android
   
   # iOS
   npx react-native run-ios
   ```

## 📁 Struktur Proyek

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
├── screens/            # Screen components
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── admin/          # Admin-specific screens
│   ├── participant/    # Participant-specific screens
│   └── ...
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── services/           # API and external services
│   └── firebase.ts
├── utils/              # Utility functions and constants
│   └── theme.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── assets/             # Images, fonts, etc.
```

## 🔧 Konfigurasi Firebase

1. Buat proyek di [Firebase Console](https://console.firebase.google.com/)
2. Enable services berikut:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Cloud Messaging
3. Update konfigurasi di `src/services/firebase.ts`

## 📋 Alur Kerja Pengguna

### Contoh Skenario: Turnamen Mobile Legends

1. **Penyelenggara** membuat turnamen "Piala Kemerdekaan Mobile Legends"
2. **Tim A** melihat turnamen, mendaftar, dan disetujui oleh Penyelenggara
3. Setelah pendaftaran ditutup, **Penyelenggara** menekan "Generate Bracket"
4. Sistem otomatis membuat bagan pertandingan
5. **Tim A** mendapat notifikasi jadwal pertandingan vs Tim B
6. Setelah pertandingan selesai, **Penyelenggara** input skor: Tim A menang 2-0
7. Bagan otomatis diperbarui, Tim A maju ke babak selanjutnya
8. **Penonton** bisa melihat pembaruan secara langsung

## 🎯 Roadmap

### Versi 1.0 (Current)
- [x] Authentication system
- [x] Basic UI components
- [x] Navigation structure
- [ ] Tournament creation
- [ ] Team management
- [ ] Bracket generation

### Versi 1.1
- [ ] Real-time notifications
- [ ] Match score reporting
- [ ] Tournament brackets
- [ ] Team profiles

### Versi 1.2
- [ ] Live streaming integration
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Social features

### Versi 2.0
- [ ] Web platform
- [ ] API for third-party integrations
- [ ] Advanced tournament formats
- [ ] Internationalization

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Silakan:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

- **Email**: support@arenamaster.com
- **Website**: https://arenamaster.com
- **Discord**: [Join our community](https://discord.gg/arenamaster)

## 🙏 Ucapan Terima Kasih

Terima kasih kepada semua kontributor dan komunitas e-sports Indonesia yang telah mendukung pengembangan aplikasi ini.

---

**Arena Master** - Empowering the e-sports community through technology 🏆