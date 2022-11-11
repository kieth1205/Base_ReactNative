import AsyncStorage from '@react-native-async-storage/async-storage';

const keys = {
  hasSeenIntroduction: 'hasSeenIntroduction',
};

export const getHasSeenIntroduction = async () => {
  return JSON.parse(
    (await AsyncStorage.getItem(keys.hasSeenIntroduction)) as string,
  );
};
export const setHasSeenIntroduction = async () => {
  await AsyncStorage.setItem(keys.hasSeenIntroduction, JSON.stringify(true));
};
