/**
 * Author
 * Mohit Kumar
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { foregroundNotificationListener, getFCMToken, requestUserPermission, tokenRefreshListener } from './services/notificationService';
import { getInitialNotification, getMessaging, onNotificationOpenedApp } from '@react-native-firebase/messaging';
import RemoteConfigDashboard from './screens/RemoteConfigDashboard';
import { setupRemoteConfig } from './services/remoteConfigService';

const messagingInstance = getMessaging();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setupRemoteConfig();
  }, [])

  useEffect(() => {
    requestUserPermission()
      .then(result => {
        if (result) {
          getFCMToken();
        }
      })
      .catch(console.error);

    getInitialNotification(messagingInstance).then(remoteMessage => {
      if (remoteMessage) {
        console.log('Opened from quit state');
      }
    });

    const unsubscribeOpenedApp =
      onNotificationOpenedApp(messagingInstance, remoteMessage => {
        if (remoteMessage?.data?.screen === 'OrderDetails') {
          // do whatever you want i.e navigate user to OrderDetails screen
        }
      });

    const unsubscribeForeground =
      foregroundNotificationListener();

    const unsubscribeTokenRefresh =
      tokenRefreshListener();

    return () => {
      unsubscribeOpenedApp();
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RemoteConfigDashboard />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    color: 'white'
  }
})
