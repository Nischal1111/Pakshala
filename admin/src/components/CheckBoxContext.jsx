import React, { createContext, useState } from 'react';

export const CheckContext = createContext();

const CheckProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: '1',
      name: 'Nischal Dai',
      email: 'neupane@example.com',
      contact: '123-456-7890',
      message: 'Momo hai piro momo please dhwerai chaiyo, chowmein pani chaiyo',
      completed: false,
    },
    {
      id: '2',
      name: 'Dai Nischal',
      email: 'nischal@example.com',
      contact: '098-765-4321',
      message: 'Burger, Chowmin and Katti Roll please Nischal Dai le vannu vako',
      completed: true,
    },
  ]);

  const handleStatusChange = (orderId, completed) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, completed } : order
      )
    );
  };

  const handleCheckboxChange = (orderId, completed) => {
    handleStatusChange(orderId, completed);
  };

  return (
    <CheckContext.Provider value={{ orders, handleCheckboxChange }}>
      {children}
    </CheckContext.Provider>
  );
};

export default CheckProvider;
