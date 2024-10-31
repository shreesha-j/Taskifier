import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

/**
 * Login component for user login.
 * Renders a login form with username and password fields, a submit button, and a link to signup.
 *
 * @returns {JSX.Element} The login form.
 */
function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login request
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
          autoFocus
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          type="submit"
          color="success"
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/signup"
        sx={{ textTransform: "none" }}
      >
        Signup
      </Button>
    </>
  );
}

export default Login;
