import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Link, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Matching your backend: /signup and /login
    const endpoint = isLogin ? 'login' : 'signup'; 
    try {
      const { data } = await axios.post(`https://technews-cw7v.onrender.com/api/auth/${endpoint}`, formData);
      
      localStorage.setItem('token', data.token);
      // Backend returns user: { username, ... }
      localStorage.setItem('username', data.user.username);
      
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} sx={{ p: 4, mt: 8, border: '1px solid #e0e0e0', borderRadius: 4 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 800, color: '#1976d2', mb: 3 }}>
          {isLogin ? 'Login' : 'Join TechNews'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField fullWidth label="Username" margin="normal" required
              onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
          )}
          <TextField fullWidth label="Email" margin="normal" type="email" required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <TextField fullWidth label="Password" margin="normal" type="password" required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <Button fullWidth variant="contained" size="large" type="submit" sx={{ mt: 3, mb: 2 }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        <Box sx={{ textAlign: 'center' }}>
          <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)} sx={{ fontWeight: 600 }}>
            {isLogin ? "New user? Register here" : "Have an account? Login"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;