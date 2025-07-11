# Arena Master - Platform Manajemen Turnamen E-Sports

Arena Master adalah aplikasi mobile cross-platform untuk mengelola turnamen e-sports secara terpusat. Aplikasi ini dirancang untuk melayani tiga jenis pengguna utama: Penyelenggara Turnamen (Admin), Peserta (Tim/Pemain), dan Penonton.

## 🏆 Fitur Utama

### Untuk Penyelenggara Turnamen (Admin)
- **Dasbor Admin**: Ringkasan turnamen aktif dan tugas yang perlu diselesaikan
- **Pembuatan Turnamen**: Formulir lengkap untuk membuat turnamen baru
- **Manajemen Peserta**: Menyetujui/menolak pendaftaran dan check-in online
- **Pembuatan Bagan**: Generator bracket otomatis berdasarkan format turnamen
- **Manajemen Pertandingan**: Input skor dan update bracket secara real-time
- **Penanganan Perselisihan**: Sistem dispute untuk menangani laporan peserta

### Untuk Peserta (Tim/Pemain)
- **Pendaftaran & Profil**: Buat profil tim dengan logo dan anggota
- **Pencarian Turnamen**: Jelajahi turnamen publik dan privat
- **Dasbor Peserta**: Lihat jadwal pertandingan dan posisi di bracket
- **Notifikasi Real-Time**: Pemberitahuan otomatis untuk jadwal dan hasil
- **Pelaporan Skor**: Upload screenshot sebagai bukti pertandingan

### Untuk Penonton & Publik
- **Antarmuka Publik**: Lihat informasi turnamen tanpa login
- **Live Bracket & Hasil**: Ikuti progres turnamen secara real-time
- **Profil Tim**: Informasi detail tentang tim-tim peserta

## 🎮 Game yang Didukung

- Mobile Legends
- Valorant
- PUBG Mobile
- Free Fire
- eFootball
- Dota 2
- CS:GO
- League of Legends

## 🏗️ Format Turnamen

- **Single Elimination**: Setiap tim hanya satu kesempatan
- **Double Elimination**: Tim harus kalah dua kali untuk tersingkir
- **Round Robin**: Setiap tim bertanding melawan semua tim lainnya

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React Native (TypeScript)
- **Backend**: Firebase
  - Authentication
  - Firestore (Database)
  - Cloud Storage
  - Cloud Messaging (Push Notifications)
- **Navigation**: React Navigation
- **UI Components**: Custom components dengan dark theme
- **State Management**: React Hooks + Context API

## 📱 Platform

- Android (APK)
- iOS (App Store)

## 🚀 Instalasi dan Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- React Native CLI
- Android Studio (untuk Android)
- Xcode (untuk iOS, macOS only)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd ArenaMaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**
   - Buat project Firebase baru
   - Enable Authentication, Firestore, dan Storage
   - Download `google-services.json` (Android) dan `GoogleService-Info.plist` (iOS)
   - Update konfigurasi di `src/services/firebase.ts`

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
├── components/          # Komponen UI yang dapat digunakan kembali
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Header.tsx
│   └── index.ts
├── screens/            # Screen aplikasi
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   └── ...
├── navigation/         # Konfigurasi navigasi
│   └── AppNavigator.tsx
├── services/           # Layanan API dan Firebase
│   ├── auth.ts
│   ├── tournament.ts
│   └── firebase.ts
├── constants/          # Konstanta dan tema
│   ├── theme.ts
│   └── games.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
```

## 🎨 Tema dan Desain

Aplikasi menggunakan dark theme yang disukai komunitas gamer dengan:
- Warna primer: Ungu (#6366F1)
- Warna sekunder: Hijau (#10B981)
- Background: Hitam gelap (#0F0F23)
- Surface: Abu-abu gelap (#1E1E2E)

## 🔐 Autentikasi

- Email/Password authentication
- Role-based access control (Admin, Participant, Viewer)
- Secure user data storage di Firestore

## 📊 Database Schema

### Collections di Firestore:
- `users`: Data pengguna
- `tournaments`: Data turnamen
- `teams`: Data tim peserta
- `matches`: Data pertandingan
- `brackets`: Data bracket turnamen
- `registrations`: Data pendaftaran turnamen
- `notifications`: Data notifikasi
- `disputes`: Data perselisihan

## 🔔 Notifikasi

- Firebase Cloud Messaging untuk push notifications
- Notifikasi real-time untuk:
  - Jadwal pertandingan
  - Hasil pertandingan
  - Update turnamen
  - Persetujuan pendaftaran

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Build untuk Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace ArenaMaster.xcworkspace -scheme ArenaMaster -configuration Release archive
```

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

- Email: support@arenamaster.com
- Website: https://arenamaster.com
- Discord: https://discord.gg/arenamaster

## 🙏 Acknowledgments

- React Native community
- Firebase team
- Semua kontributor dan tester

---

**Arena Master** - Platform Turnamen E-Sports Terdepan 🏆