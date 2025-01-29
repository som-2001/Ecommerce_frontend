import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  CardMedia,
  Skeleton,
} from "@mui/material";
import {
  Speed,
  DirectionsBike,
  LocalGasStation,
  Build,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addAmount, addCart } from "../../Redux/ProductAdminSlice/ProductSlice";
import dayjs from "dayjs";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/ViewProduct.module.css";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";

const Hero = ({ product, coloredProduct, load }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const userRole = jwtDecode(Cookies.get("accessToken")).role;
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0]);
    }
    if (coloredProduct?.length > 0) {
      coloredProduct?.forEach((data, index) => {
        if (data?._id === id) {
          console.log(data);
          setSelectedColor(data?.selectedColor);
        }
      });
    }
  }, [product, coloredProduct]);

  const addToCart = (amount) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/cart/product/cart`,
        {
          productId: id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar(res.data.message, { variant: "success" });
        dispatch(addCart(id));
        dispatch(addAmount(amount));
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  const specifications = [
    { icon: <Speed />, label: "Top Speed", value: product?.topSpeed || "N/A" },
    {
      icon: <DirectionsBike />,
      label: "Engine Type",
      value: product?.engineType || "N/A",
    },
    {
      icon: <LocalGasStation />,
      label: "Mileage",
      value: product?.mileage || "N/A",
    },
    { icon: <Build />, label: "Max Power", value: product?.maxPower || "N/A" },
    { icon: <Build />, label: "Torque", value: product?.maxTorque || "N/A" },
    {
      icon: <Build />,
      label: "Fuel Capacity",
      value: product?.fuelTankCapacity || "N/A",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ padding: "1rem" }}>
        <Grid container spacing={4}>
          {/* Left Side: Images */}
          {load ? (
            <Grid item xs={12} md={5} className={styles.centeredContent}>
              <Skeleton
                variant="rectangular"
                sx={{
                  width: {
                    xs: 300, 
                    sm: 500, 
                    md: 700, 
                  },
                  height: 400, 
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} md={5} sx={{ mt: 4 }}>
              <Box className={styles.centeredBox}>
                {selectedImage && (
                  <CardMedia
                    component="img"
                    image={selectedImage}
                    alt={product?.productName || "Product"}
                    className={styles.img}
                    sx={{
                      height: { xs: "200px", sm: "500px" },
                    }}
                  />
                )}
                <Box className={styles.flexCenter}>
                  {product?.image?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={styles.selectedImage}
                      style={{
                        border:
                          selectedImage === img
                            ? "2px solid gold"
                            : "2px solid gray",
                      }}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Right Side: Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: { xs: "0px", sm: "20px" } }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
              >
                {load ? (
                  <Skeleton animation="wave" />
                ) : (
                  `${product?.productName} (${product?.brand})`
                )}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
                Available since:{" "}
                {load ? (
                  <Skeleton animation="wave" />
                ) : (
                  dayjs(product?.createdAt).format("DD MMM,YYYY")
                )}
              </Typography>
              <Typography variant="body1" color="green" fontWeight="bold">
                Special price
              </Typography>
              <Box className={styles.specialPrice}>
                <Typography variant="h5" className={styles.h5}>
                  {load ? (
                    <Skeleton animation="wave" width={50} />
                  ) : (
                    `₹${product?.offerPrice || "N/A"}`
                  )}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "line-through", color: "gray" }}
                >
                  {load ? (
                    <Skeleton animation="wave" width={50} />
                  ) : (
                    `₹${product?.originalPrice || "N/A"}`
                  )}
                </Typography>

                <Chip
                  sx={{ color: "green", marginLeft: "0.4rem" }}
                  label={
                    load ? (
                      <Skeleton animation="wave" />
                    ) : (
                      `${product?.discount}% off` || "N/A"
                    )
                  }
                />
                <Box className={styles.icon}>
                  <StarIcon />
                  <Typography sx={{ marginLeft: "4px", fontWeight: 600 }}>
                    {load ? <Skeleton animation="wave" width={40} /> : 4.5}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ my: 0.3 }}>
                <Typography variant="body2" sx={{ fontWeight: "600", mb: 2 }}>
                  Model Version:{" "}
                  {load ? (
                    <Skeleton animation="wave" width={100} />
                  ) : (
                    product?.yearOfLaunch
                  )}
                </Typography>
              </Box>

              <Divider sx={{ marginBottom: "1rem" }} />
              <Box className={styles.flexContainer}>
                <Typography variant="body1">Select Color:</Typography>

                <Box sx={{ display: "flex", gap: "0.6rem" }}>
                  {coloredProduct.map((color, index) =>
                    load ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Box
                        className={styles.parent}
                        sx={{
                          transform:
                            selectedColor === color?.selectedColor
                              ? "scale(1.05)"
                              : "scale(1)",
                        }}
                        onClick={() => {
                          navigate(
                            `/view-product/${color?._id}/${color?.modelNumber}`
                          );
                          setSelectedColor(color?.selectedColor);
                        }}
                      >
                        {color?.selectedColor}
                        <Box
                          className={styles.selectedColorBox}
                          key={index}
                          sx={{
                            backgroundColor: color?.selectedColor?.toLowerCase(),
                          }}
                        ></Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>

              <Divider sx={{ marginBottom: "1rem" }} />

              <Box className={styles.containerStyle}>
                {specifications.map((spec, index) => (
                  <Chip
                    key={index}
                    icon={spec.icon}
                    label={
                      load ? (
                        <Skeleton animation="wave" width={100} />
                      ) : (
                        `${spec.label}: ${spec.value}`
                      )
                    }
                    className={styles.buttonStyle}
                  />
                ))}
              </Box>
              <Typography variant="body2" className={styles.alloyWheels}>
                {load ? <Skeleton animation="wave" /> : product?.description}
              </Typography>

              <Chip
                label={
                  <Box className={styles.center}>
                    Bluetooth Connectivity:{" "}
                    {product?.bluetoothConnectivity ? (
                      <DoneAllIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Box>
                }
                className={styles.alloyWheels}
              />

              <Chip
                label={
                  <Box className={styles.center}>
                    Mobile Charging Port:{" "}
                    {product?.mobileChargingPort ? (
                      <DoneAllIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Box>
                }
                className={styles.alloyWheels}
              />

              <Chip
                label={
                  <Box className={styles.center}>
                    Alloy Wheels:{" "}
                    {product?.alloyWheels ? <DoneAllIcon /> : <CloseIcon />}
                  </Box>
                }
                className={styles.alloyWheels}
              />

              <Chip
                label={
                  <Box className={styles.center}>
                    Led Lights:{" "}
                    {product?.ledLights ? <DoneAllIcon /> : <CloseIcon />}
                  </Box>
                }
                className={styles.chip}
              />

{userRole !== "admin" && (
                <Box className={styles.btnDiv}>
                  <Button
                    variant="contained"
                    disabled={load}
                    className={styles.buybtn}
                    onClick={() => navigate(`/payment/${product?._id}`)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={cart.includes(product?._id) || load}
                    className={styles.box}
                    // onClick={() => navigate('/cart')}
                    onClick={(e) => addToCart(product?.offerPrice)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
