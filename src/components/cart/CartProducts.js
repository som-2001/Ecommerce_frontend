import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeAmount, removeCartProduct } from "../../Redux/ProductAdminSlice/ProductSlice";
import { enqueueSnackbar } from "notistack";
import styles from "../../styles/cart.module.css"
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const CartProduct = ({ cart, setCart }) => {
 
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const removeCart = (id,price) => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/cart/remove/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        enqueueSnackbar(res.data.message,{variant:"success"});
        setCart((prev) => prev.filter((product) => product?.product?._id !== id));
        dispatch(removeCartProduct(id));
        dispatch(removeAmount(price));
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error.message);
      });
  };

  return (
    <Box
    className={styles.CartProductBox}
    >
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        {/* Product Image */}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          className={styles.flex}
        >
          <CardMedia
            component="img"
            image={cart?.product?.image?.[0]}
            alt={cart?.product?.productName}
            sx={{
              width: { xs: "200px", sm: "150px" },
              cursor:"pointer"
            }}
            className={styles.img}
            onClick={(e)=>navigate(`/view-product/${cart?.product?._id}/${cart?.product?.modelNumber}`)}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} sm={8} md={6}>
          <Typography
            className={styles.textFormat1}
          >
            {cart?.product?.productName}
          </Typography>
          <Typography
            className={styles.description}
          >
            {cart?.product?.description?.slice(0, 50)}...
          </Typography>

          {/* Pricing */}
          <Typography
            className={styles.offerPrice}
          >
            ₹{cart?.product?.offerPrice}
            <span
              className={styles.originalPrice}
            >
              ₹{cart?.product?.originalPrice}
            </span>{" "}
            <span className={styles.discount}>
              {cart?.product?.discount}% OFF
            </span>
          </Typography>

          {/* Delivery Date */}
          <Typography
           className={styles.deliveryDate}
          >
            <CheckIcon className={styles.CheckIcon} />
            Delivery by{" "}
            <span className={styles.DeliveryBy}>
              {dayjs(new Date().getTime()).add(7,"day").format("DD MMM,YYYY")}
            </span>
          </Typography>
        </Grid>

        {/* Actions */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <Button
            variant="contained"
            className={styles.removeButton}
           
            onClick={() => removeCart(cart?.product?._id,cart?.product?.offerPrice)}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
