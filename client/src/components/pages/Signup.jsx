import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * Signup component for user registration.
 * Renders a signup form with fields for username, email, password, and confirm password.
 *
 * @returns {JSX.Element} The signup form.
 */
function Signup() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate signup request
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/login"
        sx={{ textTransform: "none" }}
      >
        Login
      </Button>
    </>
  );
}

export default Signup;
