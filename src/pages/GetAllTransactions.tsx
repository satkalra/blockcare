import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Transaction {
    queueId: string;
    chainId: string;
    fromAddress: string;
    toAddress: string;
    data: string;
    extension: string;
    value: string;
    nonce: number;
    gasLimit: string;
    gasPrice: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    transactionType: number;
    transactionHash: string;
    queuedAt: string;
    processedAt: string;
    sentAt: string;
    minedAt: string;
    cancelledAt: string | null;
    deployedContractAddress: string | null;
    deployedContractType: string | null;
    errorMessage: string | null;
    sentAtBlockNumber: number;
    blockNumber: number;
    status: string;
    retryCount: number;
    retryGasValues: boolean;
    retryMaxFeePerGas: string | null;
    retryMaxPriorityFeePerGas: string | null;
    signerAddress: string | null;
    accountAddress: string | null;
    target: string | null;
    sender: string | null;
    initCode: string | null;
    callData: string | null;
    callGasLimit: string | null;
    verificationGasLimit: string | null;
    preVerificationGas: string | null;
    paymasterAndData: string | null;
    userOpHash: string | null;
    functionName: string;
    functionArgs: string;
    onChainTxStatus: number;
  }  

const GetAllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>([]);
  const [loading, setLoading] = useState(true);

  const { walletAddress } = useParams<{ walletAddress: string }>();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transactions for the specified walletAddress
        const response = await fetch(`https://gwu-aditya.engine-usw2.thirdweb.com/transaction/get-all?page=1&limit=100`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDAxNjc1N2REZjJBYjZhOTk4YTQ3MjlBODBhMDkxMzA4ZDkwNTlFMTciLCJzdWIiOiIweDExMzI3QjM1NjQzQjFCNjlBNTc2OUJkQzE2NUM5ZTBmYjQzNjlhQ2EiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjE3MDkwNjczMjIsIm5iZiI6MTcwODgwODEyMiwiaWF0IjoxNzA4ODA4MTIyLCJqdGkiOiJiNGRhOWVkYy03Y2RkLTRjYWEtYWEzNS1mZTc4NGE0MzU4ZDEifQ.MHhhNDg5MTY4Mzk1YmMyYTNlNGY2MWFmZTgzMjQ5N2ExMDczNDgzNjAzNTJjYzlmZTA0ZmU0Mjg0OGVjMGZjNWVkMGEyZGMwZTRhMGNjZjNlMDM1ZTA2ZjdiYmRjNDE5ZDllM2IzZWI0OWMxZGE4ODQzNzM3NmQyMmIyYzljZDI4MjFj',
            // Add any additional headers if needed
          },
        });

        if (response.ok) {
          const transactionData = await response.json();
          setTransactions(transactionData.result.transactions);
        } else {
          console.error('Failed to fetch transactions:', response);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch transactions when the component mounts
    fetchTransactions();
  }, [walletAddress]); // Re-run the effect whenever walletAddress changes

  // Render loading state if transactions are still being fetched
  if (loading) {
    return <div>Loading all transactions...</div>;
  }

  // Render your component content with the fetched transactions
  return (
    <div>
      <h2>All transactions</h2>
      <ul>
        {transactions && transactions.length > 0 ? (
            <ul>
                {transactions.map((transaction, index) => (
                <li key={index}>
                    {/* Display transaction details */}
                    {/* Adjust the properties based on your API response structure */}
                    Date: {transaction.minedAt}, Sent from: {transaction.fromAddress}, Sent to: {transaction.toAddress}
                    Data: {transaction.data.length}
                </li>
                ))}
            </ul>
            ) : (
            <p>No transactions available.</p>
        )}
      </ul>
    </div>
  );
};

export default GetAllTransactions;
