import React, { useState } from 'react';

const CreateWallet: React.FC = () => {
  const [label, setLabel] = useState<string>('');
  const [responseData, setResponseData] = useState<any>(null);

  const handleCreateWallet = async () => {
    try {
      const response = await fetch('https://gwu-aditya.engine-usw2.thirdweb.com/backend-wallet/create', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDAxNjc1N2REZjJBYjZhOTk4YTQ3MjlBODBhMDkxMzA4ZDkwNTlFMTciLCJzdWIiOiIweDExMzI3QjM1NjQzQjFCNjlBNTc2OUJkQzE2NUM5ZTBmYjQzNjlhQ2EiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjE3MDkwNjczMjIsIm5iZiI6MTcwODgwODEyMiwiaWF0IjoxNzA4ODA4MTIyLCJqdGkiOiJiNGRhOWVkYy03Y2RkLTRjYWEtYWEzNS1mZTc4NGE0MzU4ZDEifQ.MHhhNDg5MTY4Mzk1YmMyYTNlNGY2MWFmZTgzMjQ5N2ExMDczNDgzNjAzNTJjYzlmZTA0ZmU0Mjg0OGVjMGZjNWVkMGEyZGMwZTRhMGNjZjNlMDM1ZTA2ZjdiYmRjNDE5ZDllM2IzZWI0OWMxZGE4ODQzNzM3NmQyMmIyYzljZDI4MjFj',
        },
        body: JSON.stringify({
          label: label,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseData(responseData.result);
      } else {
        console.error('Failed to create wallet:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  return (
    <div>
      <label htmlFor="labelInput">Label:</label>
      <input
        type="text"
        id="labelInput"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button onClick={handleCreateWallet}>Create Wallet</button>
      {responseData && (
        <div>
          <h2>Wallet Information</h2>
          <p>Wallet Address: {responseData.walletAddress}</p>
          <p>Status: {responseData.status}</p>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
