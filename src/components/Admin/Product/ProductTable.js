import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import BasicMenu from "./BasicMenu";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { resetProduct } from "../../../Redux/ProductAdminSlice/ProductSlice";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [bikes, setBikes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt"); 
  const [search, setSearch] = useState(""); 
  const [load, setLoad] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/products/products`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          sortBy: orderBy,
          sortOrder: order,
        },
        withCredentials: true,
      })
      .then((res) => {
        const { products, total } = res.data;
        setLoad(false);
        setBikes(products);
        setTotal(total);
        dispatch(resetProduct());
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Error fetching products", { variant: "error" });
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, order, orderBy, search]);

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleToggle = (productId, field) => {
    
    var Exactfield=bikes.filter(bike=>bike._id===productId);
    const payload = {
      [field]: !Exactfield?.[0]?.[field],  
    };

    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/products/products/status/${productId}`,
        payload,
        { withCredentials: true }
      )
      .then((res) => {
        enqueueSnackbar(res.data?.message, { variant: "success" });
        setBikes((prevBikes) =>
          prevBikes.map((bike) =>
            bike._id === productId ? { ...bike, [field]: !bike[field] } : bike
          )
        );
      })
      .catch((err) => {
        enqueueSnackbar(
          err.response?.data?.message || "Error updating product",
          {
            variant: "error",
          }
        );
      });
  };

  const columns = [
    { id: "image", label: "Bike Image", sortable: false },
    { id: "productName", label: "Bike Name", sortable: true },
    { id: "brand", label: "Brand", sortable: true },
    { id: "engineCapacity", label: "Engine Capacity", sortable: true },
    { id: "mileage", label: "Mileage", sortable: true },
    { id: "offerPrice", label: "Price(₹)", sortable: true },
    { id: "isNewArrival", label: "New Arrival", sortable: false },
    { id: "isBestSeller", label: "Best Seller", sortable: false },
    { id: "isFeatureProduct", label: "Feature Products", sortable: false },
    { id: "action", label: "Action", sortable: false },
  ];

  return (
    load ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "70vw",
          height: "50vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    ) : 
    <Paper>
      <TextField
        placeholder="Search Bikes By Name..."
        variant="outlined"
        sx={{ ml: 2, width: "350px" }}
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center">
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike._id}>
                <TableCell align="center">
                  <img
                    src={`${bike.image?.[0]}`}
                    alt={bike.name}
                    width="70"
                    onClick={(e) =>
                      navigate(
                        `/view-product/${bike?._id}/${bike?.modelNumber}`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell align="center">{bike.productName}</TableCell>
                <TableCell align="center">{bike.brand}</TableCell>
                <TableCell align="center">{bike.engineCapacity}</TableCell>
                <TableCell align="center">{bike.mileage}</TableCell>
                <TableCell align="center">{bike.originalPrice}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={bike?.isNewArrival}
                    onChange={() => handleToggle(bike._id, "isNewArrival")}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={bike?.isBestSeller}
                    onChange={() => handleToggle(bike._id, "isBestSeller")}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={bike?.isFeatureProduct}
                    onChange={() => handleToggle(bike._id, "isFeatureProduct")}
                  />
                </TableCell>
                <TableCell align="center">
                  <BasicMenu id={bike._id} setBikes={setBikes} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
    
  );
};

export default ProductTable;
