import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GetAllWallet: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gwu-aditya.engine-usw2.thirdweb.com/backend-wallet/get-all?page=1&limit=10', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDAxNjc1N2REZjJBYjZhOTk4YTQ3MjlBODBhMDkxMzA4ZDkwNTlFMTciLCJzdWIiOiIweDExMzI3QjM1NjQzQjFCNjlBNTc2OUJkQzE2NUM5ZTBmYjQzNjlhQ2EiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjE3MDkwNjczMjIsIm5iZiI6MTcwODgwODEyMiwiaWF0IjoxNzA4ODA4MTIyLCJqdGkiOiJiNGRhOWVkYy03Y2RkLTRjYWEtYWEzNS1mZTc4NGE0MzU4ZDEifQ.MHhhNDg5MTY4Mzk1YmMyYTNlNGY2MWFmZTgzMjQ5N2ExMDczNDgzNjAzNTJjYzlmZTA0ZmU0Mjg0OGVjMGZjNWVkMGEyZGMwZTRhMGNjZjNlMDM1ZTA2ZjdiYmRjNDE5ZDllM2IzZWI0OWMxZGE4ODQzNzM3NmQyMmIyYzljZDI4MjFj',
            // Add any additional headers if needed
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData.result);
        } else {
          console.error('Failed to fetch data:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Render loading state if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render your component content with the fetched data
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Type</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item: any) => (
            <tr key={item.address}>
              <td>{item.address}</td>
              <td>{item.type}</td>
              <td>{item.label}</td>
              <td>
                <Link to={`/backend-wallet/sepolia/${item.address}/get-all-transactions`}>
                  <button>View Transactions</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllWallet;
