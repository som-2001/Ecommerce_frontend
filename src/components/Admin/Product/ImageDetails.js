import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  selectedColor: Yup.string().required("Color is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .positive("Stock must be greater than 0")
    .required("Stock is required"),
  files: Yup.array()
    .min(1, "Please upload at least one image")
    .max(4, "At most 4 images will be supported")
    .required("Images are required"),
});

function ImageDetails({ item }) {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      selectedColor: "",
      stock: "",
      files: [],
    },
  });

  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [stock, setStock] = useState("");
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    if (item) {
      setSelectedColor(item.selectedColor || "");
      setStock(item.stock || "");
      setExistingFiles(item.image || []);
      setValue("selectedColor", item.selectedColor);
      setValue("stock", item.stock);
      setValue("files", item.image || []);
    }
  }, [item, setValue]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const combinedFiles = [...files, ...selectedFiles];

    if (combinedFiles.length + existingFiles.length > 4) {
      enqueueSnackbar("At most 4 images are supported.", { variant: "warning" });
      return;
    }

    setFiles(combinedFiles);
    setValue("files", [...combinedFiles, ...existingFiles]);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setValue("files", [...updatedFiles, ...existingFiles]);
  };

  const handleDeleteExistingFile = (index) => {
    const updatedExistingFiles = [...existingFiles];
    updatedExistingFiles.splice(index, 1);
    setExistingFiles(updatedExistingFiles);
    setValue("files", [...files, ...updatedExistingFiles]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append product-level fields
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    // Append files
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Append existing files (URLs)
    existingFiles.forEach((fileUrl) => {
      formData.append("existingImages", fileUrl);
    });

    // Append color and stock
    formData.append("selectedColor", selectedColor);
    formData.append("stock", stock);

    axios
      .put(`${process.env.REACT_APP_BASEURL}/products/products/${id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        enqueueSnackbar("Product updated successfully!", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Product update failed. Try again.", { variant: "error" });
      });
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
        Color and Image Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Color Selection */}
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="selectedColor"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  displayEmpty
                  error={!!errors.selectedColor}
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedColor(e.target.value);
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a color
                  </MenuItem>
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Yellow">Yellow</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                </Select>
              )}
            />
            {errors.selectedColor && (
              <Typography color="error">{errors.selectedColor.message}</Typography>
            )}
          </Grid>

          {/* Stock Input */}
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  fullWidth
                  error={!!errors.stock}
                  placeholder="Enter stock quantity"
                  onChange={(e) => {
                    field.onChange(e);
                    setStock(e.target.value);
                  }}
                />
              )}
            />
            {errors.stock && (
              <Typography color="error">{errors.stock.message}</Typography>
            )}
          </Grid>

          {/* File Upload */}
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" component="label">
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {errors.files && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.files.message}
              </Typography>
            )}
          </Grid>

          {/* Selected Images */}
          <Grid item xs={12}>
            <Typography variant="body2">Selected Images:</Typography>
            <Grid container spacing={2}>
              {files.map((file, index) => (
                <Grid item xs={3} key={index}>
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                    <IconButton
                      onClick={() => handleDeleteFile(index)}
                      sx={{ position: "absolute", top: 5, right: 5 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
              {existingFiles.map((fileUrl, index) => (
                <Grid item xs={3} key={index}>
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={fileUrl}
                      alt="Existing"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                    <IconButton
                      onClick={() => handleDeleteExistingFile(index)}
                      sx={{ position: "absolute", top: 5, right: 5 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ImageDetails;
