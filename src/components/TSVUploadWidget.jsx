import React, { useContext, useRef } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { AppContentContext } from '../context/AppContentProvider';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function TSVUploadWidget() {
  const { selectedBook, selectedBranch, tsvContent, doConvert, setDoConvert, setTsvContent, dcsURL, processingRows } = useContext(AppContentContext);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTsvContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTsvContent(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleFetchFromDcsClick = async () => {
    try {
      const response = await fetch(`${dcsURL}/unfoldingWord/en_tn/raw/branch/${selectedBranch}/tn_${selectedBook.toUpperCase()}.tsv`);
      const text = await response.text();
      setTsvContent(text);
    } catch (err) {
      console.error('Failed to fetch TSV content from DCS:', err);
    }
  }

  return (
    <Box
      sx={{
        border: '1px dashed gray',
        padding: 2,
        textAlign: 'center',
        cursor: 'pointer',
        marginY: 2,
      }}
    >
    <Typography variant="body1">
      <Box
          component="span"
          onClick={handlePasteClick}
          sx={{
            color: 'blue',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <ContentPasteIcon sx={{ marginRight: 0.5 }} />          
          Paste text
        </Box>
        {' '}, {' '}
      <Box
        component="span"
        onClick={handleUploadClick}
        sx={{
          color: 'blue',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
          <UploadFileIcon sx={{ marginRight: 0.5 }} />          
          Upload a TSV file
      </Box>{' '}
      or{' '}
      <Box
        component="span"
        onClick={handleFetchFromDcsClick}
        sx={{
          color: 'blue',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
          <CloudDownloadIcon sx={{ marginRight: 0.5 }} />          
          Fetch <em>tn_{selectedBook.toUpperCase()}.tsv</em> from <em>{selectedBranch}</em>
      </Box>{' '}
      for the Translation Notes TSV content
    </Typography>
    <input
        type="file"
        accept=".tsv,.csv,.rtf,.txt"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <TextField
        multiline
        rows={10}
        variant="outlined"
        fullWidth
        value={tsvContent}
        onChange={(e) => setTsvContent(e.target.value)}
        label="Your Translation Notes TSV content with ULT quotes"
        placeholder="TSV content will appear here..."
        sx={{
          marginTop: 2,
          resize: 'both',
          '& .MuiInputBase-input': {
            whiteSpace: 'nowrap',
            overflowX: 'auto',
          },
        }}
      />
      <Button 
          variant="contained" 
          color="primary"
          onClick={() => selectedBook && tsvContent && setDoConvert(true)}
          disabled={doConvert || !tsvContent || !selectedBook}
        >
          Convert
      </Button>
    </Box>
  );
}

export default TSVUploadWidget;