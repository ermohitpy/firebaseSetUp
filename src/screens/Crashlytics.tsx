import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getCrashlytics, log, setCrashlyticsCollectionEnabled } from '@react-native-firebase/crashlytics';
const crashlyticsInstance = getCrashlytics();
setCrashlyticsCollectionEnabled(crashlyticsInstance, true);
const CrashlyticsDashboard = () => {
  const triggerCrash = () => {
    // test crash
    log(crashlyticsInstance, 'First Crash!!');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={triggerCrash}>
        <Text style={styles.txt}>{'Trigger Crash'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CrashlyticsDashboard

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: 'red', padding: 10, borderRadius: 5
  },
  txt: { color: 'white', fontSize: 16 }
})
