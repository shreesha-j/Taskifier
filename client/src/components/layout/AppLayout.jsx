import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authUtils from '../../utils/authUtils';
import Loading from '../../common/Loading';
import Sidebar from '../../common/Sidebar';
import { setUser } from '../../redux/features/userSlice';

/**
 * AppLayout component for the main application layout.
 * Displays a loading spinner initially and renders the main content once authentication is verified.
 *
 * @returns {JSX.Element} The main application layout with conditional loading.
 */
const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
