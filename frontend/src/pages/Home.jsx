// import React, { useState, useEffect } from 'react';
// import { Grid, Typography, Box, Tabs, Tab, CircularProgress, Modal, Button, Container } from '@mui/material';
// import axios from 'axios';
// import NewsCard from '../components/NewsCard';

// const Home = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [category, setCategory] = useState('AI');
//   const [summary, setSummary] = useState('');
//   const [open, setOpen] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);

//   const categories = ['AI', 'Cloud', 'Cybersecurity', 'Web3', 'Data Science'];

//   const fetchNews = async (cat) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/news/${cat.toLowerCase()}`);
//       setNews(response.data.articles || response.data);
//     } catch (err) { console.error("Fetch Error:", err); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchNews(category); }, [category]);

//   const handleSummarize = async (article) => {
//     setOpen(true); setAiLoading(true); setSummary('');
//     try {
//       const res = await axios.post('http://localhost:5000/api/ai/summarize', { 
//         articleText: `${article.title}. ${article.description}` 
//       });
//       setSummary(res.data.summary);
//     } catch (err) { setSummary("AI Summary failed. Check your Gemini API Key."); }
//     finally { setAiLoading(false); }
//   };

//   const handleBookmark = async (article) => {
//     const token = localStorage.getItem('token');
//     if (!token) return alert("Please Login to save articles!");
//     try {
//       await axios.post('http://localhost:5000/api/bookmarks', {
//         article_id: article.title,
//         title: article.title,
//         link: article.url,
//         image_url: article.image_url,
//         source_name: article.source_name
//       }, { headers: { Authorization: `Bearer ${token}` } });
//       alert("Saved to Bookmarks!");
//     } catch (err) { alert("Failed to save."); }
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//         <Tabs value={category} onChange={(e, v) => setCategory(v)} textColor="primary" indicatorColor="primary">
//           {categories.map(c => <Tab key={c} label={c} value={c} sx={{ fontWeight: 'bold' }} />)}
//         </Tabs>
//       </Box>

//       {loading ? <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} /> : (
//         <Grid container spacing={3}>
//           {news.map((item, i) => (
//             <Grid item xs={12} sm={6} md={4} key={i}>
//               <NewsCard 
//                 article={{
//                   title: item.title,
//                   description: item.description,
//                   image_url: item.urlToImage || item.image_url,
//                   source_name: item.source?.name || item.source_name,
//                   url: item.url || item.link
//                 }} 
//                 onSummarize={handleSummarize}
//                 onBookmark={handleBookmark}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>AI Summary</Typography>
//           {aiLoading ? <CircularProgress size={24} /> : <Typography variant="body1">{summary}</Typography>}
//           <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setOpen(false)}>Close</Button>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { 
  Grid, Typography, Box, Tabs, Tab, CircularProgress, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Container, Slide, Divider 
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

// Smooth slide-up transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      const response = await axios.get(`https://technews-cw7v.onrender.com/api/news/${cat.toLowerCase()}`);
      setNews(response.data.articles || response.data);
    } catch (err) { console.error("Fetch Error:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNews(category); }, [category]);

  const handleSummarize = async (article) => {
    setOpen(true); 
    setAiLoading(true); 
    setSummary('');
    try {
      const res = await axios.post('https://technews-cw7v.onrender.com/api/ai/summarize', { 
        articleText: `${article.title}. ${article.description}` 
      });
      setSummary(res.data.summary);
    } catch (err) { 
      setSummary("AI Summary failed. Please check your API Key and server connection."); 
    }
    finally { setAiLoading(false); }
  };

  const handleBookmark = async (article) => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Please Login to save articles!");
    try {
      await axios.post('https://technews-cw7v.onrender.com/api/bookmarks', {
        article_id: article.title,
        title: article.title,
        link: article.url,
        image_url: article.image_url,
        source_name: article.source_name
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Saved to Bookmarks!");
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

      {/* --- REVISED ATTRACTIVE AI SUMMARY DIALOG --- */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { borderRadius: 4, padding: 1, maxWidth: '500px' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, color: '#1976d2' }}>
          <AutoAwesomeIcon /> AI Insights
        </DialogTitle>
        
        <Divider variant="middle" />

        <DialogContent sx={{ mt: 1 }}>
          {aiLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
              <CircularProgress size={40} thickness={4} />
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Analyzing the article for key points...
              </Typography>
            </Box>
          ) : (
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.8, 
                color: '#333',
                whiteSpace: 'pre-line', // Preserves the line breaks from Gemini
                fontWeight: 500 
              }}
            >
              {summary}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setOpen(false)}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, py: 1 }}
          >
            Great, Thanks!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;