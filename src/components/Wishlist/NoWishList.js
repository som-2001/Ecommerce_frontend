import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/WishList.module.css";

export const NoWishList = () => {
  const navigate = useNavigate();
  return (
    <Box className={styles.Wrapper}>
      {/* Illustration */}
      <Box
        component="img"
        src="../../images/no_wishList.png" // Replace with the illustration's actual path
        alt="Empty Wishlist Illustration"
        sx={{ width: "200px", marginBottom: "24px" }}
      />

      {/* Main Heading */}
      <Typography variant="h4" className={styles.font}>
        Your Wishlist is empty!
      </Typography>

      {/* Subheading */}
      <Typography
        variant="body1"
        sx={{
          color: "#757575",
          marginBottom: "24px",
        }}
      >
        Seems like you don’t have wishes here.
        <br />
        Make a wish!
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          borderRadius: 2,
          padding: 2.2,
        }}
        className={styles.btn}
        onClick={(e) => navigate("/explore-products")}
      >
        Start Shopping
      </Button>
    </Box>
  );
};
