import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthApi from '../../api/authApi';

/**
 * Signup component for user registration.
 * Provides input fields for username, email, password, and confirm password with validation and error handling.
 *
 * @returns {JSX.Element} The signup form.
 */
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [emailErrText, setEmailErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

  /**
   * Handles the form submission for user signup.
   * Validates input fields, calls the signup API, and handles errors.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setEmailErrText('');
    setConfirmPasswordErrText('');

    const data = new FormData(e.currentTarget);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    const email = data.get('email').trim();

    let err = false;

    if (username === '') {
      setUsernameErrText('Username cannot be empty');
      err = true;
    }
    if (password === '') {
      setPasswordErrText('Password cannot be empty');
      err = true;
    }
    if (email === '') {
      setEmailErrText('Email cannot be empty');
      err = true;
    }
    if (confirmPassword === '') {
      setConfirmPasswordErrText('Confirm password cannot be empty');
      err = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrText('Passwords do not match');
      err = true;
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await AuthApi.signup({ email, username, password });
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === 'username') setUsernameErrText(e.msg);
        if (e.param === 'email') setEmailErrText(e.msg);
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
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
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
          error={emailErrText !== ''}
          helperText={emailErrText}
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={confirmPasswordErrText !== ''}
          helperText={confirmPasswordErrText}
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
        sx={{ textTransform: 'none' }}
      >
        Login
      </Button>
    </>
  );
};

export default Signup;
