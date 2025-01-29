import { Box, Grid } from "@mui/material";
import { CartProduct } from "../components/cart/CartProducts";
import { Amount } from "../components/cart/Amout";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoCartProduct } from "../components/cart/NoCartProduct";
import styles from "../styles/cart.module.css";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/cart/product/cart/view`, {
        withCredentials: true,
      })
      .then((res) => {
        setCart(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className={styles.noCartBox}>
      <Box sx={{ width: "77vw", my: 5 }}>
        <Grid container spacing={2}>
          {/* Cart Product Grid */}

          <Grid item xs={12} md={7} lg={9}>
            {cart.length === 0 ? (
              <NoCartProduct />
            ) : (
              cart?.map((data, index) => (
                <CartProduct setCart={setCart} cart={data} key={index} />
              ))
            )}
          </Grid>
          {/* Amount Grid */}

          <Grid item xs={12} md={5} lg={3} className={styles.cartAmount}>
            <Amount length={cart} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
