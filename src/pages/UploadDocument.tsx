import React, { useState } from 'react';

const UploadDocument: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

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
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Send Request</button>
    </div>
  );
};

export default UploadDocument;
