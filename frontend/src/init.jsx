import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbalProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import store from './slices/index.js';

import { SocketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import {
  setCurrentChannelId,
  addChannel,
  renameChannel,
  removeChannel,
} from './slices/channelsSlice';
import resources from './locales/index.js';

console.log(process.env.REACT_APP_ROLLBAR_TOKEN);

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
};

function TestError() {
  const a = null;
  return a.hello();
}

const socket = io();

const defaultChannelId = 1;

const init = () => {
  const defaultLang = 'ru';
  const instance = i18next.createInstance();
  instance
    .use(initReactI18next)
    .init({
      lng: defaultLang,
      debug: false,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  socket.on('newMessage', (newMessage) => {
    store.dispatch(addMessage(newMessage));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data.id));
    const { channels: { currentChannelId } } = store.getState();
    if (currentChannelId === data.id) {
      store.dispatch(setCurrentChannelId(defaultChannelId));
    }
  });

  const SocketProvider = ({ children }) => {
    const sendData = (...args) => new Promise((resolve, reject) => {
      socket.timeout(3000).emit(...args, (error, response) => {
        if (response?.status === 'ok') {
          resolve(response);
        }
        reject(error);
      });
    });

    const socketApi = {
      sendMessage: (message) => sendData('newMessage', message),
      addChannel: (channel) => sendData('newChannel', channel),
      renameChannel: (channel) => sendData('renameChannel', channel),
      removeChannel: (channel) => sendData('removeChannel', channel),
    };

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <SocketContext.Provider value={{ socketApi }}>
        {children}
      </SocketContext.Provider>
    );
  };

  return (
    <RollbalProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <Provider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbalProvider>
  );
};

export default init;
