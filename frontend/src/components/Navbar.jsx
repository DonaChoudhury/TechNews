import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    if (token && name) setUser({ username: name });
    else setUser(null);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#e1bee7', 
    borderBottom: '1px solid rgba(98, 0, 234, 0.1)', 
    color: 'primary.main',
    // Optional: add a slight blur for a modern feel
    backdropFilter: 'blur(10px)', }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component={Link} to="/" sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none' }}>
            DevNews
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 600 }}>Home</Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/bookmarks" startIcon={<BookmarkBorderIcon />}>Saved</Button>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 35, height: 35 }}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <MenuItem disabled sx={{ fontWeight: 'bold' }}>{user.username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;