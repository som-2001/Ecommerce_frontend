import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from '../styles/BasicDetails.module.css'


export const OrderError = () => {
  
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mt: 10,
        bgcolor: "#f5f5f5",
        py: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CancelIcon sx={{ fontSize: 80, color: "red", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Order Canceled
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Your order has been canceled. If this was a mistake, please retry or
        contact our support team for assistance.
      </Typography>
      <Button
        variant="contained"
        className={styles.button}
        size="large"
       
      >
        Retry Order
      </Button>
    </Container>
  );
};


