import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {replace} from '../navigation/RootNavigation';
import RNBootSplash from 'react-native-bootsplash';

const Entry = () => {
  const [firstRoute, setFirstRoute] = useState<string>('');
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  useEffect(() => {
    const run = async () => {
      //  const hasSeenIntroduction = await getHasSeenIntroduction();
      //  if (!hasSeenIntroduction) {
      //    setFirstRoute(SCREENS_KEY.INTRODUCE.INDEX);
      //    return;
      //  }
      //  const authUser = auth().currentUser;
      //  if (!authUser) {
      //    setFirstRoute(SCREENS_KEY.REGISTER.STEP1);
      //    return;
      //  }
      //  const user = await fs().collection('users').doc(`${authUser?.uid}`).get();
      //  const userData = user.data();
      //  if (userData && userData.register_completed) {
      //    setFirstRoute(SCREENS_KEY.REGISTER.STEP7);
      //  } else if (userData && userData.agree_with_policy) {
      //    setFirstRoute(SCREENS_KEY.REGISTER.STEP3);
      //  } else {
      //    setFirstRoute(SCREENS_KEY.REGISTER.STEP2);
      //  }
    };
    run();
  }, []);

  useEffect(() => {
    if (firstRoute) {
      replace(firstRoute);
    }
  }, [firstRoute]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

Entry.options = {
  headerShown: false,
};
export default Entry;
