import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckProvider from './components/CheckBoxContext';
import RoomReserveProvider from './components/RoomReserveContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <RoomReserveProvider>
  <CheckProvider>
    <App />
  </CheckProvider>
  </RoomReserveProvider>
  </React.StrictMode>
  </BrowserRouter>
);
