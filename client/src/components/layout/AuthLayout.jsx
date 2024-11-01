import React from "react";
import { Box, Container } from "@mui/material";
import { useState,useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";

import authUtils from "../../utils/authUtils";
import Loading from "../../common/Loading";
import Assets from "../../assets";

/**
 * AuthLayout component for the authentication pages layout.
 * Displays a loading spinner initially and shows the logo and content once loading is complete.
 *
 * @returns {JSX.Element} The authentication layout with conditional loading.
 */
const AuthLayout = () => {
  const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await authUtils.isAuthenticated();
            if (!isAuthenticated) {
                setLoading(false)
            } else {
                navigate('/')
            }
        }
        checkAuth() 
    } ,[navigate])

    return (
      loading ? ( <Loading fullHeight/>)
      : (
      <Container
          component='main' maxWidth='xs'
          >
      <Box 
          sx={{
              marginTop : 8,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
          }}>
              <img src={Assets.Images.logo} alt="logo" style={{ width: '100px' }} />
              <Outlet />
          </Box>
      </Container>
      )
  );
};

export default AuthLayout;
