import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import Cookies from "js-cookie";
import styles from "../../styles/FeatureProduct.module.css";

const FeatureProduct = ({ product }) => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");

  return (
    <Box className={styles.parent}>
      <Typography variant="body2" color="#999999" gutterBottom>
        Your Best Ride Starts here
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" }, my: 1 }}
      >
        Feature Products
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={3} className={styles.center}>
          {product &&
            product?.slice(0, 2)?.map((product, index) => (
              <Card
                className={styles.Card}
                sx={{
                  width: { xs: "300px", sm: "300px" },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image?.[0]}
                  alt=""
                />

                {token && <Favorite className={styles.Icon} />}
                <CardContent className={styles.body}>
                  <Typography variant="h6" component="div">
                    {product?.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description.slice(0, 70)}...
                  </Typography>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box className={styles.icons}>
                    <Box>
                      <Typography>{product?.mileage} Miles</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.fuelType}</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.kerbWeight}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography className={styles.price}>
                      ₹{product?.offerPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={(e) =>
                        navigate(
                          `/view-product/${product?._id}/${product?.modelNumber}`
                        )
                      }
                    >
                      Shop now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className={styles.center}
          sx={{
            zIndex: 5,
          }}
        >
          {product &&
            product?.slice(2, 3)?.map((product, index) => (
              <Card
                className={styles.Card}
                sx={{
                  width: { xs: "300px", sm: "300px", md: "500px" },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image?.[0]}
                  alt=""
                  sx={{ height: { xs: "200px", sm: "300px" } }}
                />

                {token && <Favorite className={styles.Icon} />}
                <CardContent className={styles.body}>
                  <Typography variant="h6" component="div">
                    {product?.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description.slice(0, 70)}...
                  </Typography>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box className={styles.icons}>
                    <Box>
                      <Typography>{product?.mileage} Miles</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.fuelType}</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.kerbWeight}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography className={styles.price}>
                      ₹{product?.offerPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={(e) =>
                        navigate(
                          `/view-product/${product?._id}/${product?.modelNumber}`
                        )
                      }
                    >
                      Shop now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3} className={styles.center}>
          {product &&
            product?.slice(3, 5)?.map((product, index) => (
              <Card
                className={styles.Card}
                sx={{
                  width: { xs: "300px", sm: "300px" },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image?.[0]}
                  alt=""
                />

                {token && <Favorite className={styles.Icon} />}
                <CardContent className={styles.body}>
                  <Typography variant="h6" component="div">
                    {product?.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product?.description.slice(0, 70)}...
                  </Typography>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box className={styles.icons}>
                    <Box>
                      <Typography>{product?.mileage} Miles</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.fuelType}</Typography>
                    </Box>
                    <Box>
                      <Typography>{product?.kerbWeight}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ backgroundColor: "#C6E4FF", my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography className={styles.price}>
                      ₹{product?.offerPrice}
                    </Typography>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={(e) =>
                        navigate(
                          `/view-product/${product?._id}/${product?.modelNumber}`
                        )
                      }
                    >
                      Shop now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeatureProduct;
