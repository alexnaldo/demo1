import React from 'react';
import {
} from 'react-native';
import { Provider } from './src/context';
import { Home } from './src/views/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/views/login';
import { Routes } from './src/views/routes';
import AddUser from './src/views/user';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.LOGIN}>
          <Stack.Screen name={Routes.LOGIN} component={Login} options={{ headerShown: false }} />
          <Stack.Screen name={Routes.HOME} component={Home} options={{ title: 'POC de Conceitos React-Native' }} />
          <Stack.Screen name={Routes.ADD_USER} component={AddUser} options={{ title: 'Adicionar Usuário' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
