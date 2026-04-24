import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Tabs, Tab, CircularProgress, Modal, Button, Container } from '@mui/material';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('AI');
  const [summary, setSummary] = useState('');
  const [open, setOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const categories = ['AI', 'Cloud', 'Cybersecurity', 'Web3', 'Data Science'];

  const fetchNews = async (cat) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${cat.toLowerCase()}`);
      setNews(response.data.articles || response.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNews(category); }, [category]);

  const handleSummarize = async (article) => {
    setOpen(true); setAiLoading(true); setSummary('');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/summarize', { 
        articleText: article.description || article.title 
      });
      setSummary(res.data.summary);
    } catch (err) { setSummary("AI Summary failed."); }
    finally { setAiLoading(false); }
  };

  const handleBookmark = async (article) => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Please Login!");
    try {
      await axios.post('http://localhost:5000/api/bookmarks', {
        article_id: article.title,
        title: article.title,
        link: article.url,
        image_url: article.image_url,
        source_name: article.source_name
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Article Saved!");
    } catch (err) { alert("Failed to save."); }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={category} onChange={(e, v) => setCategory(v)} textColor="primary" indicatorColor="primary">
          {categories.map(c => <Tab key={c} label={c} value={c} sx={{ fontWeight: 'bold' }} />)}
        </Tabs>
      </Box>

      {loading ? <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} /> : (
        <Grid container spacing={3}>
          {news.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <NewsCard 
                article={{
                  title: item.title,
                  description: item.description,
                  image_url: item.urlToImage || item.image_url,
                  source_name: item.source?.name || item.source_name,
                  url: item.url || item.link
                }} 
                onSummarize={handleSummarize}
                onBookmark={handleBookmark}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>AI Summary</Typography>
          {aiLoading ? <CircularProgress size={24} /> : <Typography variant="body1">{summary}</Typography>}
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;