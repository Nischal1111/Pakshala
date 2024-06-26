import React, { createContext, useState, useEffect } from 'react';

export const TableReserveContext = createContext();

const TableReserveProvider = ({ children }) => {
  const [tableReservations, setTableReservations] = useState([]);

  useEffect(() => {
    const fetchTableReservations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-table-reserves`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setTableReservations(data.reserves);
        }
      } catch (error) {
        console.error('Error fetching table reservations:', error);
      }
    };

    fetchTableReservations();
  }, []);

  const handleStatusChange = (reservationId, completed) => {

    setTableReservations((reservations) =>
      reservations.map((reservation) =>
        reservation._id === reservationId ? { ...reservation, status: completed ? "Completed" : "Pending" } : reservation
      )
    );

  };

  const handleDeleteReservation = async (reservationId) => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-table-reservation/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setTableReservations((reservations) =>
          reservations.filter((reservation) => reservation._id !== reservationId)
        );
      } else {
        console.error('Failed to delete reservation:', data.error);
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };
  const contextValue = {
    tableReservations,
    handleStatusChange,
    handleDeleteReservation,
  };

  return (
    <TableReserveContext.Provider value={contextValue}>
      {children}
    </TableReserveContext.Provider>
  );
};

export default TableReserveProvider;
