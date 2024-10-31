import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthApi from '../../api/authApi';

/**
 * Login component for user authentication.
 * Provides input fields for username and password with validation and error handling.
 *
 * @returns {JSX.Element} The login form.
 */
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');

  /**
   * Handles the form submission for user login.
   * Validates input fields, calls the login API, and handles errors.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let err = false;

    if (username === '') {
      setUsernameErrText('Username cannot be empty');
      err = true;
    }
    if (password === '') {
      setPasswordErrText('Password cannot be empty');
      err = true;
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await AuthApi.login({ username, password });
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === 'username') setUsernameErrText(e.msg);
        if (e.param === 'password') setPasswordErrText(e.msg);
      });
    } finally {
      setLoading(false);
    }
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
          autoFocus
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
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
          error={passwordErrText !== ''}
          helperText={passwordErrText}
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
        sx={{ textTransform: 'none' }}
      >
        Signup
      </Button>
    </>
  );
};

export default Login;
