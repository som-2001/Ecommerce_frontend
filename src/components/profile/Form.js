import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import styles from "../../styles/profile.module.css";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    gender: yup
      .string()
      .oneOf(["Male", "Female"], "Valid options: Male, Female")
      .required("Gender is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobileNumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  })
  .required();

export const Form = ({ data, setChangeState, changeState, load }) => {
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setValue("name", data?.fullName);
    setValue("email", data?.email);
    setValue("gender", data?.gender);
    setValue("mobileNumber", data?.mobileNumber);
  }, [data, setValue]);

  const onSubmit = async (data) => {
    await axios
      .put(
        `${process.env.REACT_APP_BASEURL}/users/users/${
          jwtDecode(Cookies.get("accessToken")).id
        }`,
        {
          fullName: data?.name,
          email: data?.email,
          gender: data?.gender,
          mobileNumber: data?.mobileNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setValue("name", data?.fullName);
        setValue("email", data?.email);
        setValue("gender", data?.gender);
        setValue("mobileNumber", data?.mobileNumber);
        enqueueSnackbar("profile has been updated", { variant: "success" });

        setChangeState(!changeState);
      })
      .catch((err) => {
        enqueueSnackbar("Failed to update profile", { variant: "error" });
      });
    console.log(data.gender);

    setIsEdit(false);
  };

  return (
    <Box
      className={styles.form}
      sx={{
        width: { xs: "88vw", sm: "77vw" },
      }}
    >
      <Box className={styles.formParent}>
        {!isEdit && (
          <Box className={styles.Editsection}>
            <Button className={styles.editBtn} onClick={(e) => setIsEdit(true)}>
              Edit
            </Button>
          </Box>
        )}

        {isEdit && (
          <Box className={styles.Editsection}>
            <Button
              type="submit"
              className={styles.editBtn}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  placeholder="Your Full Name"
                  slotProps={{
                    input: {
                      readOnly: !isEdit ? true : false,
                    },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  slotProps={{
                    input: {
                      readOnly: !isEdit ? true : false,
                    },
                  }}
                  type="text"
                  placeholder="Your Gender"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  slotProps={{
                    input: {
                      readOnly: !isEdit ? true : false,
                    },
                  }}
                  type="email"
                  placeholder="Your Email"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  slotProps={{
                    input: {
                      readOnly: !isEdit ? true : false,
                    },
                  }}
                  placeholder="Your Phone Number"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
