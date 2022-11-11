import React, {useEffect, useRef, Fragment} from 'react';
//@ts-ignore
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import * as storage from 'common/storage';
import {getRoute} from 'navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {NOTIFY} from './constant';
import {SCREENS_KEY} from '../navigation/preset';
import {
  createDefaultChannels,
  localNotify,
  onNotificationOpened,
} from './PushNotificationHandler';
import {setNewMessage} from 'store/slices/messageSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NotifyService = () => {
  const lastId = useRef(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // storage.setUniqueDeviceId(getUniqueId());
    //---Get FCM Token----------------------------------------------------------------------------------TODO:FCM TOKEN
    messaging()
      .getToken()
      .then(async token => {
        const batch = firestore().batch();
        batch.set(firestore().doc(`deviceTokens/${auth().currentUser.uid}`), {
          fcmToken: token,
        });
        batch.commit();
        await storage.setFcmTokenDevice(token);
      });

    return messaging().onTokenRefresh(async token => {
      await storage.setFcmTokenDevice(token);
    });
  }, []);

  useEffect(() => {
    createDefaultChannels();

    // Check whether an initial notification is available-----------------------------------------------TODO:INITIAL
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );

          const {
            notification: {title, body},
            data,
          } = remoteMessage;

          data.title = title;
          data.message = body;

          onNotificationOpened(data);
        }
      });

    // Clear badge number at start----------------------------------------------------------------------
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }, []);

  //---handle foreground messaging--------------------------------------------------------------------------TODO:FOREGROUND

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const {
        notification: {title, body},
        data,
      } = remoteMessage;

      data.title = title;
      data.message = body;

      const route = getRoute();
      const {name: routeName} = route;

      const formatData = data;

      //handle give message------------------------------------------------------------------
      switch (formatData?.key) {
        case NOTIFY.MESSAGE:
          if (routeName === SCREENS_KEY.MESSAGE.INDEX) {
            // localNotify({lastId, title, body, data});
            dispatch(setNewMessage(formatData));
          } else {
            localNotify({lastId, title, body, data});
            dispatch(setNewMessage(formatData));
          }
          break;

        default:
          localNotify({lastId, title, body, data});
          break;
      }
    });

    return unsubscribe;
  }, [dispatch]);

  //-------------------------------------------------------------------------------------------------------
  return <Fragment />;
};

export default NotifyService;
