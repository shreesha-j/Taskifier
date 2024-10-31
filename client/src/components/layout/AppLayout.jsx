import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Loading from "../../common/Loading";

/**
 * AppLayout component for the main application layout.
 * Displays a loading spinner initially and renders the main content once loading is complete.
 *
 * @returns {JSX.Element} The main application layout with conditional loading.
 */
const AppLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
