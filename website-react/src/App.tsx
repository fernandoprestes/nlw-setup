import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import './styles/global.css';
import './lib/dayjs';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
