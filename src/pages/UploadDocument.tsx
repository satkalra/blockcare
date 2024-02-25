import React, { useState } from 'react';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';

const UploadDataBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const UploadDocument: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const resetUploadStatus = () => {
    // Reset the upload status to allow the user to try again
    setUploading(false);
    setUploadSuccess(false);
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    console.log('fileeeeee',file)
  }
  

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
  

    // Read the file as a buffer
    const fileBuffer = await file.arrayBuffer();

    // Convert buffer to hex
    const fileHex = Array.from(new Uint8Array(fileBuffer))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    console.log(fileHex)

    // Your API endpoint
    const apiUrl = 'https://gwu-aditya.engine-usw2.thirdweb.com/backend-wallet/sepolia/send-transaction?simulateTx=false';

    // Your authorization token
    const authToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDAxNjc1N2REZjJBYjZhOTk4YTQ3MjlBODBhMDkxMzA4ZDkwNTlFMTciLCJzdWIiOiIweDExMzI3QjM1NjQzQjFCNjlBNTc2OUJkQzE2NUM5ZTBmYjQzNjlhQ2EiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjE3MDkwNjczMjIsIm5iZiI6MTcwODgwODEyMiwiaWF0IjoxNzA4ODA4MTIyLCJqdGkiOiJiNGRhOWVkYy03Y2RkLTRjYWEtYWEzNS1mZTc4NGE0MzU4ZDEifQ.MHhhNDg5MTY4Mzk1YmMyYTNlNGY2MWFmZTgzMjQ5N2ExMDczNDgzNjAzNTJjYzlmZTA0ZmU0Mjg0OGVjMGZjNWVkMGEyZGMwZTRhMGNjZjNlMDM1ZTA2ZjdiYmRjNDE5ZDllM2IzZWI0OWMxZGE4ODQzNzM3NmQyMmIyYzljZDI4MjFj';

    // Your payload
    const payload = {
      toAddress: '0x87e4B3AcbB51D2F0c0058fd7B204baDD7DF0f112',
      data: `0x${fileHex}`,
      value: '0x00',
    };

    // Your headers
    const headers = {
      accept: 'application/json',
      'x-backend-wallet-address': '0x7608d8fE59AEDc62281058320CeFF1c9EFF4E140',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    };

    // Sending the request
    try {
      setUploading(true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log(responseData);
      setUploading(false);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setUploading(false);
      setUploadSuccess(false);
    }
  };

  return (
    <UploadDataBox elevation={3}>
      <Typography variant="h6" gutterBottom>
        Upload Data
      </Typography>
      <Typography variant="body2" color="textSecondary">
      Please choose your health records file. This file be encrypted and uploaded to private blockchain 
      </Typography>
      {/* Separate button for file upload */}
      {uploading && <CircularProgress size={24} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
      {uploadSuccess ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircleIcon color="success" style={{ fontSize: 24, marginBottom: 8 }} />
          <Typography variant="caption" color="success">
            Completed
          </Typography>
          <Button variant="outlined" onClick={resetUploadStatus} style={{ marginTop: 8 }}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
        <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            style={{ display: 'none' }} /><Button variant="contained" color="primary" onClick={() => document.getElementById('file-input')?.click()}>
              Choose File
            </Button><Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading}>
              Upload
            </Button>
          </>
      )}
    </UploadDataBox>
  );
};

export default UploadDocument;
