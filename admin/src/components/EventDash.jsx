import React, { useContext,useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { EventContext } from './EventContext';
import EventCard from './EventCard';
import { ToastContainer } from 'react-toastify';

const EventDash = () => {
  const { eventBookings } = useContext(EventContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const completedBookings = eventBookings.filter((booking) => booking.status === "Completed");
  const pendingBookings = eventBookings.filter((booking) => booking.status === "Pending");

  return (
    <div className='menu-dash-page'>
      <ToastContainer />
      <h1 className='dashboard-title'>Event Booking Dashboard</h1>
      <div className='tabs-order'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(255, 140, 0)'
            }
          }}
        >
          <Tab
            label="New Bookings"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              marginRight: '1rem',
              color: selectedTab === 0 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
          <Tab
            label="Completed Bookings"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              color: selectedTab === 1 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
        </Tabs>
      </div>
      <Box hidden={selectedTab !== 0}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {pendingBookings.map((booking) => (
            <EventCard key={booking._id} booking={booking} />
          ))}
        </div>
      </Box>
      <Box hidden={selectedTab !== 1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {completedBookings.map((booking) => (
            <EventCard key={booking._id} booking={booking} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default EventDash;
