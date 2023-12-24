import { createRoot } from 'react-dom/client';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import init from './init.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(init());
