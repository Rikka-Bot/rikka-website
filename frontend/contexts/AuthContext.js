import { useState, createContext, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();
const fetchAuthUser = async () => {
  const res = await fetch('/api/auth/user', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Auth request failed with status ${res.status}`);
  const data = await res.json();
  return data.authenticated ? data.user : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      setUser(await fetchAuthUser());
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchAuthUser()
      .then((authUser) => {
        if (active) {
          setUser(authUser);
        }
      })
      .catch((error) => {
        console.error('Auth check failed:', error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
