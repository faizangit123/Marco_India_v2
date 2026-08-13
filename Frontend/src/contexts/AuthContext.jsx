import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext(null);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Load Google Identity Services script
let gsiLoaded = false;
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (gsiLoaded || window.google?.accounts) {
      gsiLoaded = true;
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      gsiLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Google Sign-In'));
    document.head.appendChild(script);
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await apiClient.get('/api/auth/me/');
      setUser(data);
    } catch {
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    const { data } = await apiClient.post('/api/auth/login/', { email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    await fetchUser();
    return data;
  };

  const signup = async (payload) => {
    const { data } = await apiClient.post('/api/auth/register/', payload);
    if (data.access) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      await fetchUser();
    }
    return data;
  };

  const loginWithGoogle = async () => {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error('Google OAuth is not configured. Set VITE_GOOGLE_CLIENT_ID in your .env file.');
    }

    await loadGoogleScript();

    return new Promise((resolve, reject) => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const { data } = await apiClient.post('/api/auth/google/', {
              credential: response.credential,
            });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            await fetchUser();
            resolve(data);
          } catch (err) {
            reject(new Error(err.response?.data?.detail || 'Google login failed.'));
          }
        },
      });

      // Trigger the One Tap / popup flow
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: use the button-based popup
          const buttonDiv = document.createElement('div');
          buttonDiv.style.display = 'none';
          document.body.appendChild(buttonDiv);

          window.google.accounts.id.renderButton(buttonDiv, {
            type: 'standard',
            size: 'large',
          });

          // Click the hidden button to trigger popup
          const btn = buttonDiv.querySelector('div[role="button"]');
          if (btn) {
            btn.click();
          } else {
            document.body.removeChild(buttonDiv);
            reject(new Error('Google Sign-In popup could not be displayed. Please allow popups.'));
          }

          // Clean up after a delay
          setTimeout(() => {
            if (document.body.contains(buttonDiv)) {
              document.body.removeChild(buttonDiv);
            }
          }, 60000);
        }
      });
    });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    // Blacklist refresh token on the backend
    if (refreshToken) {
      try {
        await apiClient.post('/api/auth/logout/', { refresh: refreshToken });
      } catch {
        // Silent — clear locally regardless
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    // Revoke Google session if available
    if (window.google?.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const updateProfile = async (payload) => {
    const { data } = await apiClient.put('/api/auth/me/', payload);
    setUser(data);
    return data;
  };

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await apiClient.put('/api/auth/me/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setUser(data);
    return data;
  };

  const changePassword = async (oldPassword, newPassword) => {
    await apiClient.post('/api/auth/change-password/', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.is_staff === true || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateProfile,
        updateAvatar,
        changePassword,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
