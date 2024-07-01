import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CheckProvider from './components/CheckBoxContext';
import RoomReserveProvider from './components/RoomReserveContext';
import TableReserveProvider from './components/TableContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <TableReserveProvider>
  <RoomReserveProvider>
  <CheckProvider>
    <App />
  </CheckProvider>
  </RoomReserveProvider>
    </TableReserveProvider>
  </React.StrictMode>
  </BrowserRouter>
);
