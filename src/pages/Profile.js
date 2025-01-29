import { Box } from "@mui/material";
import { Hero } from "./../components/profile/Hero";
import { Form } from "../components/profile/Form";
import { ManageAddresses } from "../components/profile/ManageAddresses";
import { WishList } from "../components/profile/WishList";
import { Orders } from "../components/profile/Orders";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import styles from "../styles/profile.module.css";

function Profile() {
  const [data, setData] = useState([]);
  const [profileLoad, setProfileLoad] = useState(true);
  const [orderLoad, setOrderLoad] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState("");
  const [orderLength, setOrderLength] = useState("");
  const [changeState, setChangeState] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/users/users/${
          jwtDecode(Cookies.get("accessToken")).id
        }`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setProfileLoad(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BASEURL}/orders/userOrders?limit=2`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setOrderLoad(false);
        setOrders(res.data?.orders);
        setOrderLength(res.data.orderLength);
      })
      .catch((err) => {
        setOrderLoad(false);
        setOrderError(err?.response?.data?.message);
        console.log(err);
      });
  }, [changeState]);

  return (
    <>
      <Box className={styles.profileParent}>
        <Hero data={data} load={profileLoad} />
        <Form
          data={data}
          setChangeState={setChangeState}
          changeState={changeState}
          load={profileLoad}
        />
        <ManageAddresses profile={data} load={profileLoad} />
        <Orders
          orders={orders}
          orderLength={orderLength}
          orderError={orderError}
          load={orderLoad}
        />
        <WishList />
      </Box>
    </>
  );
}

export default Profile;
