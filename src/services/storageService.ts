import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

class StorageService {
  // Upload image to Firebase Storage
  async uploadImage(uri: string, path: string): Promise<string> {
    try {
      const reference = storage().ref(path);
      await reference.putFile(uri);
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload tournament logo
  async uploadTournamentLogo(uri: string, tournamentId: string): Promise<string> {
    const path = `tournaments/${tournamentId}/logo.jpg`;
    return this.uploadImage(uri, path);
  }

  // Upload team logo
  async uploadTeamLogo(uri: string, teamId: string): Promise<string> {
    const path = `teams/${teamId}/logo.jpg`;
    return this.uploadImage(uri, path);
  }

  // Upload user profile picture
  async uploadUserProfilePicture(uri: string, userId: string): Promise<string> {
    const path = `users/${userId}/profile.jpg`;
    return this.uploadImage(uri, path);
  }

  // Upload match screenshot
  async uploadMatchScreenshot(uri: string, matchId: string, teamId: string): Promise<string> {
    const timestamp = new Date().getTime();
    const path = `matches/${matchId}/screenshots/${teamId}_${timestamp}.jpg`;
    return this.uploadImage(uri, path);
  }

  // Delete file from Firebase Storage
  async deleteFile(path: string): Promise<void> {
    try {
      const reference = storage().ref(path);
      await reference.delete();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Get download URL for a file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const reference = storage().ref(path);
      return await reference.getDownloadURL();
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }

  // Generate unique filename
  generateUniqueFilename(originalName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${randomString}.${extension}`;
  }

  // Validate file size (max 10MB)
  validateFileSize(size: number): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    return size <= maxSize;
  }

  // Validate file type (images only)
  validateFileType(mimeType: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(mimeType);
  }
}

export default new StorageService();