import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CheckListIcon, MakkahIcon, MapIcon } from '../../src/components';
import { COLORS, SCREENS } from '../../src/constants';
import { CheckList, Map, TypeSelection } from '../../src/screens';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
      initialRouteName={SCREENS.TYPE_SELECTION}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name={SCREENS.CHECKLIST}
          component={CheckList}
          options={{
            tabBarIcon: CheckListIcon,
          }}
        />
        <Tab.Screen
          name={SCREENS.TYPE_SELECTION}
          component={TypeSelection}
          options={{
            tabBarIcon: MakkahIcon,
          }}
        />
        <Tab.Screen
          name={SCREENS.MAP}
          component={Map}
          options={{
            tabBarIcon: MapIcon,
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 3,
    borderColor: 'transparent',
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 60,
  },
});
