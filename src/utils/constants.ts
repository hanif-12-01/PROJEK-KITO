// App Constants
export const APP_NAME = 'Arena Master';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Platform Manajemen Turnamen E-Sports';

// API Constants
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second

// File Upload Constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
export const MAX_IMAGE_DIMENSION = 2048; // 2048px

// Tournament Constants
export const MIN_TOURNAMENT_PARTICIPANTS = 2;
export const MAX_TOURNAMENT_PARTICIPANTS = 1000;
export const MAX_ROUND_ROBIN_PARTICIPANTS = 50;
export const MIN_TOURNAMENT_NAME_LENGTH = 3;
export const MAX_TOURNAMENT_NAME_LENGTH = 100;
export const MIN_TOURNAMENT_DESCRIPTION_LENGTH = 10;
export const MAX_TOURNAMENT_DESCRIPTION_LENGTH = 1000;

// Team Constants
export const MIN_TEAM_NAME_LENGTH = 2;
export const MAX_TEAM_NAME_LENGTH = 50;
export const MIN_PLAYER_NAME_LENGTH = 2;
export const MAX_PLAYER_NAME_LENGTH = 50;

// Game Constants
export const GAME_TYPES = [
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
] as const;

export const TOURNAMENT_FORMATS = [
  'Single Elimination',
  'Double Elimination',
  'Round Robin',
  'Swiss System',
] as const;

// Team Size Limits by Game
export const GAME_TEAM_SIZES: { [key: string]: { min: number; max: number } } = {
  'Mobile Legends': { min: 5, max: 5 },
  'Valorant': { min: 5, max: 5 },
  'PUBG Mobile': { min: 4, max: 4 },
  'Free Fire': { min: 4, max: 4 },
  'eFootball': { min: 1, max: 1 },
  'Dota 2': { min: 5, max: 5 },
  'League of Legends': { min: 5, max: 5 },
  'CS:GO': { min: 5, max: 5 },
  'FIFA': { min: 1, max: 1 },
  'Other': { min: 1, max: 10 },
};

// Prize Pool Constants
export const MIN_PRIZE_POOL = 0;
export const MAX_PRIZE_POOL = 1000000000; // 1 billion
export const DEFAULT_CURRENCY = 'IDR';

// Date Constants
export const MIN_TOURNAMENT_DURATION_DAYS = 1;
export const MAX_TOURNAMENT_DURATION_DAYS = 365;
export const MIN_REGISTRATION_DURATION_HOURS = 1;
export const MAX_REGISTRATION_DURATION_DAYS = 30;

// Match Constants
export const MIN_MATCH_DURATION_MINUTES = 1;
export const MAX_MATCH_DURATION_MINUTES = 480; // 8 hours
export const DEFAULT_MATCH_DURATION_MINUTES = 30;

// Notification Constants
export const MAX_NOTIFICATION_TITLE_LENGTH = 100;
export const MAX_NOTIFICATION_MESSAGE_LENGTH = 500;
export const NOTIFICATION_TTL_DAYS = 30; // 30 days

// User Constants
export const MIN_DISPLAY_NAME_LENGTH = 2;
export const MAX_DISPLAY_NAME_LENGTH = 50;
export const MIN_PASSWORD_LENGTH = 6;
export const STRONG_PASSWORD_MIN_LENGTH = 8;

// Social Media Constants
export const MIN_SOCIAL_MEDIA_HANDLE_LENGTH = 3;
export const MAX_SOCIAL_MEDIA_HANDLE_LENGTH = 30;

// Game ID Constants
export const MIN_GAME_ID_LENGTH = 4;
export const MAX_GAME_ID_LENGTH = 20;

// Tournament Code Constants
export const TOURNAMENT_CODE_LENGTH = 8;
export const MIN_TOURNAMENT_CODE_LENGTH = 6;
export const MAX_TOURNAMENT_CODE_LENGTH = 12;

// Pagination Constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE_SIZE = 5;

// Cache Constants
export const CACHE_DURATION_MINUTES = 5;
export const CACHE_MAX_SIZE = 100;

// Error Constants
export const MAX_ERROR_LOG_SIZE = 1000;
export const ERROR_RETENTION_DAYS = 7;

// Security Constants
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_DURATION_MINUTES = 15;
export const SESSION_TIMEOUT_MINUTES = 60;

// Performance Constants
export const DEBOUNCE_DELAY = 300; // milliseconds
export const THROTTLE_DELAY = 1000; // milliseconds
export const ANIMATION_DURATION = 300; // milliseconds

