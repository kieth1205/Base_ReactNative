/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios, {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const baseURL = Config.API_URL as string;

async function authRequestInterceptor(config: AxiosRequestConfig) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const platForm = Platform.OS;
  if (platForm && config.headers) {
    config.headers.platform = platForm;
  }

  // Fix stupid axios typescript
  if (accessToken && config.headers) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  console.log(
    'request sent',
    JSON.stringify({
      method: config.method,
      url: config.baseURL + '/' + config.url,
      // @ts-ignore
      UniqueDeviceId: config.headers.unique_device_id,
      data: config.data,
      params: config.params,
    }),
  );
  return config;
}

export const request = Axios.create({
  baseURL,
});

request.interceptors.request.use(
  async config => await authRequestInterceptor(config),
);
request.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // console.log('Response Error: ', error.response.data); // for debug

    // console.log('Parse Error: ', JSON.parse(JSON.stringify(error))); // for debug
    // console.log('response error', error.response); // for debug

    const errMsg = error.response.data.message;

    if (errMsg) {
      console.log({errMsg});
      // Toast.show({
      //   type: 'error',
      //   text1: errMsg,
      //   topOffset: 40,
      //   visibilityTime: 2000,
      // });
    }

    return Promise.reject(error);
  },
);
