/* eslint-disable @typescript-eslint/no-unused-vars */
import Config from 'react-native-config';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FileType} from '../types/file';

const baseURL = Config.API_URL as string;

export async function uploadApi(file: FileType[] | FileType) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((el, index) => {
      const fileUpload = {
        uri: el.uri,
        name: el.name,
        type: el.type,
        size: el.size,
      };
      formData.append(`files[${index}]`, fileUpload);
    });
  } else {
    const fileUpload = {
      uri:
        Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      name: file.name,
      type: file.type,
      size: file.size,
    };
    formData.append('files[0]', fileUpload);
  }
  const res = fetch(`${baseURL}/api/users/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken} `,
    },
    body: formData,
  });
  const resJson = await (await res).json();

  return resJson;
}
