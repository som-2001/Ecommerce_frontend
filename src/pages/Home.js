import { Box } from "@mui/material";
import { ExploreNow } from "../components/homepage/ExplorNow";
import { About } from "../components/homepage/About";
import { Hero } from "../components/homepage/Hero";
import { Product } from "../components/homepage/Product";
import Footer from "../components/Footer";
import { FAQ } from "../components/homepage/FAQ";
import "../App.css";
import BestSeller from "../components/homepage/BestSeller";
import Gallary from "../components/homepage/Gallary";
import FeatureProduct from "../components/homepage/FeatureProduct";
import { Partners } from "../components/homepage/Partners";
import Benefits from "../components/homepage/Benefits";
import { Review } from "../components/homepage/Review";
import Cookies from "js-cookie";
import { AuthNavbar } from "../components/AuthNavbar";
import { HomeNavbar } from "../components/HomeNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/home.module.css";
import { Search } from "../components/Search";

function Home() {
  const token = Cookies.get("accessToken");
  const [newArrival, setNewArrival] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [featureProduct, setFeatureProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/home/gets`)
      .then((res) => {
        setNewArrival(res?.data?.newArrivals);
        setBestSeller(res?.data?.bestSellers);
        setFeatureProduct(res?.data?.featureProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box
      className={styles.home}
      sx={{ backgroundSize: { xs: "cover", md: "100%" } }}
    >
      {token ? <AuthNavbar /> : <HomeNavbar />}
      <Search />
      <Hero />
      <About />
      <ExploreNow />
      <Product product={newArrival} />
      <BestSeller product={bestSeller} />
      <FeatureProduct product={featureProduct} />
      <Partners />
      <Gallary />
      <Benefits />
      <Review />
      <FAQ />
      <Footer />
    </Box>
  );
}

export default Home;
