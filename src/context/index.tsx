import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import API from "../api";
import { User } from "../model";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppState = {
  username?: string;
  isAuth: boolean;
}

interface ContextData {
  state: AppState;
  initialize: () => Promise<AppState | null>;
  login: (login: string) => Promise<User | null | undefined>;
  logout: () => void;
}

const Context = createContext<ContextData | undefined>(undefined);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setAppState] = useState<AppState>({ isAuth: false });
  const api = API.getInstance();

  const initialize = async (): Promise<AppState | null> => {
    var state = await loadFromStorage();
    if (state) {
      setAppState(state);
    }
    return state;
  }

  const remoteStorage = async () => {
    await AsyncStorage?.removeItem('appState');
  }

  const saveToStorage = async (state: AppState) => {
    await AsyncStorage?.setItem('appState', JSON.stringify(state));
  }

  const loadFromStorage = async (): Promise<AppState | null> => {
    const item = await AsyncStorage?.getItem('appState');
    return item ? JSON.parse(item) : null;
  }

  const login = async (login: string) => {
    var user = await api.login(login);
    var newState = {
      username: login,
      isAuth: true
    };
    if (user) {
      setAppState(prevState => ({
        ...prevState,
        ...newState
      }));
      await saveToStorage(newState);
      return user;
    }
    return null;
  }

  const logout = async () => {
    setAppState(prevState => ({
      ...prevState,
      username: undefined,
      isAuth: false
    }));
    await remoteStorage();
  }

  return (
    <Context.Provider value={{ state, initialize, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}