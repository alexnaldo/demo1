import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useAppContext, Provider } from '../../context';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={{ fontFamily: 'PTSansCaptionRegular' }}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Home(): React.JSX.Element {
  const context = useAppContext();
  const [username, setUsername] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    if (username) {
      context.login(username);
    }
  }

  return <>
    <Provider>
      <Section title="Informações do usuário">
        Usuário <Text style={styles.highlight}>{context.state.username}</Text>
      </Section>
      <Image source={require('../../../assets/icons/login.png')} />
      <TextInput style={styles.inputText} placeholder='Digite seu nome' onChangeText={setUsername} value={username} />
      <Button title='Login' onPress={handleLogin} />
      <Button title='Logout' onPress={context.logout} />
    </Provider>
  </>
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  }
});

export { Home };
