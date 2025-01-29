import React, { useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import styles from "../styles/BasicDetails.module.css";
import axios from "axios";

export const Success = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/explore-products");
  };

  const url = window.location.href;
  const session_id = url.split("/success?")[1];
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/orders/confirm-order?${session_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="sm" className={styles.container}>
      <CheckCircleIcon className={styles.icon} />
      <Typography variant="h4" gutterBottom>
        Order Successful!
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Thank you for your purchase. Your order has been placed successfully and
        is being processed. You will receive an email confirmation shortly.
      </Typography>
      <Button
        variant="contained"
        className={styles.button}
        size="large"
        onClick={handleBackToHome}
      >
        Back to Home
      </Button>
    </Container>
  );
};
