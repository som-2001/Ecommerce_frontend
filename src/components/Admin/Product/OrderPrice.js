import React, { useEffect } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { EditProduct } from '../../../Redux/ProductAdminSlice/ProductSlice';
import styles from "../../../styles/BasicDetails.module.css";

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  originalPrice: Yup.number()
    .required('Original Price is required')
    .positive('Original Price must be a positive number'),
  offerPrice: Yup.number()
    .required('Offer Price is required')
    .positive('Offer Price must be a positive number')
    .lessThan(Yup.ref('originalPrice'), 'Offer Price must be less than Original Price'),
  discount: Yup.number()
    .required('Discount is required')
    .positive('Discount must be a positive number')
    .max(100, 'Discount cannot exceed 100%')
    .test('discount-limit', 'Discount cannot exceed Original Price', function(value) {
      const { originalPrice } = this.parent;
      return value <= originalPrice;
    }),
});

const OrderPrice = ({product}) => {
  const { control, handleSubmit,setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch=useDispatch();

  useEffect(()=>{
    if(product){
      setValue('originalPrice', product?.originalPrice || '');
      setValue('offerPrice', product?.offerPrice || '');
      setValue('discount', product?.discount || '');
      dispatch(EditProduct({originalPrice: product?.originalPrice,offerPrice: product?.offerPrice,discount: product?.discount}));
    }
  },[product,setValue,dispatch])

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    dispatch(EditProduct(data));
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>

        {/* Original Price */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="originalPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Original Price"
                focused
                fullWidth
                type="number"
                error={!!errors.originalPrice}
                helperText={errors.originalPrice?.message}
              />
            )}
          />
        </Grid>

        {/* Offer Price */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="offerPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Offer Price"
                fullWidth
                focused
                type="number"
                error={!!errors.offerPrice}
                helperText={errors.offerPrice?.message}
              />
            )}
          />
        </Grid>

        {/* Discount */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Discount (%)"
                fullWidth
                focused
                type="number"
                error={!!errors.discount}
                helperText={errors.discount?.message}
              />
            )}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
        <Box className={styles.center}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
          >
           Save & Continue
          </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderPrice;
