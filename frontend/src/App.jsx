import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// Components aur Pages import kar rahe hain
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Router>
      {/* Box layout ko poori screen height dene ke liye */}
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        
        {/* Navbar hamesha top par rahega */}
        <Navbar />

        {/* Saara main content is Container ke andar aayega */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            {/* Default Page: Home */}
            <Route path="/" element={<Home />} />
            
            {/* Login & Signup Page */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Page: Bookmarks (Sirf login ke baad) */}
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </Container>

        {/* Notifications ke liye Toast provider */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Router>
  );
}

export default App;