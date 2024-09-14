import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import useAPI, { METHOD } from '../../hooks/useAPI';

const Registeration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [data, error, isLoading, apiCall] = useAPI();
  const navigate = useNavigate();

  // Effect to handle registration response
  useEffect(() => {
    if (data) {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [data, navigate]);

  // Effect to handle errors
  useEffect(() => {
    if (error) {
      setMessage(error);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!firstName || !lastName || !email || !telephone || !password) {
      return setMessage('Please fill in all fields');
    }

    // Call the API method for registration
    await apiCall(METHOD.USER_REGISTER, { firstName, lastName, email, telephone, password });
  };

  const closeModal = () => {
    setMessage('');
  };

  // Display loading state
  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ margin: 'auto' }}>
      <Container maxWidth="xs" className="register-container">
        <Typography variant="h4" className="register-title" gutterBottom>
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Telephone"
            variant="outlined"
            margin="normal"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="register-button"
          >
            Register
          </Button>
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

export default Registeration;
