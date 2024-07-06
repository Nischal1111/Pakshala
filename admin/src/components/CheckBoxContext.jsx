import React, { createContext, useState, useEffect } from 'react';

export const CheckContext = createContext();

const CheckProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-menu-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setOrderDetails(data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrderDetails();
  }, []);

 const handleStatusChange = async (orderId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/accept-order-menu`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ orderId }),
    });

    const data = await response.json();

    if (data.success) {
      setOrderDetails((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Completed" } : order
        )
      );
    } else {
      console.error('API error:', data.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};



  return (
    <CheckContext.Provider value={{ orderDetails, handleStatusChange }}>
      {children}
    </CheckContext.Provider>
  );
};

export default CheckProvider;
