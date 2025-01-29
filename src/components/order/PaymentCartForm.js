import {
  Box,
  Typography,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import styles from "../../styles/Order.module.css";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripe = await stripePromise;

export const PaymentCartForm = () => {
  const { address, shippingDate, cartProducts, amount } = useSelector(
    (state) => state.product
  );
  const navigate=useNavigate();
  const [selectedItem, setSelectedItem] = useState("");
  const [Tax, setTax] = useState(Math.floor(Math.random() * 20));

  const StripePayment = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/orders/order`,
      {
        shippingAddress: address.address,
        userId: jwtDecode(Cookies.get("accessToken")).id,
        products: cartProducts,
        orderMode: selectedItem === "COD" ? "COD" : "Prepaid",
        shipmentDetails: shippingDate,
        Tax: Tax,
      },
      {
        withCredentials: true,
      }
    );
    if (response?.data?.message === "Order confirmed successfully.") {
      navigate("/success");
    } 
    const session = response.data?.checkoutSessionId;
    const result = await stripe.redirectToCheckout({ sessionId: session });

    if (result.error) {
      console.error(result.error.message);
    }
  };
  const handlePaytmentMethodFunction = (method) => {
    setSelectedItem(method);
  };
  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4, md: 6 },
        width: { xs: "88vw", md: "70vw" },
        margin: "0 auto",
      }}
    >
      <Grid container spacing={4}>
        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Summary
          </Typography>

          {cartProducts?.map((product, index) => (
            <Grid
              container
              alignItems="center"
              className={styles.PaymentCartFormMap}
            >
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  image={product?.product?.image?.[0]}
                  sx={{
                    width: { xs: "70px", sm: "120px" },
                    height: "80px",
                    borderRadius: 1,
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1" fontWeight="bold">
                    {product?.product?.productName} ({product?.product?.brand})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.product?.description?.length > 40
                      ? product?.product?.description.slice(0, 40)
                      : product?.product?.description}
                    ...
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" color="green" fontWeight="bold">
                ₹{product?.product?.offerPrice}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      color: "black",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{product?.product?.originalPrice}
                  </span>{" "}
                  <span style={{ fontSize: "12px", color: "black" }}>
                    {product?.product?.discount}%OFF
                  </span>
                </Typography>
              </Grid>
            </Grid>
          ))}

          {/* Address Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Address
            </Typography>
            <Box>
              <Chip
                label={address?.address?.addressType}
                sx={{
                  my: 1,
                  backgroundColor:
                    address?.addressType === "Home" ? "#4caf50" : "#2196f3",
                  color: "white",
                }}
              />
              <Typography variant="body1">
                {address?.address?.customerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address?.address?.landmark}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="body2" color="text.secondary">
                  {address?.address?.locality},{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address?.address?.state},{" "}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address?.address?.address}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {address?.address?.pincode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +91-{address?.address?.contactNumber}
              </Typography>
            </Box>
          </Box>

          {/* Shipment Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Shipment Method
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {shippingDate?.method}
            </Typography>
          </Box>

          {/* Price Breakdown */}
          <Box>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" textAlign="right">
                ₹{amount}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body1">Estimated Tax</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" textAlign="right">
                ₹{Tax}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Typography variant="body1">Shipping & Handling</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" textAlign="right">
                  {shippingDate?.method === "Free" ||
                  shippingDate?.method === "Schedule"
                    ? "FREE"
                    : shippingDate?.method}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" fontWeight="bold" textAlign="right">
                ₹
                  {shippingDate?.method === "Free" ||
                  shippingDate?.method === "Schedule"
                    ? Number(Tax) + Number(amount)
                    : Number(Tax) +
                      Number(amount) +
                      Number(shippingDate?.method)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Payment Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Payment
          </Typography>

          <Box
            className={styles.OnlinePaymentButton}
            sx={{
              width: { xs: "75vw", md: "30vw" },
            }}
          >
            <Box>
              <input
                type="radio"
                style={{ cursor: "pointer" }}
                checked={selectedItem === "Online"}
                onChange={() => handlePaytmentMethodFunction("Online")}
              />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Online Payment
              </Typography>
            </Box>
          </Box>

          <Box
            className={styles.OnlinePaymentButton}
            sx={{
              width: { xs: "75vw", md: "30vw" },
            }}
          >
            <Box>
              <input
                type="radio"
                style={{ cursor: "pointer" }}
                checked={selectedItem === "COD"}
                onChange={() => handlePaytmentMethodFunction("COD")}
              />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Cash on Delivery
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { xs: "75vw", md: "30vw" },
              justifyContent: "center",
            }}
          >
            <Button
              className={styles.pay}
              
              onClick={StripePayment}
            >
              Pay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
