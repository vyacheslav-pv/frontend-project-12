import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as RollbalProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './slices/index.js';
import { addMessage } from './slices/messagesSlice.js';
import {
  setCurrentChannelId,
  addChannel,
  renameChannel,
  removeChannel,
} from './slices/channelsSlice';
import resources from './locales/index.js';
import ApiProvider from './providers/ApiProvider.jsx';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const defaultChannelId = 1;

const init = async () => {
  filter.addDictionary('en-ru', [...filter.getDictionary('ru'), ...filter.getDictionary('en')]);

  const socket = io();

  const defaultLang = 'ru';
  const instance = i18next.createInstance();
  await instance
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

  return (
    <RollbalProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiProvider>
            <App />
          </ApiProvider>
        </Provider>
      </ErrorBoundary>
    </RollbalProvider>
  );
};

export default init;
