# API Documentation - Arena Master

## Overview
Arena Master menggunakan Firebase sebagai backend dengan Firestore sebagai database real-time. Dokumentasi ini menjelaskan struktur data dan operasi yang tersedia.

## Authentication

### Sign In
```typescript
// Sign in dengan email dan password
const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

### Sign Up
```typescript
// Sign up dengan email, password, dan display name
const signUp = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
};
```

### Sign Out
```typescript
// Sign out user
const signOut = async () => {
  await signOut(auth);
};
```

## Database Collections

### Users Collection
**Path**: `users/{userId}`

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'participant' | 'spectator';
  createdAt: Date;
  updatedAt: Date;
}
```

**Operations**:
- `GET /users/{userId}` - Get user by ID
- `POST /users/{userId}` - Create new user
- `PUT /users/{userId}` - Update user
- `DELETE /users/{userId}` - Delete user

### Tournaments Collection
**Path**: `tournaments/{tournamentId}`

```typescript
interface Tournament {
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

**Operations**:
- `GET /tournaments` - Get all tournaments (with filters)
- `GET /tournaments/{tournamentId}` - Get tournament by ID
- `POST /tournaments` - Create new tournament
- `PUT /tournaments/{tournamentId}` - Update tournament
- `DELETE /tournaments/{tournamentId}` - Delete tournament

**Query Examples**:
```typescript
// Get public tournaments
const publicTournaments = await getDocs(
  query(collection(db, 'tournaments'), where('isPublic', '==', true))
);

// Get tournaments by game
const mobileLegendsTournaments = await getDocs(
  query(collection(db, 'tournaments'), where('game', '==', 'Mobile Legends'))
);

// Get active tournaments
const activeTournaments = await getDocs(
  query(
    collection(db, 'tournaments'),
    where('status', 'in', ['registration_open', 'in_progress'])
  )
);
```

### Teams Collection
**Path**: `teams/{teamId}`

```typescript
interface Team {
  id: string;
  name: string;
  logo?: string;
  captainId: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  userId: string;
  displayName: string;
  role: 'captain' | 'member';
  joinedAt: Date;
}
```

**Operations**:
- `GET /teams/{teamId}` - Get team by ID
- `POST /teams` - Create new team
- `PUT /teams/{teamId}` - Update team
- `DELETE /teams/{teamId}` - Delete team

### Matches Collection
**Path**: `matches/{matchId}`

```typescript
interface Match {
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

**Operations**:
- `GET /matches?tournamentId={tournamentId}` - Get matches by tournament
- `GET /matches/{matchId}` - Get match by ID
- `POST /matches` - Create new match
- `PUT /matches/{matchId}` - Update match (scores, status)
- `DELETE /matches/{matchId}` - Delete match

### Registrations Collection
**Path**: `registrations/{registrationId}`

```typescript
interface Registration {
  id: string;
  tournamentId: string;
  teamId: string;
  status: RegistrationStatus;
  registeredAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  checkInAt?: Date;
}
```

**Operations**:
- `GET /registrations?tournamentId={tournamentId}` - Get registrations by tournament
- `GET /registrations?teamId={teamId}` - Get registrations by team
- `POST /registrations` - Register team for tournament
- `PUT /registrations/{registrationId}` - Update registration status
- `DELETE /registrations/{registrationId}` - Cancel registration

### Notifications Collection
**Path**: `notifications/{notificationId}`

```typescript
interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}
```

**Operations**:
- `GET /notifications?userId={userId}` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/{notificationId}` - Mark as read
- `DELETE /notifications/{notificationId}` - Delete notification

## Real-time Listeners

### Tournament Updates
```typescript
// Listen to tournament changes
const unsubscribe = onSnapshot(
  doc(db, 'tournaments', tournamentId),
  (doc) => {
    if (doc.exists()) {
      const tournament = doc.data() as Tournament;
      // Update UI with tournament data
    }
  }
);
```

### Match Updates
```typescript
// Listen to match updates
const unsubscribe = onSnapshot(
  query(
    collection(db, 'matches'),
    where('tournamentId', '==', tournamentId)
  ),
  (snapshot) => {
    const matches = snapshot.docs.map(doc => doc.data() as Match);
    // Update bracket UI
  }
);
```

### User Notifications
```typescript
// Listen to user notifications
const unsubscribe = onSnapshot(
  query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  ),
  (snapshot) => {
    const notifications = snapshot.docs.map(doc => doc.data() as Notification);
    // Update notification UI
  }
);
```

## Cloud Functions

### Generate Bracket
```typescript
// Trigger: HTTP request
// Purpose: Generate tournament bracket based on registered teams
export const generateBracket = functions.https.onCall(async (data, context) => {
  const { tournamentId } = data;
  // Logic to generate bracket
  return { success: true, bracketId: 'generated-bracket-id' };
});
```

### Send Notification
```typescript
// Trigger: Firestore write
// Purpose: Send push notification when notification is created
export const sendNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    // Send push notification
  });
