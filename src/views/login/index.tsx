import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAppContext } from '../../context';
import { Routes } from '../routes';

function Login({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
  const context = useAppContext();
  const [username, setUsername] = useState<string | undefined>(undefined);


  const handleLogin = () => {
    if (username) {
      context.login(username);
      navigation.replace(Routes.HOME);
    }
  }

  return <>
    <View>
      <Image source={require('../../../assets/icons/login.png')} />
      <Text>Login</Text>
      <TextInput style={styles.inputText} placeholder='Digite seu nome' onChangeText={setUsername} value={username} />
      <Button title='Login' onPress={handleLogin} />
      <Text>Last logout {route.params?.isLogoutByUser ? 'by User' : 'by App'}</Text>
    </View>
  </>
}

const styles = StyleSheet.create({
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  }
});

export { Login };
