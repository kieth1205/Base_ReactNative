/* eslint-disable react/jsx-no-undef */
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from 'store';
import {Provider} from 'react-redux';
import Navigation from './navigation/index';
import Toast from 'react-native-toast-message';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './lib/react-query';
import {Linking, Platform} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {getAuth} from './store/slices/authSlice';
import ModalUpdate from './components/ModalUpdate';
import {defaultTheme} from './constants/theme';
import NotifyService from './common/NotifyServices';

const App = () => {
  const [show, setShow] = useState<boolean>(false);

  const fetchRemoteData = async () => {
    try {
      const currentVersion = VersionCheck.getLatestVersion();
      const numCurrent = currentVersion
        .split('.')
        .map((d: string, i) => Math.pow(10, 4 - i * 2) * parseInt(d, 10))
        .reduce((sum, ver) => sum + ver);

      const res = 'asdf.121212';

      const storeVersion = res.toString();
      const numStore = storeVersion
        .split('.')
        .map((d: string, i) => Math.pow(10, 4 - i * 2) * parseInt(d, 10))
        .reduce((sum, ver) => sum + ver);
      setShow(numStore > numCurrent);
    } catch (error) {
      console.log({error});
    }
  };

  const onConfirm = async () => {
    const CHPlay = 'https://play.google.com/store/apps/details?id=com.keypace';
    const AppStore = 'itms-apps://itunes.apple.com/jp/app/id1619774807?mt=8’';
    const link = Platform.OS === 'ios' ? AppStore : CHPlay;
    await Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      error => {
        console.log({error});
      },
    );
  };

  const bootstrap = () => {
    store.dispatch(getAuth());
  };

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    fetchRemoteData();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={defaultTheme}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Navigation />
            <NotifyService />
            <Toast />
            <ModalUpdate
              isVisible={show}
              title={
                '最新バージョンがリリースされています。お手数をおかけしますが、最新バージョンをインストールしてください。'
              }
              textCancel="Cancel"
              textConfirm="OK"
              onConfirm={onConfirm}
            />
          </QueryClientProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
