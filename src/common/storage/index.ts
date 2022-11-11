import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = async (token: string) =>
  await AsyncStorage.setItem('accessToken', token);

export const getAccessToken = async () =>
  await AsyncStorage.getItem('accessToken');

export const setFcmTokenDevice = async (token: string) =>
  await AsyncStorage.setItem('fcm_token', token);

export const getFcmTokenDevice = async () =>
  await AsyncStorage.getItem('fcm_token');

export const setUniqueDeviceId = async (uniqueId: string) =>
  await AsyncStorage.setItem('unique_device_id', uniqueId);

export const getUniqueDeviceId = async () =>
  await AsyncStorage.getItem('unique_device_id');

export const getDeviceInfo = async () => {
  const keys = ['fcm_token', 'unique_device_id'];
  try {
    const values = await AsyncStorage.multiGet(keys);
    return [values[0][1], values[1][1]];
  } catch (error) {}
};

export const getFirstInstall = async () =>
  await AsyncStorage.getItem('first_install');

export const setPermissionContacts = async () =>
  await AsyncStorage.setItem('contacts_permission', 'checked');

export const getPermissionContacts = async () =>
  await AsyncStorage.getItem('contacts_permission');

export const getNotificationsStatus = async () =>
  await AsyncStorage.getItem('notifications_status');
export const setEmail = async (email: string) =>
  await AsyncStorage.setItem('email', email);

export const getEmail = async () => await AsyncStorage.getItem('email');

// export const setNotificationsStatus = async status =>
//   await AsyncStorage.setItem('notifications_status', status);

// export const setLanguageCode = async languageCode =>
//   await AsyncStorage.setItem('language', languageCode);

// export const getLanguageCode = async () =>
//   await AsyncStorage.getItem('language');
