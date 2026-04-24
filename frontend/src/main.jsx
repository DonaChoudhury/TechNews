// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6200ea', // This matches the vibrant purple in your image
//       light: '#9d46ff',
//       dark: '#0a00b6',
//     },
//     secondary: {
//       main: '#03dac6', // A complementary teal for accents
//     },
//     background: {
//       default: '#ffffff',
//       paper: '#f5f5f5',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: 'none',
//           fontWeight: 600,
//         },
//       },
//     },
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Deep Purple (matches your image)
      light: '#9d46ff',
      dark: '#0a00b6',
    },
    background: {
      // 🎨 This is the "lightish purple" background for the entire site
      default: '#f3e5f5', 
      // A slightly brighter white-purple for cards and containers
      paper: '#ffffff', 
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f3e5f5', // Extra enforcement of the background color
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // Adds a subtle shadow to make white cards pop on light purple bg
          boxShadow: '0 4px 20px rgba(98, 0, 234, 0.1)', 
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline is required to apply the background color to the <body> */}
      <CssBaseline /> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);