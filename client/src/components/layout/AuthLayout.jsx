import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Loading from "../../common/Loading";
import Assets from "../../assets";

/**
 * AuthLayout component for the authentication pages layout.
 * Displays a loading spinner initially and shows the logo and content once loading is complete.
 *
 * @returns {JSX.Element} The authentication layout with conditional loading.
 */
const AuthLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={Assets.Images.logo} alt="logo" style={{ width: "100px" }} />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
