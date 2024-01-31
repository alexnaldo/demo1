import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useAppContext } from '../../context';
import { Routes } from '../routes';
import API from '../../api';
import { User } from '../../model';

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

function Home({ navigation }: { navigation: any }): React.JSX.Element {
  const context = useAppContext();
  const api = API.getInstance();
  const [users, setUsers] = useState<User[]>([]);

  const handlerLogout = () => {
    context.logout();
    navigation.replace(Routes.LOGIN, { isLogoutByUser: true });
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.getUsers();
      setUsers(users);
    }
    fetchUsers();
  })

  return <>
    <Section title="Informações do usuário">
      Você está logado como <Text style={styles.highlight}>{context.state.username}</Text>
    </Section>
    <Button title='Logout' onPress={handlerLogout} />
    <Section title="Lista de usuários" />
    <ScrollView>
      {users.map((user, index) => {
        return <Text key={index}>{user.name} - {user.email}</Text>
      })}
    </ScrollView>
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
