import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TABS_KEY} from '../preset';
import {MainBottomTabParamList} from './MainBottomTabParams';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

type tabBarIconProps = {
  size: number;
  focused: boolean;
};

export default function BottomTabs() {
  const tabs = [
    {
      name: TABS_KEY.FIRST_TAB,
      component: FirstStack,
      options: {
        tabBarIcon: ({size, focused}: tabBarIconProps) =>
          focused ? (
            <HomeSvg width={size} height={size} />
          ) : (
            <HomeSvg width={size} height={size} />
          ),
        headerShown: false,
      },
    },

    {
      name: TABS_KEY.SECOND_TAB,
      component: SecondStack,
      options: {
        tabBarIcon: ({size, focused}: tabBarIconProps) =>
          focused ? (
            <ChatSvg width={size} height={size} />
          ) : (
            <ChatSvg width={size} height={size} />
          ),
        headerShown: false,
      },
    },

    {
      name: TABS_KEY.THIRD_TAB,
      component: ThirdStack,
      options: {
        tabBarIcon: ({size, focused}: tabBarIconProps) =>
          focused ? (
            <DiarySvg width={size} height={size} />
          ) : (
            <DiarySvg width={size} height={size} />
          ),
        headerShown: false,
      },
    },
    {
      name: TABS_KEY.FOURTH_TAB,
      component: FourthStack,
      options: {
        tabBarIcon: ({size, focused}: tabBarIconProps) =>
          focused ? (
            <UserSvg width={size} height={size} />
          ) : (
            <UserSvg width={size} height={size} />
          ),
        headerShown: false,
      },
    },
    {
      name: TABS_KEY.FIFTH_TAB,
      component: FifthStack,
      options: {
        tabBarIcon: ({size, focused}: tabBarIconProps) =>
          focused ? (
            <UserSvg width={size} height={size} />
          ) : (
            <UserSvg width={size} height={size} />
          ),
        headerShown: false,
      },
    },
  ];

  return (
    <Tab.Navigator
      tabBar={props => <TabBarComponent {...props} />}
      initialRouteName={TABS_KEY.TAB_HOME}
      screenOptions={{
        tabBarShowLabel: true,

        tabBarStyle: {
          paddingTop: 5,
          borderTopWidth: 0,
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.1,
          shadowColor: '#000',
          elevation: 4,
          position: 'absolute',
        },
      }}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
}
