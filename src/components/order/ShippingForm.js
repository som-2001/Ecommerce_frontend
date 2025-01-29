import { Box, Grid, Typography, Radio, FormControlLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setShippingDate } from "../../Redux/ProductAdminSlice/ProductSlice";
import dayjs from "dayjs";

import styles from "../../styles/Order.module.css";

export const ShippingForm = ({ handlefunction1 }) => {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);
  const deliveryDate = dayjs().add(7, "day");
  const fastDeliveryDate = dayjs().add(6, "day");

  const handleSelection = (method) => {
    console.log(fastDeliveryDate);

    setSelectedMethod(method);
    handlefunction1(false);
    if (method === "Free") {
      dispatch(setShippingDate({ method: method, deliveryDate: deliveryDate }));
    } else if (method === "8") {
      dispatch(
        setShippingDate({ method: method, deliveryDate: fastDeliveryDate })
      );
    } else {
      dispatch(
        setShippingDate({ method: method, deliveryDate: scheduledDate })
      );
    }

    if (method !== "Schedule") {
      setScheduledDate(null);
    }
    if (method === "Schedule" && scheduledDate !== null) {
      handlefunction1(true);
    } else if (method !== "Schedule") handlefunction1(true);
  };

  return (
    <Box sx={{ width: { xs: "82vw", sm: "90vw", md: "60vw" } }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Shipment Method (3)
      </Typography>

      <Box
        sx={{ border: "1px solid #dfdfdf", padding: 4, my: 2 }}
        onClick={() => handleSelection("Free")}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={2}
            className={styles.shipmentRow}
          >
            <FormControlLabel
              control={<Radio checked={selectedMethod === "Free"} />}
              label=""
            />
            <Typography variant="body1">Free</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={styles.shipmentCenter}>
            <Typography variant="body1">Regular Shipment Method</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={6}
            className={styles.shipmentCenter}
            sx={{
              alignItems: { xs: "start", md: "center" },
            }}
          >
            <Typography variant="body1">
              Will be delivered on {deliveryDate.format("DD MMM, YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ border: "1px solid #dfdfdf", padding: 4, my: 2 }}
        onClick={() => handleSelection("8")}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={2}
            className={styles.shipmentRow}
          >
            <FormControlLabel
              control={<Radio checked={selectedMethod === "8"} />}
              label=""
            />
            <Typography variant="body1">₹8</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={styles.shipmentCenter}>
            <Typography variant="body1">
              Get your delivery as soon as possible
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={6}
            className={styles.shipmentCenter}
            sx={{
              alignItems: { xs: "start", md: "center" },
            }}
          >
            <Typography variant="body1">
              Will be delivered on {fastDeliveryDate.format("DD MMM, YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ border: "1px solid #dfdfdf", padding: 4, my: 2 }}
        onClick={() => handleSelection("Schedule")}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={2}
            className={styles.shipmentRow}
          >
            <FormControlLabel
              control={<Radio checked={selectedMethod === "Schedule"} />}
              label=""
            />
            <Typography variant="body1">Schedule</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={styles.shipmentCenter}>
            <Typography variant="body1">
              Pick a date when you want to get your delivery
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={6}
            className={styles.shipmentCenter}
            sx={{
              alignItems: { xs: "start", md: "center" },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={scheduledDate}
                onChange={(date) => {
                  setScheduledDate(date);
                  handleSelection("Schedule");
                }}
                minDate={dayjs().add(7, "day")}
                disabled={selectedMethod !== "Schedule"}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
