import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './Login.css';
import useAPI, { METHOD } from '../../hooks/useAPI';
import { jwtDecode } from "jwt-decode";

const Login = ({ userState, setUserState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [data, error, isLoading, apiCall] = useAPI();
  const [successfulReg, setSuccessfulReg] = useState(false);
  const navigate = useNavigate();

  // Effect for successful login
  useEffect(() => {
    if (data) {
      setSuccessfulReg(true);
      localStorage.setItem('token', data.token);

      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        if (decodedToken.isAdmin) {
          setUserState('admin'); // If isAdmin = true
        } else {
          setUserState('loggedIn'); // If isAdmin = false
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        setMessage('Error processing login.');
      }

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [data, setUserState, navigate]);

  // Effect for handling errors
  useEffect(() => {
    if (error) {
      setMessage(error);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email || !password) {
      return setMessage("Please enter your email and password");
    }

    // Call the API method for login
    await apiCall(METHOD.USER_LOGIN, { email, password });
  };

  const handleForgotPassword = () => {
    if (email) {
      console.log(`Sending password reset email to ${email}`);
      alert(`Password reset email sent to ${email}`);
    } else {
      alert('Please enter your email address first.');
    }
  };

  const closeModal = () => {
    setMessage('');
  };

  // Display loading state
  if (isLoading) return <div>Loading...</div>;

  // Display successful registration message
  if (successfulReg) {
    return <div className='success-message'>You have successfully logged in</div>;
  }

  return (
    <div style={{ margin: 'auto' }}>
      <Container maxWidth="xs" className="login-container">
        <Typography variant="h4" className="login-title" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputLabelProps={{
              style: { color: 'black' }, // Change color to black
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputLabelProps={{
              style: { color: 'black' }, // Change color to black
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Login
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" >
            <Link href="#" onClick={handleForgotPassword} underline="hover">
              Forgot my password
            </Link>
          </Typography>
        </form>
      </Container>

      {message && (
        <div className="error-popup">
          <div className="error-popup-content">
            <Typography variant="h6">{message}</Typography>
            <Button variant="contained" color="primary" onClick={closeModal}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
