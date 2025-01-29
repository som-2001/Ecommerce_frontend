import React from "react";
import { Container, Typography, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "../styles/BasicDetails.module.css";
import { useNavigate } from "react-router-dom";

export const OrderError = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" className={styles.error}>
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
        onClick={(e) => navigate(-1)}
      >
        Retry Order
      </Button>
    </Container>
  );
};
