import React, { useContext, useState } from 'react';
import OrderCard from './OrderCard';
import { Tabs, Tab, Box } from '@mui/material';
import { CheckContext } from './CheckBoxContext';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const MenuDash = () => {
  const { orders} = useContext(CheckContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [orderDetails, setOrderDetails] = useState({});

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  //get order details
  const getOrderDetails = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-all-menu-orders`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      if(data.success){
        setOrderDetails(data.orders);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getOrderDetails();
  },[]);

  const completedOrder = orders.filter((item) => item.completed);
  const toBeCompletedOrder = orders.filter((item) => !item.completed);

  return (
      <div className='menu-dash-page'>
        <ToastContainer/>
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
            {toBeCompletedOrder.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </Box>
        <Box hidden={selectedTab !== 1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {completedOrder.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </Box>
      </div>
  );
}

export default MenuDash;
