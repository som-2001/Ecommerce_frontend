import {
  Box,
  Typography,
  CardMedia,
  Grid,
  Button,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../../styles/Order.module.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripe = await stripePromise;

export const PaymentForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { address, shippingDate } = useSelector((state) => state.product);
  const [selectedItem, setSelectedItem] = useState("");
  const [Tax, setTax] = useState(Math.floor(Math.random() * 20));
  const [TotalAmount, setTotalAmount] = useState("");
  const [load,setLoad]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {

   

    axios
      .get(`${process.env.REACT_APP_BASEURL}/products/products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res?.data);
        console.log(res?.data);
        if (
          shippingDate.method === "Free" ||
          shippingDate?.method === "Schedule"
        ) {
          setTotalAmount(Tax + res?.data?.offerPrice);
        } else {
          setTotalAmount(
            Tax + res?.data?.offerPrice + Number(shippingDate?.method)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Tax, shippingDate?.method, id]);

  const handlePaytmentMethodFunction = (method) => {
    setSelectedItem(method);
  };

  const StripePayment = async () => {
    setLoad(true);
    const response = await axios.post(
      `${process.env.REACT_APP_BASEURL}/orders/order`,
      {
        shippingAddress: address.address,
        userId: jwtDecode(Cookies.get("accessToken")).id,
        products: [
          {
            product: {
              productName: product?.productName,
              image: product?.image,
              description: product?.description,
              offerPrice: product?.offerPrice,
              _id: product?._id,
            },
            price: TotalAmount,
            quantity: 1,
          },
        ],
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
      setLoad(false);
    }

    const session = response.data?.checkoutSessionId;
    if (session) {
      const result = await stripe.redirectToCheckout({ sessionId: session });

      if (result.error) {
        setLoad(false);
        console.error(result.error.message);
      }
    }
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

          <Box
            sx={{
              backgroundColor: "whitesmoke",
              padding: 2,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardMedia
                  component="img"
                  image={product?.image?.[0]}
                  className={styles.PaymentCartFormimg}
                  sx={{
                    width: { xs: "120px", sm: "80px", md: "80px", lg: "80px" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {product?.productName} ({product?.brand})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description?.length > 50
                      ? product?.description.slice(0, 50)
                      : product?.description}
                    ...
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1" color="green">
                  ₹{product?.offerPrice}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      color: "black",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{product?.originalPrice}
                  </span>{" "}
                  <span style={{ fontSize: "12px", color: "black" }}>
                    {product?.discount}%OFF
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>

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
              <Box className={styles.paymentCartFormFlex}>
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
                  ₹{product?.offerPrice}
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
                  ₹{TotalAmount}
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
              width: { xs: "75vw", sm: "30vw" },
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
              width: { xs: "75vw", sm: "30vw" },
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
              width: { xs: "80vw", sm: "30vw" },
              justifyContent: "center",
            }}
          >
            <Button className={styles.pay} disabled={load} onClick={StripePayment}>
            {load?<CircularProgress size={30}/>:<span>Pay</span>}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
