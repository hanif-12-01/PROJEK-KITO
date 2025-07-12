# Cara Menjalankan Aplikasi Arena Master

## 🚀 Quick Start

### 1. Setup Firebase (Wajib)
Sebelum menjalankan aplikasi, Anda harus setup Firebase:

1. **Buat Project Firebase**
   - Buka [Firebase Console](https://console.firebase.google.com)
   - Klik "Create a project" atau pilih project yang ada
   - Beri nama project (misal: "arena-master")

2. **Aktifkan Authentication**
   - Di sidebar kiri, klik "Authentication"
   - Klik "Get started"
   - Pilih tab "Sign-in method"
   - Aktifkan "Email/Password"

3. **Aktifkan Firestore Database**
   - Di sidebar kiri, klik "Firestore Database"
   - Klik "Create database"
   - Pilih "Start in test mode"

4. **Dapatkan Konfigurasi**
   - Klik icon gear (⚙️) di sidebar kiri
   - Pilih "Project settings"
   - Scroll ke bawah ke "Your apps"
   - Klik icon web (</>)
   - Beri nama app (misal: "Arena Master Web")
   - Copy konfigurasi yang muncul

5. **Update File Konfigurasi**
   - Buka file `src/services/firebaseConfig.js`
   - Ganti semua `YOUR_*` dengan nilai dari Firebase Console

### 2. Install Dependencies
```bash
npm install
```

### 3. Menjalankan Aplikasi

#### 🖥️ Web (Paling Mudah)
```bash
npm run web
```
- Aplikasi akan terbuka di browser
- URL: `http://localhost:8081`

#### 📱 Mobile dengan Expo Go
```bash
npx expo start
```
- Install Expo Go di smartphone
- Scan QR code yang muncul
- Aplikasi akan terbuka di smartphone

#### 🤖 Android (Perlu Android Studio)
```bash
npm run android
```
**Note**: Perlu Android SDK dan emulator/device

#### 🍎 iOS (Hanya di macOS)
```bash
npm run ios
```
**Note**: Hanya tersedia di macOS dengan Xcode

## 🧪 Testing Aplikasi

### Test Login/Register
1. Buka aplikasi di web atau mobile
2. Klik "Register" untuk membuat akun baru
3. Masukkan email dan password
4. Klik "Register"
5. Setelah berhasil, Anda akan masuk ke Dashboard

### Test Dashboard
- Dashboard menampilkan menu-menu fitur
- Klik menu untuk melihat "Coming Soon" message
- Klik "Logout" untuk keluar

## 🔧 Troubleshooting

### Error "Firebase: Error (auth/invalid-api-key)"
- Pastikan konfigurasi Firebase sudah benar
- Cek file `src/services/firebaseConfig.js`

### Error Android SDK
```
Failed to resolve the Android SDK path
```
**Solusi**: Gunakan web atau Expo Go
```bash
npm run web
# atau
npx expo start
```

### Error "Cannot find module"
```bash
npm install
# atau
rm -rf node_modules && npm install
```

### Aplikasi tidak load
1. Stop server: `Ctrl + C`
2. Clear cache: `npx expo start --clear`
3. Restart: `npm run web`

## 📱 Build APK

### Untuk Android
```bash
npx expo build:android
```

### Untuk iOS
```bash
npx expo build:ios
```

## 🎯 Fitur yang Sudah Bisa Dicoba

✅ **Login/Register**: Autentikasi dengan email/password
✅ **Dashboard**: Halaman utama dengan menu
✅ **Logout**: Keluar dari aplikasi
✅ **Dark Mode**: UI dengan tema gelap
✅ **Responsive**: Bekerja di web dan mobile

## 🚧 Fitur yang Masih Dalam Pengembangan

- Pembuatan turnamen
- Manajemen peserta
- Bracket generator
- Live scoring
- Notifikasi real-time

## 📞 Support

Jika ada masalah, cek:
1. Firebase Console sudah setup dengan benar
2. Dependencies sudah terinstall: `npm install`
3. Port 8081 tidak digunakan aplikasi lain
4. Internet connection stabil