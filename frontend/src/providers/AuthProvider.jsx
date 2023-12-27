import React, { useState, useMemo } from 'react';
import { AuthContext } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(!!data);

  const logIn = (response) => {
    localStorage.setItem('userId', JSON.stringify(response.data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({
      loggedIn,
      logIn,
      logOut,
      data,
    }), [loggedIn, data])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
