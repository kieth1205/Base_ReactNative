import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Portal} from 'react-native-paper';
import {navigationRef} from './RootNavigation';
import {RootStackParamList} from './RootStackParamList';
import NoAuthStack from './NoAuthStack/NoAuthStack';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {useAppSelector} from 'store/hookStore';
import TutorialStackScreen from './TutorialStack/index';

const RootStack = createStackNavigator<RootStackParamList>();
function Navigation() {
  const {user} = useAppSelector(state => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      <Portal.Host>
        <RootStack.Navigator
          screenOptions={{headerShown: false, presentation: 'card'}}>
          <Fragment>
            {!user ? (
              <RootStack.Screen name="NoAuthStack" component={NoAuthStack} />
            ) : (
              <>
                {user?.register_completed ? (
                  <RootStack.Screen
                    name="TutorialStack"
                    component={TutorialStackScreen}
                  />
                ) : (
                  <RootStack.Screen name="BottomTabs" component={BottomTabs} />
                )}
              </>
            )}
          </Fragment>
        </RootStack.Navigator>
      </Portal.Host>
    </NavigationContainer>
  );
}

export default Navigation;
