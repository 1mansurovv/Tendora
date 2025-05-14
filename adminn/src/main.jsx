import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 🔥 MUHIM QISM
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 🔄 App ni router bilan o‘rayapmiz */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
