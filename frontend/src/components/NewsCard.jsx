// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

// const NewsCard = ({ article, onSummarize, onBookmark }) => {
//   return (
//     <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '12px', border: '1px solid #eee', transition: '0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}>
//       <CardMedia
//         component="img"
//         height="180"
//         image={article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
//         alt={article.title}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
//           {article.source_name || 'Tech News'}
//         </Typography>
//         <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 700, lineHeight: 1.3, fontSize: '1.1rem' }}>
//           {article.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrientation: 'vertical', overflow: 'hidden' }}>
//           {article.description}
//         </Typography>
//       </CardContent>
      
//       <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
//         <Button 
//           fullWidth 
//           size="small" 
//           variant="outlined" 
//           startIcon={<AutoAwesomeIcon />}
//           onClick={() => onSummarize(article)}
//           sx={{ borderRadius: '6px', textTransform: 'none' }}
//         >
//           AI Summary
//         </Button>
//         <Button 
//           size="small" 
//           variant="soft" 
//           color="primary"
//           onClick={() => onBookmark(article)}
//           sx={{ minWidth: '40px', bgcolor: '#e3f2fd' }}
//         >
//           <BookmarkAddIcon fontSize="small" />
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default NewsCard;



import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box, IconButton, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const NewsCard = ({ article, onSummarize, onBookmark }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      
      <CardMedia
        component="img"
        height="180"
        image={article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={article.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="caption" sx={{ color: 'primary', fontWeight: 700, textTransform: 'uppercase', mb: 1, display: 'block' }}>
          {article.source_name || 'Tech News'}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>
          {article.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {article.description?.substring(0, 120)}...
        </Typography>
      </CardContent>

      <CardActions sx={{ flexDirection: 'column', gap: 1, p: 2 }}>
        {/* Row 1: Read Full Article & AI Summary */}
        <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
          {/* 👇 YEH RAHA ARTICLE LINK BUTTON */}
          <Button 
            fullWidth
            variant="contained" 
            size="small" 
            href={article.url} 
            target="_blank" // New tab mein kholne ke liye
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Read Article
          </Button>

          <Button 
            fullWidth
            variant="outlined" 
            size="small" 
            startIcon={<AutoAwesomeIcon />}
            onClick={() => onSummarize(article)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            AI Summary
          </Button>
        </Box>

        {/* Row 2: Bookmark Option */}
        <Button 
          fullWidth
          variant="text"
          startIcon={<BookmarkAddIcon />}
          onClick={() => onBookmark(article)}
          sx={{ textTransform: 'none', color: '#666' }}
        >
          Save for Later
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;