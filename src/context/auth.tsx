import React from "react";
import { LoginCredentials, User } from "../react-app-env";
import { AuthService } from '../services';

type AuthContextType = {
  user: User | null,
  token: string | null,
  loading: boolean,
  login: (values: LoginCredentials) => Promise<void>,
  logout: () => Promise<void>,
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  logout: async () => {}
});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  
  const login = async (values: LoginCredentials) => {
    setLoading(true);
    try {
      const data = await AuthService.login(values);
      console.log(data);
      setUser(data.user);
      setToken(data.token);
      AuthService.setRefreshTimeout(data, (error: any, refreshData: any) => {
        if (error) {
          setUser(null);
          setToken(null);
          return;
        }
        setUser(refreshData.user);
        setToken(refreshData.token);
      });
    } catch (error) {
      setUser(null);
      setToken(null);
      throw new Error('usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    await AuthService.logout();
    setLoading(false);
  }

  React.useEffect(() => {
    const checkRefresh = async () => {
      setLoading(true);
      try {
        const data = await AuthService.refresh();
        setToken(data.token);
        setUser(data.user);
        AuthService.setRefreshTimeout(data, (error: any, refreshData: any) => {
          if (error) {
            setUser(null);
            setToken(null);
            return;
          }
          setUser(refreshData.user);
          setToken(refreshData.token);
        });
      } catch (error) {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    checkRefresh();
  }, []);

  return(
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};