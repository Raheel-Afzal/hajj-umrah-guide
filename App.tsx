import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigations/TabNavigator';
import * as React from 'react';
import {Map, MapDetails, Steps} from './src/screens';
import {SCREENS} from './src/constants';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.TAB_NAVIGATOR}>
        <Stack.Screen
          name={SCREENS.TAB_NAVIGATOR}
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.STEPS}
          component={Steps}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.MAP}
          component={Map}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SCREENS.MAPDETAIL}
          component={MapDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
