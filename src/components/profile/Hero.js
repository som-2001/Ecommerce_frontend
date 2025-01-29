import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { LogoutDialog } from "./LogoutDialog";
import dayjs from "dayjs";
import styles from "../../styles/profile.module.css";

export const Hero = ({ data, load }) => {
  const [profileImage, setProfileImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
  );
  const [open, setOpen] = useState(false);

  const openLogoutDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (data) {
      setProfileImage(data?.profilePicture);
    }
  }, [data]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 

      const formData = new FormData();
      formData.append("profilePicture", file);
      console.log(file);

      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/users/profile-picture/${
            jwtDecode(Cookies.get("accessToken")).id
          }`,
          formData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          enqueueSnackbar("Profile picture has been updated successfully", {
            variant: "success",
          });
        })
        .catch((err) => {
          enqueueSnackbar("Failed to update profile picture", {
            variant: "error",
          });
        });
    }
  };

  return (
    <Box sx={{ width: { xs: "88vw", sm: "77vw" }, padding: { xs: 2, sm: 5 } }}>
      <Box className={styles.HeroParent}>
        <Box>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1.0rem", lg: "1.6rem" },
            }}
            className={styles.HeroChild}
          >
            <span>Welcome, </span>
            <span>
              {load ? (
                <Skeleton animation="wave" width={150} />
              ) : (
                data?.fullName
              )}
            </span>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span>Joined on,</span>
            <span>
              {load ? (
                <Skeleton animation="wave" width={100} />
              ) : (
                dayjs(data.createdAt).format("DD MMM,YYYY")
              )}
            </span>
            {/* {new Date(data.createdAt).toLocaleDateString()} */}
          </Typography>
        </Box>
        <Box>
          <Button className={styles.HeroLogout} onClick={openLogoutDialog}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box className={styles.banner}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            sm={2}
            md={2}
            lg={1}
            sx={{
              position: "relative",
            }}
          >
            {load ? (
              <Skeleton variant="circular" width={80} height={80} />
            ) : (
              <CardMedia
                component="img"
                image={profileImage}
                className={styles.Heroimg}
              />
            )}
            <Box className={styles.HeroIcon}>
              <IconButton className={styles.iconButton}>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.file}
                  onChange={handleImageChange}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            sm={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">
              {load ? (
                <Skeleton animation="wave" width={150} />
              ) : (
                data?.fullName
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {load ? <Skeleton animation="wave" width={150} /> : data?.email}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <LogoutDialog open={open} setOpen={setOpen} />
    </Box>
  );
};
