import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_KEY} from 'navigation/preset';
import {FifthStackParams} from './FifthStackParam';
import ChatIndex from 'screens/ChatScreen';

const chatScreens = [
  {
    name: SCREENS_KEY.CHAT.INDEX,
    component: ChatIndex,
    auth: false,
    options: {headerShown: false},
  },
];

const FifthStack = createStackNavigator<FifthStackParams>();

export default function Home() {
  return (
    <FifthStack.Navigator>
      {chatScreens.map(child => (
        <FifthStack.Screen
          key={child.name}
          name={child.name}
          component={child.component}
          options={child.options}
        />
      ))}
    </FifthStack.Navigator>
  );
}
