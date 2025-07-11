# Deployment Guide - Arena Master

Panduan lengkap untuk mendeploy aplikasi Arena Master ke berbagai platform.

## Prerequisites

Sebelum melakukan deployment, pastikan Anda telah:

1. **Setup Firebase Project**
   - Buat project di [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, Storage, dan Cloud Messaging
   - Download file konfigurasi Firebase

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   - Buat file `.env` di root project
   - Tambahkan konfigurasi Firebase

## Firebase Setup

### 1. Create Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Masukkan nama project: `arena-master`
4. Enable Google Analytics (opsional)
5. Klik "Create project"

### 2. Enable Services

#### Authentication
1. Di sidebar, klik "Authentication"
2. Klik "Get started"
3. Pilih tab "Sign-in method"
4. Enable "Email/Password"
5. Enable "Google" (opsional)
6. Klik "Save"

#### Firestore Database
1. Di sidebar, klik "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi database (pilih yang terdekat)
5. Klik "Done"

#### Storage
1. Di sidebar, klik "Storage"
2. Klik "Get started"
3. Pilih "Start in test mode"
4. Pilih lokasi storage
5. Klik "Done"

#### Cloud Messaging
1. Di sidebar, klik "Cloud Messaging"
2. Klik "Get started"
3. Setup project untuk FCM

### 3. Update Configuration

Update file `src/constants/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key-from-firebase",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Setup Security Rules

#### Firestore Rules
Buka Firestore Database > Rules dan paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tournaments
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (resource.data.createdBy == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Teams
    match /teams/{teamId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (resource.data.captainId == request.auth.uid || 
         resource.data.members[request.auth.uid] != null);
    }
    
    // Matches
    match /matches/{matchId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Registrations
    match /registrations/{registrationId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.teamId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

#### Storage Rules
Buka Storage > Rules dan paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Android Deployment

### 1. Build APK

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS Build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### 2. Build AAB (Google Play Store)

```bash
# Build AAB
eas build --platform android --profile production
```

### 3. Upload to Google Play Store

1. Buka [Google Play Console](https://play.google.com/console)
2. Buat aplikasi baru
3. Upload AAB file
4. Isi informasi aplikasi:
   - Nama: Arena Master
   - Deskripsi singkat: Platform Turnamen E-Sports Terdepan
   - Deskripsi lengkap: [Lihat deskripsi di README.md]
   - Kategori: Games > Sports
   - Rating: 3+
5. Upload screenshot dan icon
6. Submit untuk review

### 4. Internal Testing

```bash
# Build untuk internal testing
eas build --platform android --profile internal
```

## iOS Deployment

### 1. Prerequisites

- Mac computer
- Apple Developer Account ($99/year)
- Xcode installed

### 2. Build IPA

```bash
# Build IPA
eas build --platform ios --profile production
```

### 3. Upload to App Store

1. Buka [App Store Connect](https://appstoreconnect.apple.com)
2. Buat aplikasi baru
3. Upload IPA file
4. Isi informasi aplikasi:
   - Nama: Arena Master
   - Subtitle: E-Sports Tournament Platform
   - Kategori: Games > Sports
   - Rating: 4+
5. Upload screenshot dan icon
6. Submit untuk review

## Web Deployment

### 1. Build Web Version

```bash
# Build web
npm run web

# Atau build untuk production
expo export --platform web
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. Deploy to Netlify

1. Push code ke GitHub
2. Buka [Netlify](https://netlify.com)
3. Connect repository
4. Set build command: `npm run build`
5. Set publish directory: `web-build`
6. Deploy

### 4. Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

## Environment Configuration

### 1. Development

Buat file `.env.development`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-dev-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-dev-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-dev-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-dev-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-dev-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-dev-app-id
```

### 2. Production

Buat file `.env.production`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-prod-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-prod-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-prod-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-prod-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-prod-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-prod-app-id
```

## CI/CD Setup

### 1. GitHub Actions

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy Arena Master

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build web
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### 2. EAS Build

Buat file `eas.json`:

```json
{
  "cli": {
    "version": ">= 3.13.3"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Monitoring & Analytics

### 1. Firebase Analytics

1. Di Firebase Console, buka "Analytics"
2. Setup event tracking
3. Monitor user engagement

### 2. Crashlytics

1. Di Firebase Console, buka "Crashlytics"
2. Setup crash reporting
3. Monitor app stability

### 3. Performance Monitoring

1. Di Firebase Console, buka "Performance"
2. Monitor app performance
3. Track slow operations

## Security Checklist

- [ ] Firebase Security Rules configured
- [ ] API keys are secure
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] Error handling implemented
- [ ] Logging configured

## Performance Optimization

### 1. Image Optimization

```typescript
// Use Expo Image component
import { Image } from 'expo-image';

// Optimize images
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  contentFit="cover"
  placeholder={blurhash}
  transition={1000}
/>
```

### 2. Code Splitting

```typescript
// Lazy load components
const TournamentDetails = React.lazy(() => import('./TournamentDetails'));
```

### 3. Caching

```typescript
// Implement caching
import AsyncStorage from '@react-native-async-storage/async-storage';

const cacheData = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check dependencies
   - Clear cache: `expo r -c`
   - Update Expo SDK

2. **Firebase Connection Issues**
   - Verify API keys
   - Check network connectivity
   - Verify Firebase project settings

3. **App Crashes**
   - Check Crashlytics
   - Review error logs
   - Test on different devices

4. **Performance Issues**
   - Monitor Firebase usage
   - Optimize images
   - Implement caching

### Support

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

## Post-Deployment

### 1. Testing

- [ ] Test on multiple devices
- [ ] Test all user flows
- [ ] Test offline functionality
- [ ] Test push notifications
- [ ] Performance testing

### 2. Monitoring

- [ ] Setup error tracking
- [ ] Monitor user analytics
- [ ] Track performance metrics
- [ ] Monitor Firebase usage

### 3. Maintenance

- [ ] Regular dependency updates
- [ ] Security patches
- [ ] Performance optimization
- [ ] User feedback collection

---

**Note**: Panduan ini akan diperbarui sesuai dengan perkembangan aplikasi dan teknologi terbaru.