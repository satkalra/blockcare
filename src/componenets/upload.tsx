import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const UploadDataBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const UploadDataComponent: React.FC = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log('Selected File:', selectedFile);
    }
  };

  

  return (
    <UploadDataBox elevation={3}>
      <Typography variant="h6" gutterBottom>
        Upload Data
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Please choose your health records file. This file be encrypted and uploaded to blockchain 
      </Typography>
      <input
        type="file"
        // id="file-input"  // Add id attribute to match the htmlFor attribute in the label
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Choose File
        </Button>
      </label>
    </UploadDataBox>
  );
};

export default UploadDataComponent;
