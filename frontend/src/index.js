import { createRoot } from 'react-dom/client';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import init from './init.jsx';

const socket = io();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(init(socket));
