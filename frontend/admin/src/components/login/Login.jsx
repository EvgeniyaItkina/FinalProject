import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Логика для отправки данных на сервер
  };

  const handleForgotPassword = () => {
    if (email) {
      // Здесь логика для отправки письма для восстановления пароля
      console.log(`Sending password reset email to ${email}`);
      alert(`Password reset email sent to ${email}`);
    } else {
      alert('Please enter your email address first.');
    }
  }

  return (
    <div className="wave-container">
      <Container maxWidth="false" className="login-container">
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
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '8px' }}>
            <Link href="#" onClick={handleForgotPassword} underline="hover">
              Forgot my password
            </Link>
          </Typography>

        </form>
      </Container>
    </div>
  );
};

export default Login;
