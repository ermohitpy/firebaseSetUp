import { fetchAndActivate, getAll, getRemoteConfig, getValue, setConfigSettings, setDefaults } from "@react-native-firebase/remote-config";

const remoteConfigInstance = getRemoteConfig();
export const setupRemoteConfig = async () => {
  await setConfigSettings(remoteConfigInstance, {
    // for development, set to 0 to always fetch fresh values. In production, consider setting this to a higher value (e.g., 3600000 for 1 hour).
    minimumFetchIntervalMillis: __DEV__ ? 0 : 3600000,
  })
  await setDefaults(remoteConfigInstance, {
    show_new_dashboard: false,
    welcome_message: 'Welcome to our app!',
  }).then(() => {
    console.log('Remote config defaults set successfully');
    fetchRemoteConfigValues();
  }).catch(error => {
    console.error('Error setting remote config defaults:', error);
  });
};

export const fetchRemoteConfigValues = async () => {
  await fetchAndActivate(remoteConfigInstance).then(fetchedRemotely => {
    console.log('Remote config values fetched and activated:', fetchedRemotely);
  }).catch(error => {
    console.error('Error fetching remote config values:', error);
  });
};

export const isNewDashboardEnabled =
  getValue(remoteConfigInstance, 'show_new_dashboard').asBoolean();

const checkSource = () => {
  const awesomeNewFeature = getValue(remoteConfigInstance, 'show_new_dashboard');

  if (awesomeNewFeature.getSource() === 'remote') {
    console.log('Parameter value was from the Firebase servers.');
  } else if (awesomeNewFeature.getSource() === 'default') {
    console.log('Parameter value was from a default value.');
  } else {
    console.log('Parameter value was from a locally cached value.');
  }
}

export type RemoteConfigMap = Record<string, string>;

// to log all remote config values and their sources
export const getAllRemoteConfigValues = (setter: (data: RemoteConfigMap) => void) => {
  const allKeys = getAll(remoteConfigInstance);
  const configValues: RemoteConfigMap = {};

  Object.entries(allKeys).forEach(([key, entry]) => {
    // Extract the string value from the Firebase wrapper
    configValues[key] = entry.asString();
  });

  // Update the state with the clean object
  setter(configValues);

  return allKeys;
};
