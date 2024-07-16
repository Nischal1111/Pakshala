import React, { createContext, useState, useEffect } from 'react';
import {delnotify} from "./delnotify"

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

  const handleStatusChange = async(reservationId) => {
    try{
      const response = fetch(`${process.env.REACT_APP_API_URL}/accept-table-reservation/${reservationId}`, {
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({reservationId})
      })
      const data=await response.json()
      if(data.success){
        setTableReservations((reservations) =>
      reservations.map((reservation) =>
        reservation._id === reservationId ? { ...reservation, status: "Completed" } : reservation
      )
    );
      }else{
        console.log("Error")
      }



    }catch(err){
      console.log(err);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/reject-table-reservation/${reservationId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        delnotify()
       setTableReservations((prevDetails) =>
      prevDetails.map((reservation) =>
        reservation._id === reservationId ? { ...reservation, status: "Rejected" } : reservation
      )
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
