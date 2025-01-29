import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { AuthNavbar } from "./AuthNavbar";
import { Box } from "@mui/material";
import { Search } from "./Search";

export const ProtectedRoute = () => {
  const token = Cookies.get("accessToken");

  if (!token) return <Navigate to="/" />;

  return (
    <Box>
      <AuthNavbar />
      <Search />
      <Outlet />
    </Box>
  );
};
