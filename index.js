/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { createNotificationChannel } from './src/services/notificationService';

if (Platform.OS === 'android') {
    createNotificationChannel();
}

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('Message handled in background:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
