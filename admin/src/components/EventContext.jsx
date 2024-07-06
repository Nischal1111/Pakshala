import React, { createContext, useState, useEffect } from 'react';


export const EventContext = createContext();


const EventBookingProvider = ({ children }) => {
  const [eventBookings, setEventBookings] = useState([]);


  useEffect(() => {
    const fetchEventBookings = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-event-venues`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setEventBookings(data.books);
        }
      } catch (error) {
        console.error('Error fetching event bookings:', error);
      }
    };

    fetchEventBookings();
  }, []);


  const handleStatusChange = async(bookingId) => {
     try{
      const response = fetch(`${process.env.REACT_APP_API_URL}/accept-event-booking/${bookingId}`, {
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({bookingId})
      })
      const data=await response.json()
      console.log(data)
      if(data.success){
         setEventBookings((bookings) =>
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: "Completed" } : booking
      )
    );
      }else{
        console.log("Error")
      }
    }catch(err){
      console.log(err);
    }
  };


  const handleDeleteBooking = async (bookingId) => {
    try {


      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-event-booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {

        setEventBookings((bookings) =>
          bookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        console.error('Failed to delete booking:', data.error);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  const contextValue = {
    eventBookings,
    handleStatusChange,
    handleDeleteBooking,
  };


  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventBookingProvider;
