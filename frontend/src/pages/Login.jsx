import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Link, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);
      
      // ✅ CRITICAL FIX: Save both token AND username
      localStorage.setItem('token', data.token);
      
      // Check if your backend sends it as data.user.username or just data.username
      const displayName = data.user?.username || data.username || formData.username;
      localStorage.setItem('username', displayName);
      
      toast.success(isLogin ? 'Welcome back!' : 'Account Created!');
      
      // Redirect to home - this will trigger the Navbar's useEffect
      navigate('/'); 
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={0} sx={{ p: 4, mt: 8, border: '1px solid #e0e0e0', borderRadius: 4 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 800, color: '#1976d2', mb: 1 }}>
          {isLogin ? 'Login' : 'Create Account'}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          {isLogin ? 'Enter your credentials to continue' : 'Sign up to start saving tech news'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth label="Username" margin="normal" required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          )}
          <TextField
            fullWidth label="Email Address" margin="normal" type="email" required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            fullWidth label="Password" margin="normal" type="password" required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button
            fullWidth variant="contained" size="large" type="submit"
            sx={{ mt: 3, mb: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Link
            component="button" variant="body2"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ username: '', email: '', password: '' });
            }}
            sx={{ textDecoration: 'none', fontWeight: 600 }}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;