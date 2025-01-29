import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import Footer from "../components/Footer";
import axios from "axios";
import { WishListCard } from "../components/Wishlist/WishListCard";
import { NoWishList } from "../components/Wishlist/NoWishList";
import styles from "../styles/WishList.module.css";

function WishList() {
  const [Bike, setBike] = React.useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/wishlist/wishlist`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoad(false);
        setBike(res.data.wishlist);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box
        className={styles.wishListParent}
        sx={{
          p: { xs: 1, sm: 4, md: 6 },
        }}
      >
        <Typography variant="h4" className={styles.h4} color="text.secondary">
          My Wishlist ({Bike.length} Items)
        </Typography>
        <Grid container spacing={1}>
          {load ? (
            <Box className={styles.progress}>
              <CircularProgress />
            </Box>
          ) : Bike.length > 0 ? (
            Bike.map((bike) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={bike.id}
                className={styles.Grid}
              >
                <WishListCard bike={bike} setBike={setBike} />
              </Grid>
            ))
          ) : (
            <NoWishList />
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default WishList;
