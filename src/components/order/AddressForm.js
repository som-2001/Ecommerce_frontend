  import { Box, Chip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { AddressDialogFunc } from "../profile/AddressDialogFunc";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAddressDetails } from "../../Redux/ProductAdminSlice/ProductSlice";
import styles from '../../styles/Order.module.css'

export const AddressForm = ({ handlefunction }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [addressData, setAddressData] = useState([]);
  const dispatch=useDispatch();

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
        setAddressData(res.data?.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIdFunction = (id,address) => {
    setSelectedId((prev) => (prev === id ? null : id)); 
    dispatch(setAddressDetails({address:address}));
    handlefunction(true);
  };

  return (
    <Box sx={{ width: { xs: "82vw", sm: "90vw", md: "60vw" } }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Manage Addresses ({addressData.length})
      </Typography>

      <Box
        className={styles.addressParent}
        onClick={(e) => setOpenDialog(true)}
      >
        <AddIcon className={styles.icon}/>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.addressText}
        >
          Add a new Address
        </Typography>
      </Box>

      {addressData.map((address) => (
        <Box
          key={address.id}
          className={styles.addressMap}
        >
          <Box>
            <input
              type="radio"
              style={{cursor:"pointer"}}
              checked={selectedId === address._id} 
              onChange={() => handleIdFunction(address._id,address)}
            />
          </Box>
          <Box>
            <Chip
              label={address?.addressType}
              sx={{
                my: 1,
                backgroundColor:
                  address?.addressType === "Home" ? "#4caf50" : "#2196f3",
                color: "white",
              }}
            />
            <Typography variant="body1" sx={{fontWeight:"bold"}}>{address?.customerName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {address?.landmark}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row",flexWrap:"wrap",wordBreak:"break-word" }}>
              <Typography variant="body2" color="text.secondary">
                {address?.locality},{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address?.state},{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address?.address}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {address?.pincode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +91-{address?.contactNumber}
            </Typography>
          </Box>
        </Box>
      ))}

      {openDialog && (
        <AddressDialogFunc open={openDialog} setOpen={setOpenDialog} profileData={addressData} setProfileData={setAddressData} />
      )}
    </Box>
  );
};
