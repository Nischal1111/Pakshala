import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckProvider from './components/CheckBoxContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <CheckProvider>
    <App />
  </CheckProvider>
  </React.StrictMode>
  </BrowserRouter>
);
