import React, { createContext, useState, useEffect } from 'react';

export const RoomReserveContext = createContext();

const RoomReserveProvider = ({ children }) => {
  const [reserveDetails, setReserveDetails] = useState([]);

  useEffect(() => {
    const getReserveDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-room-reserves`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setReserveDetails(data.reserves);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getReserveDetails();
  }, []);

  const handleStatusChange = (reserveId, completed) => {
    setReserveDetails((item) =>
      item.map((reserve) =>
        reserve._id === reserveId ? { ...reserve, status: completed ? "Completed" : "Pending" } : reserve
      )
    );
  };

  return (
    <RoomReserveContext.Provider value={{ reserveDetails, handleStatusChange }}>
      {children}
    </RoomReserveContext.Provider>
  );
};

export default RoomReserveProvider;
