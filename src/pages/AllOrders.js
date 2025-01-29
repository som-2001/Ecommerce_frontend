import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Footer from "../components/Footer";
import axios from "axios";
import dayjs from "dayjs";
import { ReviewDrawer } from "../components/UserReview/ReviewDrawer";
import { NoOrder } from "../components/order/NoOrder";
import styles from "../styles/Order.module.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/orders/userOrders`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setOrders(res.data?.orders);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const handleOpenDrawer = (id) => {
    setDrawerOpen(true);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/products/products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProductDetails(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Box className={styles.allOrderParents}>
        <Typography variant="h5" className={styles.h5}>
          All Orders
        </Typography>
        <Grid container spacing={3}>
          {loading ? (
            <Box className={styles.CircularProgress}>
              <CircularProgress />
            </Box>
          ) : orders?.length === 0 ? (
            <NoOrder />
          ) : (
            orders.map((order) => (
              <Grid item xs={12} key={order.id} className={styles.center}>
                <Card
                  className={styles.card}
                  sx={{
                    width: { xs: "78vw", md: "57vw" },
                  }}
                >
                  {/* Header Section */}
                  <Box className={styles.header}>
                    {order?.status === "cancelled" ? (
                      <Avatar className={styles.cancelStatus}>
                        <CancelIcon />
                      </Avatar>
                    ) : (
                      <Avatar className={styles.deliveredStatus}>
                        <CheckCircleIcon />
                      </Avatar>
                    )}
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: order.status === "cancelled" ? "red" : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {order.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Delivered by{" "}
                        {dayjs(order?.shipmentDetails?.deliveryDate).format(
                          "DD-MMM-YYYY"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Product Info Section */}
                  {order?.products?.map((item, index) => (
                    <Box className={styles.productInfoBox}>
                      <img
                        src={item?.image?.[0]}
                        alt={order.productName}
                        className={styles.img}
                      />
                      <Grid container>
                        <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {item?.productName} ({item?.brand})
                          </Typography>

                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Typography variant="body2" color="text.secondary">
                              Color:{" "}
                            </Typography>
                            <Box
                              className={styles.colorBox}
                              sx={{
                                backgroundColor: item?.selectedColor,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="green">
                            Price: ₹{order.totalPrice}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={6}>
                          {order?.status === "delivered" ? (
                            <Typography
                              variant="body2"
                              className={styles.rating}
                              onClick={(e) => handleOpenDrawer(item?._id)}
                            >
                              Rate & Review
                            </Typography>
                          ) : null}
                        </Grid>
                      </Grid>

                      <LocalShippingOutlinedIcon color="action" />
                    </Box>
                  ))}

                  {/* Footer Section */}
                  <CardContent>
                    <Divider sx={{ marginY: "16px" }} />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Order ID # {order._id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      {drawerOpen && (
        <ReviewDrawer
          product={productDetails}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      )}
      <Footer />
    </Box>
  );
};

export default OrdersPage;
