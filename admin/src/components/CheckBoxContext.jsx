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

  const handleStatusChange = async (orderId, completed) => {
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/update-order-status/${orderId}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify({ status: completed ? "Completed" : "Pending" }),
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     setOrderDetails((prevOrders) =>
    //       prevOrders.map((order) =>
    //         order._id === orderId ? { ...order, status: completed ? "Completed" : "Pending" } : order
    //       )
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <CheckContext.Provider value={{ orderDetails, handleStatusChange }}>
      {children}
    </CheckContext.Provider>
  );
};

export default CheckProvider;
