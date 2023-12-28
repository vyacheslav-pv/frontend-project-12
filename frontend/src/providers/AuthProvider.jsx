import React, { useState } from 'react';
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
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      data,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
