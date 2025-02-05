import {
    Box,
    Button,
    Typography,
    Divider,
  } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/cart.module.css'
  
  export const Amount = ({length}) => {

    const navigate=useNavigate();
    const {amount}=useSelector(state=>state.product);
    const [cartItems,setCartItems] =useState(0);
    

    useEffect(()=>{
       if(length){
        setCartItems(length)
       }
    },[]);
    
    return (
      <Box className={styles.amountParent}>
      
        <Typography
          className={styles.amountTypography}
        >
          PRICE DETAILS ({length.length} Items)
        </Typography>
        <Box sx={{ marginBottom: "16px" }}>
          <Box
            className={styles.totalMRP}
          >
            <Typography sx={{ fontSize: "14px" }}>Total MRP</Typography>
            <Typography className={styles.amountText}>
            ₹{amount}
            </Typography>
          </Box>
          <Box
            className={styles.totalMRP}
          >
            <Typography sx={{ fontSize: "14px" }}>Discount on MRP</Typography>
            <Typography
              sx={{ fontSize: "14px", fontWeight: "600", color: "#4caf50" }}
            >
              ₹0
            </Typography>
          </Box>
          
          <Box
           className={styles.totalMRP}
          >
            <Typography
              sx={{ fontSize: "14px", cursor: "pointer", color: "#ff4081" }}
            >
              Platform Fee
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
            ₹0
            </Typography>
          </Box>
          <Box
          className={styles.totalMRP}
          >
            <Typography
              sx={{ fontSize: "14px", cursor: "pointer", color: "#ff4081" }}
            >
              Shipping Fee
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#4caf50",
              }}
            >
              FREE
            </Typography>
          </Box>
        </Box>
  
        <Divider sx={{ marginBottom: "16px" }} />
  
        {/* Total Amount */}
        <Box
          className={styles.totalMRP}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Total Amount
          </Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
          ₹{amount}
          </Typography>
        </Box>
  
        {/* Place Order Button */}
        <Button
          variant="contained"
          fullWidth
          disabled={amount===0}
          className={styles.placeOrder}
          onClick={(e)=>navigate(`/payment/bike-order-cart`)}
        >
          Place Order
        </Button>
      </Box>
    );
  };
  