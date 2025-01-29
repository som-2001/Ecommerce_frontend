import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import styles from "../styles/DrawerFilter.module.css";

export const DrawerFilter = ({
  selectedBrands,
  setSelectedBrands,
  selectedFuelType,
  setSelectedFuelType,
  brands,
  fuelType,
  fromValue,
  toValue,
  fromValueRef,
  toValueRef,
  setFromValue,
  setToValue,
  handleFilterChange,
}) => {
  const input = useRef(null);

  const toggleBrand = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    handleFilterChange(updatedBrands, selectedFuelType);
    setSelectedBrands(updatedBrands);
  };

  const toggleFuelType = (fuel) => {
    const updatedFuelType = selectedFuelType.includes(fuel)
      ? selectedFuelType.filter((f) => f !== fuel)
      : [...selectedFuelType, fuel];

    handleFilterChange(selectedBrands, updatedFuelType);
    setSelectedFuelType(updatedFuelType);
  };

  return (
    <Box className={styles.drawerParent}>
      <Typography variant="h5" className={styles.h5}>
        Filter Bikes
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", mb: 1, color: "#64b5f6" }}
      >
        Price Range
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
      >
        <Grid item xs={6}>
          <TextField
            label="From"
            InputLabelProps={{
              style: { color: "#64b5f6" },
            }}
            value={fromValue}
            onChange={(e) => {
              setFromValue(e.target.value);
              fromValueRef.current = e.target.value;

              if (input.current) {
                clearTimeout(input.current);
              }
              input.current = setTimeout(() => {
                handleFilterChange(selectedBrands, selectedFuelType);
              }, 500);
            }}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="To"
            InputLabelProps={{
              style: { color: "#64b5f6" }, // Label color
            }}
            value={toValue}
            onChange={(e) => {
              toValueRef.current = e.target.value;
              setToValue(e.target.value);

              if (input.current) {
                clearTimeout(input.current);
              }
              input.current = setTimeout(() => {
                handleFilterChange(selectedBrands, selectedFuelType);
              }, 500);
            }}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Brand Filter */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", color: "#64b5f6" }}
      >
        Brand
      </Typography>
      {brands?.map((brand) => (
        <FormControlLabel
          key={brand}
          control={
            <Checkbox
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              sx={{
                color: "#64b5f6",
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "14px",
                color: "#E0E0E0",
                "&:hover": { color: "#64b5f6" },
              }}
            >
              {brand}
            </Typography>
          }
        />
      ))}

      {/* Fuel Type Filter */}
      <Typography variant="subtitle1" className={styles.fuelType}>
        Fuel Type
      </Typography>
      {fuelType.map((fuel) => (
        <FormControlLabel
          key={fuel}
          control={
            <Checkbox
              checked={selectedFuelType.includes(fuel)}
              onChange={() => toggleFuelType(fuel)}
              sx={{
                color: "#64b5f6",
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "14px",
                color: "#E0E0E0",
                "&:hover": { color: "#64b5f6" },
              }}
            >
              {fuel}
            </Typography>
          }
        />
      ))}
    </Box>
  );
};
