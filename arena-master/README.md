# Arena Master - Tournament Management App

Aplikasi manajemen turnamen e-sports yang memungkinkan penyelenggara, peserta, dan penonton untuk mengelola dan berpartisipasi dalam turnamen.

## Fitur Saat Ini

### ✅ Sudah Implementasi
- **Autentikasi**: Login/Register dengan email dan password
- **Dashboard**: Halaman utama dengan menu untuk berbagai fitur
- **UI/UX**: Desain modern dengan dark mode
- **Firebase Integration**: Setup untuk database dan autentikasi

### 🚧 Dalam Pengembangan
- Pembuatan turnamen
- Manajemen peserta
- Bracket generator
- Live scoring
- Notifikasi real-time

## Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Expo CLI: `npm install -g @expo/cli`

### Setup Firebase
1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan Authentication (Email/Password)
3. Aktifkan Firestore Database
4. Copy konfigurasi Firebase ke `src/services/firebaseConfig.js`

### Install Dependencies
```bash
npm install
```

### Menjalankan Aplikasi

#### Web (Paling Mudah)
```bash
npm run web
```
Aplikasi akan terbuka di browser di `http://localhost:8081`

#### Android
```bash
npm run android
```
**Note**: Perlu Android SDK dan emulator/device Android

#### iOS
```bash
npm run ios
```
**Note**: Hanya tersedia di macOS

#### Expo Go (Mobile)
```bash
npx expo start
```
Scan QR code dengan Expo Go app di smartphone

## Struktur Project

```
arena-master/
├── src/
│   ├── components/     # Komponen React Native
│   ├── screens/        # Halaman aplikasi
│   ├── services/       # Firebase dan API services
│   ├── utils/          # Utility functions
│   └── assets/         # Gambar dan assets
├── app/                # Expo Router pages
└── package.json
```

## Teknologi yang Digunakan

- **Frontend**: React Native dengan Expo
- **Backend**: Firebase (Firestore, Authentication)
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet

## Langkah Selanjutnya

1. **Setup Firebase**: Ganti konfigurasi di `src/services/firebaseConfig.js`
2. **Test Login**: Coba register dan login dengan email/password
3. **Development**: Lanjutkan pengembangan fitur turnamen

## Troubleshooting

### Error Android SDK
Jika mendapat error Android SDK, gunakan:
- Web: `npm run web`
- Expo Go: `npx expo start` dan scan QR code

### Error Firebase
Pastikan konfigurasi Firebase sudah benar di `src/services/firebaseConfig.js`

## Kontribusi

Untuk berkontribusi dalam pengembangan aplikasi ini, silakan:
1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push dan buat Pull Request
