import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class NotificationService {
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  async getFCMToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
    return null;
  }

  async onMessageReceived() {
    return messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Handle foreground messages here
      // You can show a local notification or update UI
    });
  }

  async onNotificationOpenedApp() {
    return messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      // Handle notification tap when app is in background
    });
  }

  async getInitialNotification() {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage);
      // Handle notification tap when app is closed
    }
  }

  async subscribeToTopic(topic: string) {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to subscribe to topic ${topic}:`, error);
    }
  }

  async unsubscribeFromTopic(topic: string) {
    try {
      await messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to unsubscribe from topic ${topic}:`, error);
    }
  }

  // Subscribe to tournament-specific notifications
  async subscribeToTournament(tournamentId: string) {
    await this.subscribeToTopic(`tournament_${tournamentId}`);
  }

  // Unsubscribe from tournament-specific notifications
  async unsubscribeFromTournament(tournamentId: string) {
    await this.unsubscribeFromTopic(`tournament_${tournamentId}`);
  }

  // Subscribe to team-specific notifications
  async subscribeToTeam(teamId: string) {
    await this.subscribeToTopic(`team_${teamId}`);
  }

  // Unsubscribe from team-specific notifications
  async unsubscribeFromTeam(teamId: string) {
    await this.unsubscribeFromTopic(`team_${teamId}`);
  }
}

export default new NotificationService();