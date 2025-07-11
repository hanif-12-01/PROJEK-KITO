# Arena Master - Platform Manajemen Turnamen E-Sports

Arena Master adalah aplikasi mobile cross-platform yang dirancang untuk mengelola seluruh siklus hidup turnamen e-sports. Aplikasi ini melayani tiga jenis pengguna utama: Penyelenggara Turnamen (Admin), Peserta (Tim/Pemain), dan Penonton.

## 🎯 Fitur Utama

### Untuk Penyelenggara Turnamen (Admin)
- **Dasbor Admin**: Ringkasan turnamen aktif, pendaftar baru, dan tugas yang perlu diselesaikan
- **Pembuatan Turnamen**: Formulir lengkap untuk membuat turnamen dengan semua detail
- **Manajemen Peserta**: Melihat, menyetujui, atau menolak pendaftaran tim
- **Pembuatan Bagan**: Generator bracket otomatis berdasarkan peserta yang diverifikasi
- **Manajemen Pertandingan**: Input skor dan update bracket secara real-time
- **Penanganan Perselisihan**: Sistem untuk menangani dispute dari peserta

### Untuk Peserta (Tim/Pemain)
- **Pendaftaran & Profil**: Membuat profil tim dengan logo dan anggota
- **Pencarian Turnamen**: Menjelajahi turnamen publik dan bergabung dengan turnamen privat
- **Dasbor Peserta**: Melihat jadwal pertandingan dan posisi di bracket
- **Notifikasi Real-Time**: Pemberitahuan otomatis untuk jadwal dan hasil pertandingan
- **Pelaporan Skor**: Upload screenshot hasil pertandingan sebagai bukti

### Untuk Penonton & Publik
- **Antarmuka Publik**: Melihat informasi turnamen tanpa login
- **Live Bracket & Hasil**: Mengikuti progres turnamen secara real-time
- **Halaman Profil Tim**: Informasi tentang tim-tim yang berpartisipasi

## 🛠 Teknologi yang Digunakan

- **Frontend**: React Native dengan Expo
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Database**: Firebase Firestore (Real-time)
- **Notifikasi**: Firebase Cloud Messaging (FCM)
- **State Management**: React Context API
- **Navigation**: React Navigation v6
- **UI/UX**: Custom components dengan dark theme

## 📱 Platform

- ✅ Android (APK)
- ✅ iOS (App Store)
- ✅ Web (Progressive Web App)

## 🎨 Desain & UX

- **Dark Mode**: Tema gelap yang disukai komunitas gamer
- **Responsif**: Optimal di berbagai ukuran layar
- **Modern**: Desain bersih dan profesional
- **Intuitif**: Navigasi yang mudah dan user-friendly

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn
- Expo CLI
- Android Studio (untuk development Android)
- Xcode (untuk development iOS, macOS only)

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
   - Update konfigurasi di `src/constants/firebase.ts`

4. **Run aplikasi**
   ```bash
   # Development
   npm start
   
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen UI yang dapat digunakan kembali
│   ├── Button.tsx
│   ├── TournamentCard.tsx
│   └── ...
├── screens/            # Layar aplikasi
│   ├── HomeScreen.tsx
│   ├── CreateTournamentScreen.tsx
│   └── ...
├── navigation/         # Konfigurasi navigasi
│   └── AppNavigator.tsx
├── services/           # API calls dan business logic
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
├── constants/          # Konfigurasi dan constants
├── hooks/              # Custom React hooks
└── store/              # State management
```

## 🔧 Konfigurasi Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Enable services berikut:
   - Authentication (Email/Password, Google)
   - Firestore Database
   - Storage
   - Cloud Messaging
3. Update konfigurasi di `src/constants/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 📊 Database Schema

### Collections

#### users
```typescript
{
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'participant' | 'spectator';
  createdAt: Date;
  updatedAt: Date;
}
```

#### tournaments
```typescript
{
  id: string;
  name: string;
  logo?: string;
  game: GameType;
  format: TournamentFormat;
  maxParticipants: number;
  currentParticipants: number;
  registrationStart: Date;
  registrationEnd: Date;
  tournamentStart: Date;
  tournamentEnd: Date;
  prizePool: PrizePool;
  rules: string;
  isPublic: boolean;
  inviteCode?: string;
  status: TournamentStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### teams
```typescript
{
  id: string;
  name: string;
  logo?: string;
  captainId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### matches
```typescript
{
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  team1Id: string;
  team2Id: string;
  team1Score?: number;
  team2Score?: number;
  winnerId?: string;
  status: MatchStatus;
  scheduledTime?: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎮 Game yang Didukung

- Mobile Legends
- Valorant
- PUBG Mobile
- Free Fire
- eFootball
- Dota 2
- League of Legends
- CS:GO
- FIFA
- Other (Custom)

## 🏆 Format Turnamen

- Single Elimination
- Double Elimination
- Round Robin
- Swiss System

## 📱 Screenshots

[Gambar screenshot aplikasi akan ditambahkan di sini]

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
- Discord: [Link Discord Server]

## 🙏 Acknowledgments

- React Native community
- Expo team
- Firebase team
- Semua kontributor dan beta tester

---

**Arena Master** - Platform Turnamen E-Sports Terdepan 🏆