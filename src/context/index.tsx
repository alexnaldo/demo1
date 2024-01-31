import { PropsWithChildren, createContext, useContext, useState } from "react";


type AppState = {
  username?: string;
  isAuth: boolean;
}

interface ContextData {
  state: AppState;
  login: (login: string) => void;
  logout: () => void;
}

const Context = createContext<ContextData | undefined>(undefined);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setAppState] = useState<AppState>({ isAuth: false });

  const login = (login: string) => {
    setAppState(prevState => ({
      ...prevState,
      username: login,
      isAuth: true
    }));
  }

  const logout = () => {
    setAppState(prevState => ({
      ...prevState,
      username: undefined,
      isAuth: false
    }));
  }

  return (
    <Context.Provider value={{ state, login, logout }}>
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