import React from 'react';
import {
} from 'react-native';
import { Provider } from './src/context';
import { Home } from './src/views/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/views/login';
import { Routes } from './src/views/routes';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.LOGIN}>
          <Stack.Screen name={Routes.LOGIN} component={Login} />
          <Stack.Screen name={Routes.HOME} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
