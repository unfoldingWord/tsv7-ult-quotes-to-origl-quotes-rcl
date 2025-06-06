import React, { useContext } from 'react';
import { AppContentContext } from '../context/AppContentProvider.jsx';
import Typography from '@mui/material/Typography';

const AppHeader = () => {
  const { server } = useContext(AppContentContext);

  return (
    <Typography variant="h4" sx={{ backgroundColor: '#38ADDF', color: '#FFF', padding: 1, textAlign: 'center' }}>
      TSV TN Cleanup App{server != 'PROD' ? ` (${server})` : ''}
    </Typography>
  );
};

export default AppHeader;
