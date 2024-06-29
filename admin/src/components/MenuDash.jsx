import React, { useContext, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { CheckContext } from './CheckBoxContext';
import OrderCard from './OrderCard';
import { ToastContainer } from 'react-toastify';

const MenuDash = () => {
  const { orderDetails } = useContext(CheckContext);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const completedOrders = orderDetails.filter((order) => order.status === "Completed");
  const pendingOrders = orderDetails.filter((order) => order.status === "Pending");

  return (
    <div className='menu-dash-page'>
      <ToastContainer />
      <h1 className='dashboard-title'>Menu Orders Dashboard</h1>
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
            label="New Orders"
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              marginRight: '2rem',
              color: selectedTab === 0 ? 'rgb(255, 140, 0)' : 'black',
              '&.Mui-selected': {
                color: 'rgb(255, 140, 0)',
              },
            }}
          />
          <Tab
            label="Completed Orders"
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
          {pendingOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </Box>
      <Box hidden={selectedTab !== 1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
          {completedOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default MenuDash;
