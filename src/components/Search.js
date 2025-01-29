import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../Redux/ProductAdminSlice/ProductSlice";
import styles from "../styles/ProtectedRoute.module.css";

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.product);
  return search.length !== 0 ? (
    <Box
      className={styles.parent}
      sx={{
        right: { xs: "5%", sm: "23%", md: "24%" },
      }}
    >
      <Grid container spacing={1}>
        {search?.message !== "No products found matching the criteria." ? (
          search?.products?.map((data, index) => (
            <Grid item xs={12} key={index}>
              <Card
                className={styles.card}
                onClick={(e) => {
                  navigate(`/view-product/${data?._id}/${data?.modelNumber}`);
                  dispatch(setSearch([]));
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="80"
                  className={styles.cardMedia}
                  image={data.image?.[0] || "https://via.placeholder.com/180"}
                  alt={data.productName || "Product Image"}
                />
                {/* Product Details */}
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    {data.productName || "Product Name"} ({data.brand})
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold", color: "#FF5722" }}
                  >
                    ₹{data.offerPrice || "N/A"}{" "}
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      ₹{data.originalPrice}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p className={styles.noProductFound}>No product found.</p>
          </Grid>
        )}
      </Grid>
    </Box>
  ) : null;
};
