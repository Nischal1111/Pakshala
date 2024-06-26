import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { CheckContext } from './CheckBoxContext';
import { Marknotify } from './Notify';

const OrderCard = ({ order }) => {
  const { handleCheckboxChange } = useContext(CheckContext);
  const [completed, setCompleted] = useState(order.completed);

  const handleChange = () => {
    setCompleted(!completed);
    handleCheckboxChange(order.id, !completed);
    Marknotify()
  };

  return (
    <div style={{ width: "30%" }}>
      <Card
        style={{ marginBottom: '16px' }}
        sx={{
          marginLeft: "1rem",
          textAlign: "center",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgb(254, 250, 250)",
          boxShadow: "5px 8px rgba(255, 176, 79,0.3)",
          height: "auto",
          color: "white"
        }}
      >
        <CardContent sx={{ color: "black" }}>
          <Typography sx={{ fontSize: "1rem", letterSpacing: "1.5px", marginBottom: ".5rem" }}>Order Id: {order.id}</Typography>
          <hr className='order-line' />
          <div style={{ display: "flex", gap: "1rem", flexDirection: "column", width: "100%" }}>
            <Typography variant="subtitle1"
              sx={{
                backgroundColor: "rgb(255, 176, 79,.3)"
                , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".5rem"
              }}>{order.name}</Typography>
            <Typography variant="subtitle1" sx={{
              backgroundColor: "rgba(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".2rem"
            }}>{order.email}</Typography>
            <Typography variant="subtitle1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".2rem"
            }}>{order.contact}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem", marginTop: ".5rem"
            }}>{order.message}</Typography>
            <FormControlLabel
              control={<Checkbox checked={completed} onChange={handleChange} />}
              label="Completed"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderCard;
