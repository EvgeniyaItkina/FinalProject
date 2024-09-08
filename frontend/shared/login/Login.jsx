import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { Navigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

// Примерная функция для проверки пользователя в базе данных
const findUserByEmail = async (email) => {
  // Пока просто пример, в будущем здесь будет запрос к базе данных
  const users = [
    { id: 1, email: "user1@example.com", password: "password123" },
    { id: 2, email: "user2@example.com", password: "qwerty456" }
  ];
  return users.find(user => user.email === email);
};

const Login = ({ userState, setUserState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState({ status: false, path: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    console.log(userState);
    setUserState("registrated")


    if (!email || !password) {
      return setMessage("Please enter your email and password");
    }

    try {
      // Запрос на сервер для логина
      const response = await axios.post('http://localhost:2024/auth/login', { email, password });

      // Сохраняем токен в localStorage
      localStorage.setItem('token', response.data.token);

      // Устанавливаем состояние пользователя как авторизованного
      setUserState("loggedIn");

      // Редирект на другую страницу после успешного входа
      setRedirect({ status: true, path: '/' });

    } catch (error) {
      // Обработка ошибок при логине
      if (error.response) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("Error logging in");
      }
    }
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

  if (redirect.status) {
    return <Navigate to={redirect.path} />;
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
