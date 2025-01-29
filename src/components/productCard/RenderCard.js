import { Favorite, Speed } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import Cookies from "js-cookie";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addwishList } from "../../Redux/ProductAdminSlice/ProductSlice";
import styles from "../../styles/RenderCard.module.css";

export const RenderCard = ({ bike, load }) => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const { wishList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const bikeName = `${bike.productName} (${bike.brand})`;

  const addWishList = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/wishlist/wishlist/add`,
        { productId: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res?.data?.message);
        dispatch(addwishList(id));
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  return (
    <Card
      className={styles.card}
      sx={{
        width: { xs: "330px", sm: "360px" },
      }}
    >
     
      {load ? (
        <Skeleton variant="rectangular" width={400} height={220} />
      ) : (
        <CardMedia
          component="img"
          alt={bike.productName}
          height="220"
          image={bike.image?.[0]}
          sx={{
            objectFit: { xs: "contain", sm: "cover" },
            filter: "brightness(0.9)",
          }}
        />
      )}

    
      <Box className={styles.positionWrapper}>
        {bike.isNewArrival && (
          <Chip label="New Arrival" color="success" size="small" />
        )}
        {bike.isBestSeller && (
          <Chip label="Bestseller" color="warning" size="small" />
        )}
        {bike.isFeatureProduct && (
          <Chip label="Featured" color="primary" size="small" />
        )}
      </Box>

     
      {token &&
        (load ? null : (
          <Favorite
            className={styles.buttonWrapper}
            sx={{
              color: wishList?.includes(bike?._id) ? "red" : "black",
            }}
            onClick={() => addWishList(bike?._id)}
          />
        ))}

     
      <CardContent
        sx={{
          color: "black",
          padding: { xs: 2, sm: 2 },
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() =>
          navigate(`/view-product/${bike?._id}/${bike?.modelNumber}`)
        }
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: { xs: "inherit", sm: "none" },
            fontSize: "17px",
          }}
        >
          {bikeName.length > 10 ? `${bikeName.slice(0, 10)}...` : bikeName}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            display: { xs: "none", sm: "inherit", height: "40px" },
          }}
        >
          {load ? (
            <Skeleton animation="wave" width={150} />
          ) : bikeName?.length > 20 ? (
            `${bikeName.slice(0, 20)}...`
          ) : (
            bikeName
          )}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, display: { xs: "none", sm: "inherit", height: "40px" } }}
        >
          {load ? (
            <Skeleton animation="wave" />
          ) : bike?.description?.length > 20 ? (
            `${bike.description.slice(0, 60)}...`
          ) : (
            bike?.description || "No description available"
          )}
        </Typography>

        <Divider sx={{ my: 1 }} />

        
        <Box 
         className={styles.speicification}
          sx={{
            display: { xs: "none", sm: "flex" },
          
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Speed />
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {load ? <Skeleton animation="wave" /> : bike.mileage} Miles
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <LocalGasStationIcon />
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {load ? <Skeleton animation="wave" /> : bike.fuelType}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <AutoModeIcon />
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {load ? <Skeleton animation="wave" /> : bike.type}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1, display: { xs: "none", sm: "block" } }} />

        
        <Box className={styles.price}>
          <Typography
           className={styles.Typography}
          >
            {load ? (
              <Skeleton animation="wave" width={50} />
            ) : (
              `₹${bike.offerPrice}`
            )}
          </Typography>
          <Typography
           className={styles.originalPrice}
          >
            {load ? (
              <Skeleton animation="wave" width={50} />
            ) : (
              `₹${bike.originalPrice}`
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "red",
              display: { xs: "none", sm: "inherit" },
            }}
          >
            ({load ? <Skeleton animation="wave" width={20} /> : bike.discount}%
            OFF)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
