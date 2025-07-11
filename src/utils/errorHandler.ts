import { Alert } from 'react-native';

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: AppError[] = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Handle Firebase Auth errors
  static handleAuthError(error: any): AppError {
    let appError: AppError;

    switch (error.code) {
      case 'auth/user-not-found':
        appError = {
          code: 'USER_NOT_FOUND',
          message: 'Email tidak terdaftar. Silakan cek kembali atau daftar akun baru.',
        };
        break;
      case 'auth/wrong-password':
        appError = {
          code: 'WRONG_PASSWORD',
          message: 'Password salah. Silakan coba lagi.',
        };
        break;
      case 'auth/email-already-in-use':
        appError = {
          code: 'EMAIL_EXISTS',
          message: 'Email sudah terdaftar. Silakan gunakan email lain atau login.',
        };
        break;
      case 'auth/weak-password':
        appError = {
          code: 'WEAK_PASSWORD',
          message: 'Password terlalu lemah. Minimal 6 karakter.',
        };
        break;
      case 'auth/invalid-email':
        appError = {
          code: 'INVALID_EMAIL',
          message: 'Format email tidak valid.',
        };
        break;
      case 'auth/too-many-requests':
        appError = {
          code: 'TOO_MANY_REQUESTS',
          message: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.',
        };
        break;
      case 'auth/network-request-failed':
        appError = {
          code: 'NETWORK_ERROR',
          message: 'Koneksi internet bermasalah. Silakan cek koneksi Anda.',
        };
        break;
      default:
        appError = {
          code: 'UNKNOWN_ERROR',
          message: 'Terjadi kesalahan. Silakan coba lagi.',
          details: error,
        };
    }

    return appError;
  }

  // Handle Firestore errors
  static handleFirestoreError(error: any): AppError {
    let appError: AppError;

    switch (error.code) {
      case 'permission-denied':
        appError = {
          code: 'PERMISSION_DENIED',
          message: 'Anda tidak memiliki izin untuk melakukan operasi ini.',
        };
        break;
      case 'unavailable':
        appError = {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Layanan sedang tidak tersedia. Silakan coba lagi nanti.',
        };
        break;
      case 'not-found':
        appError = {
          code: 'NOT_FOUND',
          message: 'Data tidak ditemukan.',
        };
        break;
      case 'already-exists':
        appError = {
          code: 'ALREADY_EXISTS',
          message: 'Data sudah ada.',
        };
        break;
      case 'resource-exhausted':
        appError = {
          code: 'QUOTA_EXCEEDED',
          message: 'Batas penggunaan telah tercapai. Silakan coba lagi nanti.',
        };
        break;
      default:
        appError = {
          code: 'FIRESTORE_ERROR',
          message: 'Terjadi kesalahan pada database. Silakan coba lagi.',
          details: error,
        };
    }

    return appError;
  }

  // Handle Storage errors
  static handleStorageError(error: any): AppError {
    let appError: AppError;

    switch (error.code) {
      case 'storage/unauthorized':
        appError = {
          code: 'STORAGE_UNAUTHORIZED',
          message: 'Anda tidak memiliki izin untuk mengunggah file.',
        };
        break;
      case 'storage/canceled':
        appError = {
          code: 'STORAGE_CANCELED',
          message: 'Upload file dibatalkan.',
        };
        break;
      case 'storage/unknown':
        appError = {
          code: 'STORAGE_UNKNOWN',
          message: 'Terjadi kesalahan saat mengunggah file.',
        };
        break;
      case 'storage/invalid-checksum':
        appError = {
          code: 'STORAGE_INVALID_CHECKSUM',
          message: 'File rusak. Silakan coba lagi.',
        };
        break;
      case 'storage/retry-limit-exceeded':
        appError = {
          code: 'STORAGE_RETRY_LIMIT',
          message: 'Upload gagal setelah beberapa percobaan. Silakan coba lagi.',
        };
        break;
      case 'storage/invalid-format':
        appError = {
          code: 'STORAGE_INVALID_FORMAT',
          message: 'Format file tidak didukung.',
        };
        break;
      case 'storage/file-too-large':
        appError = {
          code: 'STORAGE_FILE_TOO_LARGE',
          message: 'Ukuran file terlalu besar. Maksimal 10MB.',
        };
        break;
      default:
        appError = {
          code: 'STORAGE_ERROR',
          message: 'Terjadi kesalahan saat mengunggah file. Silakan coba lagi.',
          details: error,
        };
    }

    return appError;
  }

  // Handle network errors
  static handleNetworkError(error: any): AppError {
    return {
      code: 'NETWORK_ERROR',
      message: 'Koneksi internet bermasalah. Silakan cek koneksi Anda dan coba lagi.',
      details: error,
    };
  }

  // Handle validation errors
  static handleValidationError(field: string, message: string): AppError {
    return {
      code: 'VALIDATION_ERROR',
      message: `${field}: ${message}`,
    };
  }

  // Handle general errors
  static handleGeneralError(error: any): AppError {
    return {
      code: 'GENERAL_ERROR',
      message: 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
      details: error,
    };
  }

  // Log error
  logError(error: AppError): void {
    this.errorLog.push({
      ...error,
      timestamp: new Date(),
    });

    // In production, you might want to send this to a logging service
    console.error('App Error:', error);
  }

  // Get error log
  getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  // Clear error log
  clearErrorLog(): void {
    this.errorLog = [];
  }

  // Show error alert
  static showErrorAlert(error: AppError, title: string = 'Error'): void {
    Alert.alert(title, error.message, [
      {
        text: 'OK',
        style: 'default',
      },
    ]);
  }

  // Show error alert with retry option
  static showErrorAlertWithRetry(
    error: AppError,
    onRetry: () => void,
    title: string = 'Error'
  ): void {
    Alert.alert(title, error.message, [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Coba Lagi',
        onPress: onRetry,
      },
    ]);
  }

  // Show confirmation dialog
  static showConfirmationDialog(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    Alert.alert(title, message, [
      {
        text: 'Batal',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'OK',
        onPress: onConfirm,
      },
    ]);
  }

  // Handle async operations with error handling
  static async handleAsyncOperation<T>(
    operation: () => Promise<T>,
    errorHandler?: (error: AppError) => void
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error: any) {
      const appError = this.handleGeneralError(error);
      this.getInstance().logError(appError);
      
      if (errorHandler) {
        errorHandler(appError);
      } else {
        this.showErrorAlert(appError);
      }
      
      return null;
    }
  }

  // Handle async operations with retry
  static async handleAsyncOperationWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T | null> {
    let lastError: AppError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = this.handleGeneralError(error);
        this.getInstance().logError(lastError);

        if (attempt === maxRetries) {
          this.showErrorAlert(lastError);
          return null;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    return null;
  }

  // Check if error is retryable
  static isRetryableError(error: AppError): boolean {
    const retryableCodes = [
      'NETWORK_ERROR',
      'SERVICE_UNAVAILABLE',
      'QUOTA_EXCEEDED',
      'STORAGE_RETRY_LIMIT',
    ];

    return retryableCodes.includes(error.code);
  }

  // Get user-friendly error message
  static getUserFriendlyMessage(error: AppError): string {
    // You can customize this based on your app's needs
    return error.message;
  }

  // Handle specific app errors
  static handleAppSpecificError(context: string, error: any): AppError {
    switch (context) {
      case 'tournament_creation':
        return {
          code: 'TOURNAMENT_CREATION_ERROR',
          message: 'Gagal membuat turnamen. Silakan coba lagi.',
          details: error,
        };
      case 'team_registration':
        return {
          code: 'TEAM_REGISTRATION_ERROR',
          message: 'Gagal mendaftarkan tim. Silakan coba lagi.',
          details: error,
        };
      case 'match_update':
        return {
          code: 'MATCH_UPDATE_ERROR',
          message: 'Gagal memperbarui skor pertandingan. Silakan coba lagi.',
          details: error,
        };
      case 'bracket_generation':
        return {
          code: 'BRACKET_GENERATION_ERROR',
          message: 'Gagal membuat bracket turnamen. Silakan coba lagi.',
          details: error,
        };
      case 'image_upload':
        return {
          code: 'IMAGE_UPLOAD_ERROR',
          message: 'Gagal mengunggah gambar. Silakan coba lagi.',
          details: error,
        };
      default:
        return this.handleGeneralError(error);
    }
  }
}

export default ErrorHandler;