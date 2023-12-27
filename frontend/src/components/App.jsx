import { ToastContainer } from 'react-toastify';
import React, { useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

import ErrorPage from './ErrorPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import SignupPage from './SignupPage.jsx';
import { AuthContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import 'react-toastify/dist/ReactToastify.css';

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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('app.signOut')}</Button>
      : null
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <AuthProvider>
      <Router>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Navbar expand="lg" bg="light" className="shadow-sm">
              <Container className="container">
                <Link className="navbar-brand" to={routes.chatPage()}>{t('app.chat')}</Link>
                <AuthButton />
              </Container>
            </Navbar>
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
              )}
              />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
