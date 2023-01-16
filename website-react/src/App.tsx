import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import './styles/global.css';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
