import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const ReviewDrawer = ({ product, drawerOpen, setDrawerOpen }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const createReview = () => {

    if(rating===""){
        return enqueueSnackbar("You have to give a valid rating",{variant:"warning"});
    }
    if(review.length<5)
    {
        return enqueueSnackbar("Review is too short.",{variant:"warning"});
    }
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/review/create`,
        {
          rating: rating,
          reviewText: review,
          product: product?._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <Box sx={{ width:"320px", p: 2.5 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Product Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
       
            {product && (
            <>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                Product Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src={product?.image?.[0]}
                  alt="Product"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: "bold", mb: 0.5 }}
                  >
                    {product?.productName} ({product?.brand})
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Model: {product?.modelNumber}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Color: {product?.selectedColor}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Engine Capacity: {product?.engineCapacity}cc
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Max Power: {product?.maxPower} HP
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Mileage: {product?.mileage} km/l
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                      color: "#d32f2f",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    ${product?.offerPrice}
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontWeight: "normal",
                        color: "#9e9e9e",
                      }}
                    >
                      ${product?.originalPrice}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 4 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Kerb Weight: {product?.kerbWeight}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Top Speed: {product?.topSpeed}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Gear: {product?.gearbox}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Cooling System: {product?.coolingSystem} HP
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                description: {product?.description}
              </Typography>
            </>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                mt: 5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, justifyContent: "flex-start" }}
              >
                Leave a Review
              </Typography>

              <Box>
                <Typography
                  variant="body1"
                  sx={{ justifyContent: "flex-start" }}
                >
                  Rate This Product
                </Typography>
                <Rating
                  size="large"
                  onChange={(e) => setRating(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <TextField
                  placeholder="Write your comment here..."
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  onChange={(e) => setReview(e.target.value)}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "1rem",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
                onClick={createReview}
              >
                Submit Review
              </Button>
            </Box>
          
        
      </Box>
    </Drawer>
  );
};
