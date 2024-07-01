import React, { useContext,useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { TableReserveContext } from './TableContext'; 
import TableReserveCard from './TableReserveCard';
import { ToastContainer } from 'react-toastify';

const TableReserveDash = () => {
  const { tableReservations } = useContext(TableReserveContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const completedReservations = tableReservations.filter((reservation) => reservation.status === "Completed");
  const pendingReservations = tableReservations.filter((reservation) => reservation.status === "Pending");

  return (
    <div className='menu-dash-page'>
      <ToastContainer />
      <h1 className='dashboard-title'>Table Reserve Dashboard</h1>
      <div className='tabs-order'>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'rgb(255, 140, 0)',
            }
          }}
        >
          <Tab
            label="New Reservations"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              color: selectedTab === 0 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
          <Tab
            label="Completed Reservations"
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
          {pendingReservations.map((reservation) => (
            <TableReserveCard key={reservation._id} reservation={reservation} />
          ))}
        </div>
      </Box>
      <Box hidden={selectedTab !== 1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {completedReservations.map((reservation) => (
            <TableReserveCard key={reservation._id} reservation={reservation} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default TableReserveDash;
