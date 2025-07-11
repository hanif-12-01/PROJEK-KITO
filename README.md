# Arena Master - Aplikasi Manajemen Turnamen E-Sports

<div align="center">

⚔️ **Arena Master** ⚔️

**Platform Terpusat untuk Mengelola Seluruh Siklus Hidup Turnamen E-Sports**

[![React Native](https://img.shields.io/badge/React%20Native-0.80.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.4-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)](https://firebase.google.com/)

</div>

## 🎯 Ringkasan Proyek

Arena Master adalah aplikasi mobile cross-platform yang dirancang untuk menyederhanakan pengelolaan turnamen e-sports. Aplikasi ini melayani tiga jenis pengguna utama: **Penyelenggara Turnamen (Admin)**, **Peserta (Tim/Pemain)**, dan **Penonton**, dengan tujuan mengotomatisasi proses pendaftaran, pembuatan bagan, pelaporan skor, dan penyebaran informasi secara real-time.

## ✨ Fitur Utama

### 🏆 Untuk Penyelenggara Turnamen (Admin)

- **Dasbor Admin** - Ringkasan turnamen aktif, pendaftar baru, dan tugas yang perlu diselesaikan
- **Pembuatan Turnamen** - Form lengkap dengan detail turnamen, game, format, dan pengaturan
- **Manajemen Peserta** - Persetujuan/penolakan pendaftaran dan check-in online
- **Generator Bagan Otomatis** - Pembuatan bagan turnamen berdasarkan format yang dipilih
- **Manajemen Pertandingan** - Input skor dan penanganan perselisihan

### 👥 Untuk Peserta (Tim/Pemain)

- **Profil Tim/Pemain** - Pembuatan dan pengelolaan profil dengan logo dan anggota tim
- **Pencarian Turnamen** - Browse turnamen publik dengan filter dan bergabung dengan kode undangan
- **Dasbor Peserta** - Jadwal pertandingan dan posisi dalam bagan
- **Notifikasi Real-Time** - Pemberitahuan untuk jadwal, hasil, dan pengumuman
- **Pelaporan Skor** - Upload screenshot hasil pertandingan

### 👀 Untuk Penonton & Publik

- **Antarmuka Publik** - Akses tanpa login untuk melihat informasi turnamen
- **Live Bracket** - Mengikuti progres turnamen secara real-time
- **Profil Tim** - Informasi dasar tentang tim yang berpartisipasi

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React Native 0.80.1** - Framework cross-platform untuk Android dan iOS
- **TypeScript** - Type safety dan developer experience yang lebih baik
- **React Navigation 6** - Navigasi antar screen yang smooth
- **React Native Paper** - UI components dengan Material Design
- **React Native Vector Icons** - Icon set yang lengkap

### Backend & Database
- **Firebase Firestore** - Database real-time untuk sinkronisasi data
- **Firebase Authentication** - Sistem autentikasi yang aman
- **Firebase Cloud Messaging** - Push notifications
- **Firebase Storage** - Penyimpanan file gambar (logo, screenshot)

### State Management & Utils
- **React Hooks** - State management modern
- **Async Storage** - Penyimpanan data lokal
- **React Native Image Picker** - Upload gambar dari galeri/kamera

## 📱 Game yang Didukung

- 🎮 Mobile Legends: Bang Bang
- 🔫 Valorant
- 🎯 PUBG Mobile
- 🔥 Free Fire
- ⚽ eFootball
- 🎮 Call of Duty Mobile
- 📝 Game Lainnya (Custom)

## 🏗️ Format Turnamen

- **Single Elimination** - Sistem gugur langsung
- **Double Elimination** - Sistem gugur dengan lower bracket
- **Round Robin** - Sistem round robin (coming soon)

## 📁 Struktur Proyek

```
ArenaMaster/
├── src/
│   ├── components/
│   │   ├── common/          # Komponen umum yang reusable
│   │   ├── tournament/      # Komponen khusus turnamen
│   │   └── bracket/         # Komponen untuk tampilan bagan
│   ├── screens/
│   │   ├── auth/           # Screen autentikasi
│   │   ├── admin/          # Screen khusus admin
│   │   ├── participant/    # Screen khusus peserta
│   │   └── spectator/      # Screen khusus penonton
│   ├── navigation/
│   │   └── AppNavigator.tsx # Konfigurasi navigasi utama
│   ├── services/
│   │   ├── firebase.ts     # Konfigurasi Firebase
│   │   ├── authService.ts  # Service autentikasi
│   │   └── tournamentService.ts # Service manajemen turnamen
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── styles/             # Global styles dan themes
├── android/                # Platform Android
├── ios/                    # Platform iOS
└── package.json
```

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js (18+)
- React Native CLI
- Android Studio (untuk Android)
- Xcode (untuk iOS, hanya di macOS)
- Firebase Project

### 1. Clone Repository

```bash
git clone <repository-url>
cd ArenaMaster
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Buat project baru di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan Authentication, Firestore, dan Cloud Messaging
3. Download konfigurasi file:
   - `google-services.json` untuk Android → `android/app/`
   - `GoogleService-Info.plist` untuk iOS → `ios/ArenaMaster/`
4. Update konfigurasi di `src/services/firebase.ts`

### 4. Setup Platform

#### Android
```bash
npx react-native run-android
```

#### iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## 🎮 Alur Kerja Aplikasi

### 1. Registrasi & Autentikasi
- Pengguna mendaftar dengan email/password
- Pilih role: Organizer, Participant, atau Spectator
- Verifikasi email (opsional)

### 2. Pembuatan Turnamen (Admin)
- Admin membuat turnamen baru dengan detail lengkap
- Set format, game, jadwal, dan prize pool
- Pilih turnamen public atau private dengan invite code

### 3. Pendaftaran Tim (Participant)
- Peserta browse turnamen yang tersedia
- Daftar tim dengan approval dari admin
- Check-in sebelum turnamen dimulai

### 4. Bracket Generation (Admin)
- Admin generate bracket setelah pendaftaran ditutup
- Sistem otomatis shuffle dan pair teams
- Support single dan double elimination

### 5. Manajemen Pertandingan
- Admin input hasil pertandingan
- Bracket update secara real-time
- Handling disputes dan screenshot verification

### 6. Live Tracking (Spectator)
- Follow turnamen favorit
- Live bracket updates
- Notifikasi untuk match penting

## 📊 Database Schema

### Collections Firestore

```typescript
// Users
users/{userId}
- id: string
- email: string
- displayName: string
- role: 'organizer' | 'participant' | 'spectator'
- createdAt: Date

// Tournaments
tournaments/{tournamentId}
- name: string
- game: GameType
- format: TournamentFormat
- maxParticipants: number
- status: TournamentStatus
- organizerId: string

// Teams
teams/{teamId}
- name: string
- captainId: string
- members: TeamMember[]
- tournamentIds: string[]

// Matches
matches/{matchId}
- tournamentId: string
- round: number
- team1Id: string
- team2Id: string
- winnerId?: string
- status: MatchStatus

// Participations
participations/{participationId}
- tournamentId: string
- teamId: string
- status: ParticipationStatus
- checkedIn: boolean
```

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` di root directory:

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your_app_id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tournaments are readable by all, writable by owners
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (resource.data.organizerId == request.auth.uid || 
         !exists(/databases/$(database)/documents/tournaments/$(tournamentId)));
    }
    
    // Teams are readable by all, writable by captain
    match /teams/{teamId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (resource.data.captainId == request.auth.uid ||
         !exists(/databases/$(database)/documents/teams/$(teamId)));
    }
  }
}
```

## 🎨 Design System

### Color Palette

```typescript
const colors = {
  primary: '#6C5CE7',      // Purple
  accent: '#00CEC9',       // Teal
  background: '#0F0F23',   // Dark Blue
  surface: '#1A1A2E',     // Darker Blue
  text: '#FFFFFF',        // White
  placeholder: '#74B9FF', // Light Blue
  disabled: '#636E72',    // Gray
};
```

### Typography

- **Headers**: Montserrat Bold
- **Body**: Roboto Regular
- **Accent**: Inter Medium

## 📱 Screenshots

| Splash Screen | Auth Screen | Dashboard |
|---------------|-------------|-----------|
| ![Splash](screenshots/splash.png) | ![Auth](screenshots/auth.png) | ![Dashboard](screenshots/dashboard.png) |

| Tournament List | Bracket View | Team Profile |
|----------------|--------------|--------------|
| ![Tournaments](screenshots/tournaments.png) | ![Bracket](screenshots/bracket.png) | ![Team](screenshots/team.png) |

## 🚀 Deployment

### Android APK

```bash
cd android
./gradlew assembleRelease
```

File APK akan tersedia di: `android/app/build/outputs/apk/release/`

### iOS App Store

```bash
npx react-native run-ios --configuration=Release
```

Kemudian build menggunakan Xcode untuk App Store submission.

## 📈 Roadmap

### V1.0 (Current)
- ✅ Basic tournament management
- ✅ Single/Double elimination brackets
- ✅ Real-time notifications
- ✅ Team management

### V1.1 (Next)
- 🔄 Round Robin format
- 🔄 Advanced statistics
- 🔄 Tournament templates
- 🔄 Multi-language support

### V1.2 (Future)
- 📅 Scheduling system
- 💰 Payment integration
- 📹 Live streaming integration
- 🏆 Achievement system

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: Your Name
- **UI/UX Designer**: Designer Name
- **Backend Developer**: Backend Dev Name

## 📞 Support

- **Email**: support@arenamaster.com
- **Discord**: [Arena Master Community](https://discord.gg/arenamaster)
- **Documentation**: [docs.arenamaster.com](https://docs.arenamaster.com)

## 🙏 Acknowledgments

- React Native team untuk framework yang amazing
- Firebase team untuk backend-as-a-service yang powerful
- Komunitas e-sports Indonesia untuk feedback dan testing

---

<div align="center">

**Arena Master** - Revolusi Manajemen Turnamen E-Sports 🚀

Made with ❤️ for Indonesian E-Sports Community

</div>