// UI Constants
export const BORDER_RADIUS = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
  XLARGE: 16,
  FULL: 9999,
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

export const FONT_SIZE = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32,
};

export const ICON_SIZE = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
  XLARGE: 48,
};

// Animation Constants
export const ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-in-out',
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  SETTINGS: 'app_settings',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  NOTIFICATIONS: 'notifications_enabled',
  BIOMETRIC: 'biometric_enabled',
  LAST_SYNC: 'last_sync_timestamp',
  CACHE_DATA: 'cache_data',
  ERROR_LOG: 'error_log',
} as const;

// Route Names
export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main
  MAIN: 'Main',
  DASHBOARD: 'Dashboard',
  TOURNAMENTS: 'Tournaments',
  TEAMS: 'Teams',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  
  // Tournament
  TOURNAMENT_DETAIL: 'TournamentDetail',
  CREATE_TOURNAMENT: 'CreateTournament',
  EDIT_TOURNAMENT: 'EditTournament',
  BRACKET_VIEW: 'BracketView',
  
  // Team
  TEAM_DETAIL: 'TeamDetail',
  CREATE_TEAM: 'CreateTeam',
  EDIT_TEAM: 'EditTeam',
  
  // Match
  MATCH_DETAIL: 'MatchDetail',
  
  // Admin
  ADMIN_DASHBOARD: 'AdminDashboard',
  PARTICIPANTS: 'Participants',
  
  // Participant
  PARTICIPANT_DASHBOARD: 'ParticipantDashboard',
  MY_TEAM: 'MyTeam',
} as const;

// Event Names
export const EVENTS = {
  // Auth
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_REGISTER: 'user_register',
  
  // Tournament
  TOURNAMENT_CREATED: 'tournament_created',
  TOURNAMENT_UPDATED: 'tournament_updated',
  TOURNAMENT_DELETED: 'tournament_deleted',
  TOURNAMENT_STARTED: 'tournament_started',
  TOURNAMENT_COMPLETED: 'tournament_completed',
  
  // Team
  TEAM_CREATED: 'team_created',
  TEAM_UPDATED: 'team_updated',
  TEAM_DELETED: 'team_deleted',
  TEAM_REGISTERED: 'team_registered',
  
  // Match
  MATCH_CREATED: 'match_created',
  MATCH_UPDATED: 'match_updated',
  MATCH_COMPLETED: 'match_completed',
  
  // Notification
  NOTIFICATION_RECEIVED: 'notification_received',
  NOTIFICATION_READ: 'notification_read',
} as const;

// Error Codes
export const ERROR_CODES = {
  // Auth
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  
  // Network
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Database
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  
  // Storage
  STORAGE_UNAUTHORIZED: 'STORAGE_UNAUTHORIZED',
  STORAGE_CANCELED: 'STORAGE_CANCELED',
  STORAGE_UNKNOWN: 'STORAGE_UNKNOWN',
  STORAGE_INVALID_CHECKSUM: 'STORAGE_INVALID_CHECKSUM',
  STORAGE_RETRY_LIMIT: 'STORAGE_RETRY_LIMIT',
  STORAGE_INVALID_FORMAT: 'STORAGE_INVALID_FORMAT',
  STORAGE_FILE_TOO_LARGE: 'STORAGE_FILE_TOO_LARGE',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  
  // App Specific
  TOURNAMENT_CREATION_ERROR: 'TOURNAMENT_CREATION_ERROR',
  TEAM_REGISTRATION_ERROR: 'TEAM_REGISTRATION_ERROR',
  MATCH_UPDATE_ERROR: 'MATCH_UPDATE_ERROR',
  BRACKET_GENERATION_ERROR: 'BRACKET_GENERATION_ERROR',
  IMAGE_UPLOAD_ERROR: 'IMAGE_UPLOAD_ERROR',
  
  // General
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  GENERAL_ERROR: 'GENERAL_ERROR',
} as const;

// Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

// Time Formats
export const TIME_FORMATS = {
  SHORT: 'short',
  LONG: 'long',
  TIME: 'time',
  DATE: 'date',
  DATETIME: 'datetime',
} as const;

// Currency Formats
export const CURRENCY_FORMATS = {
  IDR: 'id-ID',
  USD: 'en-US',
  EUR: 'de-DE',
  JPY: 'ja-JP',
} as const;

// Locale
export const LOCALE = {
  ID: 'id-ID',
  EN: 'en-US',
} as const;

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Platform
export const PLATFORM = {
  IOS: 'ios',
  ANDROID: 'android',
  WEB: 'web',
} as const;