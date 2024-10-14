import React from 'react';
import { Box } from '@mui/material';
import './App.css';
import TSVUploadWidget from './components/TSVUploadWidget';
import BibleBookSelection from './components/BibleBookSelection';
import { AppContentProvider, AppContentContext } from './context/AppContentProvider';
import BranchSelection from './components/BranchSelection';
import AppHeader from './components/AppHeader';
import ConverterResultsComponent from './components/ConverterResultsComponent';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import the custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContentProvider>
        <CssBaseline />

        <AppHeader />
        <Box sx={{ padding: 2 }}>
          <BibleBookSelection />
          <BranchSelection />
          <TSVUploadWidget />
          <ConverterResultsComponent />
        </Box>
      </AppContentProvider>
    </ThemeProvider>
  );
}

export default App;