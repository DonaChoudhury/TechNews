import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');
    if (token && name) {
      setUser({ username: name });
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setAnchorEl(null);
    navigate('/login');
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', color: '#333' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
            <NewspaperIcon sx={{ color: '#1976d2', fontSize: 30 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1976d2', letterSpacing: '-0.5px' }}>
              DevNews
            </Typography>
          </Box>

          {/* Nav */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            
            {/* Home */}
            <Button 
              component={Link} 
              to="/" 
              sx={{ fontWeight: 600, color: location.pathname === '/' ? '#1976d2' : '#666', textTransform: 'none' }}
            >
              Home
            </Button>
            
            {user ? (
              <>
                {/* 🔖 Bookmark Icon */}
                <Tooltip title="Saved Articles">
                  <IconButton 
                    component={Link} 
                    to="/bookmarks"
                    sx={{ 
                      color: location.pathname === '/bookmarks' ? '#1976d2' : '#666'
                    }}
                  >
                    {location.pathname === '/bookmarks' 
                      ? <BookmarkIcon /> 
                      : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>

                {/* 👤 Avatar */}
                <Tooltip title="Account Settings">
                  <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 35, height: 35, fontSize: '1rem', fontWeight: 'bold' }}>
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                {/* Dropdown */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { mt: 1, width: 150, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }}
                >
                  <MenuItem disabled sx={{ fontWeight: 'bold', color: '#333 !important', opacity: '1 !important' }}>
                    Hi, {user.username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained" 
                disableElevation
                onClick={() => navigate('/login')}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, px: 3 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;