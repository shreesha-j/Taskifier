import React from "react";
import { Box } from "@mui/material";
import { useState,useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authUtils from "../../utils/authUtils";
import Loading from "../../common/Loading";
import { setUser } from "../../redux/features/userSlice";

/**
 * AppLayout component for the main application layout.
 * Displays a loading spinner initially and renders the main content once loading is complete.
 *
 * @returns {JSX.Element} The main application layout with conditional loading.
 */
const AppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        const User = await authUtils.isAuthenticated();
        if (!User) {
            navigate('/login')
        } else {
            dispatch(setUser(User))
            setLoading(false)
        }
    }
    checkAuth()
} ,[navigate])

return (
  loading ? ( <Loading fullHeight/>)
  : (

<Box sx={{
  display: 'flex',
  }}>
  <Sidebar />
  <Box sx={{
      flexGrow:1,
      p:1,
      width:'max-content'
  }}>
  <Outlet />
  </Box>
</Box>
)
);
};

export default AppLayout;
