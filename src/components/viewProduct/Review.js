import {
  Box,
  CardMedia,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  dayjs  from 'dayjs';
import styles from '../../styles/ViewProduct.module.css';

const ratings = [
  { label: "Excellent", value: 60, color: "#14958f" },
  { label: "Good", value: 50, color: "#14958f" },
  { label: "Average", value: 40, color: "#72bfbc" },
  { label: "Bad", value: 20, color: "#fcb301" },
  { label: "Very Bad", value: 10, color: "#f16565" },
];



export const Review = () => {
  const [review, setReview] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/review/${id}/reviews`, {
        withCredentials: true,
      })
      .then((res) => {
        setReview(res.data?.reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <Box sx={{ padding: 4, width: { xs: "90vw", lg: "57vw" } }}>
      {/* Section Title */}
      <Typography
        variant="h5"
        sx={{my:4}}
        className={styles.reviewHeading}
      >
        Ratings & Reviews
      </Typography>

      {/* Ratings Overview */}
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={4}
         className={styles.flexCenter}
        >
          <Box
           className={styles.reviewBox}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#1565c0" }}
            >
              4.8
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              of 125 reviews
            </Typography>
            <Rating name="read-only" value={4.8} precision={0.1} readOnly />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Ratings Breakdown
          </Typography>
          {ratings.map((rating, index) => (
            <Box
              key={index}
              className={styles.rating}
            >
              <Typography
                variant="body2"
                sx={{ width: "80px", fontWeight: "bold" }}
              >
                {rating.label}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={rating.value}
                sx={{
                  flex: 1,
                  height: 10,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: rating.color,
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ width: "40px", textAlign: "right" }}
              >
                {rating.value}%
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 5 }}>
        {review.map((data, index) => (
          <Box
            key={index}
            className={styles.reviewSection}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                sm={2}
                md={1}
              className={styles.flexCenter}
              >
                <CardMedia
                  component="img"
                  image={data?.user?.profilePicture}
                  alt={data.name}
                  className={styles.media}
                />
              </Grid>
              <Grid item xs={9} sm={10} md={11}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {data?.user?.fullName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {dayjs(data.createdAt).format("DD-MMM-YYYY")}
                  </Typography>
                </Box>
                <Rating
                  name="read-only"
                  value={data.rating}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                  {data?.reviewText}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
