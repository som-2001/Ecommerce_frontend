import React from "react";
import { Box, Button, Grid, Typography, CardMedia } from "@mui/material";
import Footer from "../components/Footer";
import styles from "../styles/About.module.css";
import { AuthNavbar } from "../components/AuthNavbar";
import { HomeNavbar } from "../components/HomeNavbar";
import Cookies from "js-cookie";

function About() {
  const token = Cookies.get("accessToken");
  return (
    <Box className={styles.container}>
      {token ? <AuthNavbar /> : <HomeNavbar />}
      <Box
        className={styles.banner}
        style={{ backgroundImage: `url("../images/about_banner.jpg")` }}
      >
        <Box className={styles.bannerOverlay}>
          <Typography
            variant="h3"
            className={`${styles.bannerTitle} ${styles.bannerTitleXs}`}
          >
            Discover the Joy of Biking
          </Typography>
          <Typography
            variant="body1"
            className={`${styles.bannerSubtitle} ${styles.bannerSubtitleXs}`}
          >
            Your ultimate destination for premium bikes, accessories, and
            unforgettable adventures.
          </Typography>
          <Button className={styles.bannerButton}>Explore Now</Button>
        </Box>
      </Box>

      {/* About Section */}
      <Box className={styles.aboutSection}>
        <Typography
          variant="h4"
          className={`${styles.aboutTitle} ${styles.aboutTitleXs}`}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          className={`${styles.aboutText} ${styles.aboutTextXs}`}
        >
          We are passionate about providing the best biking experience. Whether
          you are a professional rider or a casual enthusiast, our mission is to
          offer the finest bikes, gear, and accessories to make your adventures
          unforgettable.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={3} className={styles.featuresGrid}>
        <Grid item xs={12} sm={6} md={4} className={styles.featureItem}>
          <CardMedia
            component="img"
            image="../images/about_bike.jpg"
            alt="High-Performance Bikes"
            className={styles.featureImage}
          />
          <Typography variant="h6" className={styles.featureTitle}>
            High-Performance Bikes
          </Typography>
          <Typography variant="body2" className={styles.featureDescription}>
            Experience the thrill with our range of high-performance bikes
            designed for speed and agility.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            image="../images/about_gear.jpg"
            alt="Adventure Gear"
            className={styles.img}
          />
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#F9A826",
            }}
          >
            Adventure Gear
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "whitesmoke", fontSize: "0.9rem" }}
          >
            Gear up with our premium collection of adventure accessories for
            your ultimate biking experience.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            textAlign: "center",
          }}
        >
          <CardMedia
            component="img"
            image="../images/about_community.jpg"
            alt="Community Support"
            className={styles.img}
          />
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#F9A826",
            }}
          >
            Community Support
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "whitesmoke", fontSize: "0.9rem" }}
          >
            Join our community of biking enthusiasts and share your journey with
            fellow riders.
          </Typography>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Box className={styles.teamSection}>
        <Typography
          variant="h4"
          className={`${styles.teamTitle} ${styles.teamTitleXs}`}
        >
          MEET OUR TEAM
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} className={styles.teamMember}>
            <CardMedia
              component="img"
              image="../images/team_member1.jpg"
              alt="Team Member 1"
              className={styles.teamMemberImage}
            />
            <Typography variant="h6" className={styles.teamMemberName}>
              Someswar Gorai
            </Typography>
            <Typography variant="body2" className={styles.teamMemberRole}>
              Frontend Developer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={styles.teamMember}>
            <CardMedia
              component="img"
              image="../images/team_member2.jpg"
              alt="Team Member 1"
              className={styles.teamMemberImage}
            />
            <Typography variant="h6" className={styles.teamMemberName}>
              Amardeep Dubey
            </Typography>
            <Typography variant="body2" className={styles.teamMemberRole}>
              Senoir Developer & Lead
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={styles.teamMember}>
            <CardMedia
              component="img"
              image="../images/team_member3.jpg"
              alt="Team Member 1"
              className={styles.teamMemberImage}
            />
            <Typography variant="h6" className={styles.teamMemberName}>
              Md Danish
            </Typography>
            <Typography variant="body2" className={styles.teamMemberRole}>
              backend Developer
            </Typography>
          </Grid>
          {/* Repeat for other team members */}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}

export default About;
