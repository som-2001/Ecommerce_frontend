import {
  Box,
  Chip,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import { useEffect, useState } from "react";
import { AddressDialogFunc } from "./AddressDialogFunc";
import { PersonPinCircle } from "@mui/icons-material";
import { AddressEditDialogFunc } from "./AddressEditDialogFunc";
import { AddressDeleteDialogFunc } from "./AddressDeleteDialogFunc";
import styles from "../../styles/profile.module.css";

export const ManageAddresses = ({ profile, load }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [address, setAddress] = useState([]);
  const [profileId, setProfileId] = useState();
  const [addressId, setAddressId] = useState();
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    if (profile?.address) {
      console.log(profile?.address);
      setAddress(profile?.address);
    }
  }, [profile]);

  const EditAddress = (index, profileId, addressId) => {
    setOpenEditDialog(true);
    setProfileId(profileId);
    setAddressId(addressId);
    setAddressData(address[index]);
  };

  const DeleteAddress = (profileId, addressId) => {
    setOpenDeleteDialog(true);
    setProfileId(profileId);
    setAddressId(addressId);
  };
  return (
    <Box sx={{ width: { xs: "88vw", sm: "77vw" }, margin: "0 auto", mt: 4 }}>
    
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ my: 2, fontSize: "1.1rem" }}
        gutterBottom
      >
        My Addresses ({profile?.address?.length})
      </Typography>

    
      <Box className={styles.addressBox} onClick={(e) => setOpenDialog(true)}>
        <AddIcon sx={{ color: "#4caf50", fontSize: "2rem", mr: 2 }} />
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", fontWeight: "bold", color: "#4caf50" }}
        >
          Add a New Address
        </Typography>
      </Box>

    
      {address?.length === 0 ? (
        <Box
         className={styles.emptyAddress}
        >
          <Typography variant="body2" color="text.secondary">
            No Address Added by You.
          </Typography>
        </Box>
      ) : null}

    
      <Grid container spacing={2}>
        {load ? (
          <Box
           className={styles.progress}
          >
            <CircularProgress />
          </Box>
        ) : (
          address?.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
               className={styles.addressTypeBox}
              >
             
                <Chip
                  label={data?.addressType}
                  sx={{
                    backgroundColor:
                      data?.addressType === "Home" ? "#4caf50" : "#2196f3",
                  }}
                  className={styles.ManageAddresseschip}
                  icon={
                    data?.addressType === "Home" ? (
                      <HomeIcon sx={{ color: "#fff" }} />
                    ) : (
                      <WorkIcon sx={{ color: "#fff" }} />
                    )
                  }
                />

              

                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.adressDetails}
                  >
                    {data?.customerName ? (
                      <PersonPinCircle sx={{ fontSize: "1rem", mr: 1 }} />
                    ) : null}
                    {data?.customerName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <LocationOnIcon sx={{ fontSize: "1rem", mr: 1 }} />
                    {data?.address}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <LocationOnIcon sx={{ fontSize: "1rem", mr: 1 }} />
                    {data?.locality}, {data?.city}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    <LocationOnIcon sx={{ fontSize: "1rem", mr: 1 }} />
                    Pincode: {data?.pincode}
                  </Typography>
                </Box>

               
                <Box
                className={styles.ActionButton}
                >
                  <IconButton
                    size="small"
                    sx={{ color: "#1976d2" }}
                   
                  >
                    <EditIcon
                      onClick={(e) =>
                        EditAddress(index, profile?._id, data?._id)
                      }
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#f44336" }}
                   
                  >
                    <DeleteIcon
                      onClick={(e) => DeleteAddress(profile?._id, data?._id)}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      {/* Address Dialog */}
      {openDialog && (
        <AddressDialogFunc
          open={openDialog}
          setOpen={setOpenDialog}
          profileData={address}
          setProfileData={setAddress}
        />
      )}

      {/* Edit Address Dialog */}
      {openEditDialog && (
        <AddressEditDialogFunc
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          profileId={profileId}
          addressId={addressId}
          profileData={addressData}
          AddressData={address}
          setAddressData={setAddress}
        />
      )}

      {/* Delete Address Dialog*/}
      {openDeleteDialog && (
        <AddressDeleteDialogFunc
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          profileId={profileId}
          addressId={addressId}
          setAddressData={setAddress}
        />
      )}
    </Box>
  );
};
