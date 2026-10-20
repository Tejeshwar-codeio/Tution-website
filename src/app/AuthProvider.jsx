import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../lib/api';

const AuthContext = createContext();

const normalizeUser = (u) => (u ? { ...u, id: u.id || u._id } : u);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('scoremax_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { user: u } = await authApi.me();
      setUser(normalizeUser(u));
    } catch {
      localStorage.removeItem('scoremax_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const { token, user: u } = await authApi.login({ email, password });
    localStorage.setItem('scoremax_token', token);
    const normalized = normalizeUser(u);
    setUser(normalized);
    return normalized;
  };

  const register = async (data) => {
    const { token, user: u } = await authApi.register(data);
    localStorage.setItem('scoremax_token', token);
    const normalized = normalizeUser(u);
    setUser(normalized);
    return normalized;
  };

  const logout = () => {
    localStorage.removeItem('scoremax_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