```

### Update Tournament Status
```typescript
// Trigger: Firestore write
// Purpose: Update tournament status based on dates
export const updateTournamentStatus = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    // Check and update tournament statuses
  });
```

## Error Handling

### Common Error Codes
```typescript
enum ErrorCode {
  // Authentication
  AUTH_USER_NOT_FOUND = 'auth/user-not-found',
  AUTH_WRONG_PASSWORD = 'auth/wrong-password',
  AUTH_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  
  // Firestore
  FIRESTORE_PERMISSION_DENIED = 'permission-denied',
  FIRESTORE_NOT_FOUND = 'not-found',
  FIRESTORE_ALREADY_EXISTS = 'already-exists',
  
  // Custom
  TOURNAMENT_FULL = 'tournament-full',
  REGISTRATION_CLOSED = 'registration-closed',
  TEAM_ALREADY_REGISTERED = 'team-already-registered',
}
```

### Error Response Format
```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}
```

## Security Rules

### Firestore Security Rules
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
      allow read: if true; // Public read access
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

## Rate Limiting

### API Limits
- **Authentication**: 10 requests per minute per IP
- **Tournament Creation**: 5 tournaments per hour per user
- **Registration**: 10 registrations per hour per user
- **Match Updates**: 50 updates per hour per tournament

## Webhooks

### Tournament Status Changes
```typescript
// Webhook URL: https://your-domain.com/webhooks/tournament-status
interface TournamentStatusWebhook {
  event: 'tournament.status.changed';
  tournamentId: string;
  oldStatus: TournamentStatus;
  newStatus: TournamentStatus;
  timestamp: Date;
}
```

### Match Results
```typescript
// Webhook URL: https://your-domain.com/webhooks/match-result
interface MatchResultWebhook {
  event: 'match.result.completed';
  matchId: string;
  tournamentId: string;
  winnerId: string;
  score: {
    team1: number;
    team2: number;
  };
  timestamp: Date;
}
```

## Testing

### Test Data
```typescript
// Sample tournament data for testing
const sampleTournament: Tournament = {
  id: 'test-tournament-1',
  name: 'Test Tournament',
  game: 'Mobile Legends',
  format: 'Single Elimination',
  maxParticipants: 16,
  currentParticipants: 0,
  registrationStart: new Date('2024-01-01'),
  registrationEnd: new Date('2024-01-15'),
  tournamentStart: new Date('2024-01-20'),
  tournamentEnd: new Date('2024-01-25'),
  prizePool: {
    first: 1000000,
    second: 500000,
    third: 250000,
    currency: 'IDR',
  },
  rules: 'Test rules',
  isPublic: true,
  status: 'registration_open',
  createdBy: 'test-admin',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get tournament
const getTournament = async (tournamentId: string) => {
  const docRef = doc(db, 'tournaments', tournamentId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Tournament;
  } else {
    throw new Error('Tournament not found');
  }
};

// Create tournament
const createTournament = async (tournament: Omit<Tournament, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = doc(collection(db, 'tournaments'));
  const newTournament: Tournament = {
    ...tournament,
    id: docRef.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await setDoc(docRef, newTournament);
  return newTournament;
};
```

### Python
```python
import firebase_admin
from firebase_admin import firestore

db = firestore.client()

def get_tournament(tournament_id: str):
    doc_ref = db.collection('tournaments').document(tournament_id)
    doc = doc_ref.get()
    
    if doc.exists:
        return doc.to_dict()
    else:
        raise Exception('Tournament not found')

def create_tournament(tournament_data: dict):
    doc_ref = db.collection('tournaments').document()
    tournament_data['id'] = doc_ref.id
    tournament_data['createdAt'] = firestore.SERVER_TIMESTAMP
    tournament_data['updatedAt'] = firestore.SERVER_TIMESTAMP
    
    doc_ref.set(tournament_data)
    return tournament_data
```

---

**Note**: Dokumentasi ini akan diperbarui secara berkala sesuai dengan perkembangan aplikasi.