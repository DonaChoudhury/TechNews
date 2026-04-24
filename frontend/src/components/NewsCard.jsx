import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const NewsCard = ({ article, onSummarize, onBookmark }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '12px', border: '1px solid #eee', transition: '0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}>
      <CardMedia
        component="img"
        height="180"
        image={article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={article.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {article.source_name || 'Tech News'}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 700, lineHeight: 1.3, fontSize: '1.1rem' }}>
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrientation: 'vertical', overflow: 'hidden' }}>
          {article.description}
        </Typography>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
        <Button 
          fullWidth 
          size="small" 
          variant="outlined" 
          startIcon={<AutoAwesomeIcon />}
          onClick={() => onSummarize(article)}
          sx={{ borderRadius: '6px', textTransform: 'none' }}
        >
          AI Summary
        </Button>
        <Button 
          size="small" 
          variant="soft" 
          color="primary"
          onClick={() => onBookmark(article)}
          sx={{ minWidth: '40px', bgcolor: '#e3f2fd' }}
        >
          <BookmarkAddIcon fontSize="small" />
        </Button>
      </Box>
    </Card>
  );
};

export default NewsCard;