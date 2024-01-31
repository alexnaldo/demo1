import React, { useEffect, useState } from 'react';
import {
  AppState,
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
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    if (username) {
      var user = await context.login(username);
      if (user) {
        navigation.replace(Routes.HOME);
      } else {
        setError('Usuário não encontrado');
      }
    }
  }

  useEffect(() => {
    context.initialize().then((state) => {
      if (state?.isAuth) {
        navigation.replace(Routes.HOME);
      }
    });
  }, [])

  return <>
    <View>
      <Image source={require('../../../assets/icons/login.png')} />
      <Text>Login</Text>
      <TextInput style={styles.inputText} placeholder='Digite seu nome' onChangeText={setUsername} value={username} />
      <Text style={styles.errorMessage}>{error}</Text>
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
  },
  errorMessage: {
    color: 'red'
  }
});

export { Login };
