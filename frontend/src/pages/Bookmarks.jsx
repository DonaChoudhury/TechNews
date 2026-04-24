import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const [savedNews, setSavedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem('token');
      
      // Agar token nahi hai, toh login par bhejo
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedNews(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [navigate]);

  if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>My Saved Stories</Typography>
      {savedNews.length === 0 ? (
        <Typography color="text.secondary">Aapne abhi tak koi article save nahi kiya.</Typography>
      ) : (
        <Grid container spacing={3}>
          {savedNews.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <NewsCard 
                article={{
                  title: item.title,
                  image_url: item.image_url,
                  source_name: item.source_name,
                  url: item.link,
                  description: "" // Bookmarks table mein description optional ho sakta hai
                }}
                onSummarize={() => {}} // Yahan AI functionality disable rakhi hai
                onBookmark={() => {}} // Yahan delete logic daal sakte hain
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Bookmarks;