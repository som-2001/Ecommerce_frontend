import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../Redux/ProductAdminSlice/ProductSlice";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  engineType: Yup.string().required("Engine Type is required"),
  fuelType: Yup.string().oneOf( ['Petrol', 'Diesel', 'Electric', 'Hybrid'],"Fuel Type must be between 'Petrol', 'Diesel', 'Electric', 'Hybrid'").required("Fuel Type is required"),
  mileage: Yup.number()
    .required("Mileage is required")
    .positive("Mileage must be a positive number")
    .max(100, "Mileage cannot exceed 100 km/l"),
  maxPower: Yup.number()
    .required("Maximum Power is required")
    .positive("Power must be a positive number")
    .max(1000, "Power cannot exceed 1000 bhp"),
  maxTorque: Yup.number()
    .required("Maximum Torque is required")
    .positive("Torque must be a positive number")
    .max(1000, "Torque cannot exceed 1000 Nm"),
  gearbox: Yup.string().required("Gearbox type is required"),
  coolingSystem: Yup.string().required("Cooling System is required"),
  seatHeight: Yup.number()
    .required("Seat Height is required")
    .positive("Seat Height must be a positive number"),
  groundClearance: Yup.number()
    .required("Ground Clearance is required")
    .positive("Ground Clearance must be a positive number"),
  kerbWeight: Yup.number()
    .required("Kerb Weight is required")
    .positive("Kerb Weight must be a positive number"),
});

const Specifications = ({onValidation}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    dispatch(addProduct(data));
    onValidation(true)
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Engine Type */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="engineType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Engine Type"
                fullWidth
                error={!!errors.engineType}
                helperText={errors.engineType?.message}
              />
            )}
          />
        </Grid>

        {/* Fuel Type */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="fuelType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Fuel Type"
                fullWidth
                error={!!errors.fuelType}
                helperText={errors.fuelType?.message}
              />
            )}
          />
        </Grid>

        {/* Mileage */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="mileage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mileage (km/l)"
                fullWidth
                type="number"
                error={!!errors.mileage}
                helperText={errors.mileage?.message}
              />
            )}
          />
        </Grid>

        {/* Maximum Power */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="maxPower"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Maximum Power (bhp)"
                fullWidth
                type="number"
                error={!!errors.maxPower}
                helperText={errors.maxPower?.message}
              />
            )}
          />
        </Grid>

        {/* Maximum Torque */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="maxTorque"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Maximum Torque (Nm)"
                fullWidth
                type="number"
                error={!!errors.maxTorque}
                helperText={errors.maxTorque?.message}
              />
            )}
          />
        </Grid>

        {/* Gearbox */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="gearbox"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Gearbox"
                fullWidth
                error={!!errors.gearbox}
                helperText={errors.gearbox?.message}
              />
            )}
          />
        </Grid>

        {/* Cooling System */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="coolingSystem"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cooling System"
                fullWidth
                error={!!errors.coolingSystem}
                helperText={errors.coolingSystem?.message}
              />
            )}
          />
        </Grid>

        {/* Seat Height */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="seatHeight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seat Height (mm)"
                fullWidth
                type="number"
                error={!!errors.seatHeight}
                helperText={errors.seatHeight?.message}
              />
            )}
          />
        </Grid>

        {/* Ground Clearance */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="groundClearance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ground Clearance (mm)"
                fullWidth
                type="number"
                error={!!errors.groundClearance}
                helperText={errors.groundClearance?.message}
              />
            )}
          />
        </Grid>

        {/* Kerb Weight */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="kerbWeight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Kerb Weight (kg)"
                fullWidth
                type="number"
                error={!!errors.kerbWeight}
                helperText={errors.kerbWeight?.message}
              />
            )}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: 2,
                borderRadius: 2,
                width: "180px",
                backgroundColor: "black",
                color: "white",
              }}
            >
             Save & Continue
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Specifications;
