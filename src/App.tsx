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
import CrashlyticsDashboard from './screens/Crashlytics';
import { getCrashlytics, setUserId } from '@react-native-firebase/crashlytics';

const messagingInstance = getMessaging();
const crashlyticsInstance = getCrashlytics();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    setUserId(crashlyticsInstance, 'user123');
  },[])

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
        <CrashlyticsDashboard />
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
