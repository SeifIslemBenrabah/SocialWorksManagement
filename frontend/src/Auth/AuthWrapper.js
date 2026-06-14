import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RenderRoutes from '../Componenets/Structure/RenderRoutes';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthData must be used within an AuthWrapper');
  }
  return context;
};

const emptyUser = { email: '', fullName: '', isAuth: false, token: null, roletype: null, roleName: null, id: null };

const AuthWrapper = () => {
  const navigate = useNavigate();

  const [User, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : emptyUser;
    } catch {
      return emptyUser;
    }
  });

  useEffect(() => {
    if (User.isAuth && User.roletype) {
      localStorage.setItem('user', JSON.stringify(User));
      navigate(`/${User.roletype}`);
    } else {
      localStorage.removeItem('user');
    }
  // navigate intentionally omitted — adding it causes redirect loops on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User.isAuth, User.roletype]);

  const login = async (email, password) => {
    if (!email || !password) return;

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (data && data.accessToken) {
      setUser({
        email: data.user?.email || email,
        fullName: data.user?.fullName || '',
        isAuth: true,
        token: data.accessToken,
        roletype: data.roletype || '',
        roleName: data.roleName || '',
        id: data.user?.id || null,
      });
    }
  };

  const logout = () => {
    setUser(emptyUser);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
