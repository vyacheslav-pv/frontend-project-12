import { io } from 'socket.io-client';
import { SocketContext } from '../contexts/index.jsx';

const socket = io();

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

export default SocketProvider;
