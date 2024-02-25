import React, { useState, useEffect } from 'react';
import CommonTable from './CommonTable';


export default function DoctorsPage() {
    const columns = [
        { id: 'label', label: 'Patient Name' },
        { id: 'address', label: 'Address' },
        { id: 'action', label: '', isActionButton: true },
      ];
      
          
      const [data, setData] = useState<any>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://gwu-aditya.engine-usw2.thirdweb.com/backend-wallet/get-all?page=1&limit=10', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIweDAxNjc1N2REZjJBYjZhOTk4YTQ3MjlBODBhMDkxMzA4ZDkwNTlFMTciLCJzdWIiOiIweDExMzI3QjM1NjQzQjFCNjlBNTc2OUJkQzE2NUM5ZTBmYjQzNjlhQ2EiLCJhdWQiOiJ0aGlyZHdlYi5jb20iLCJleHAiOjE3MDkxMTQ1MjksIm5iZiI6MTcwODg1NTMyOSwiaWF0IjoxNzA4ODU1MzI5LCJqdGkiOiIyNWRhN2RlOS0xMWE4LTQ3YjgtYTRkYS04YzNlOTk4OGUwMTEifQ.MHhhZjczNjhhNmFhZTJlY2FlYzQwMTIyOWI2YjlhZWU2MzA1ODFmZmMxZDE0YjQ0YjJkZjFhYTdmZGY2M2JmZjIwMDY4ZjNkYzI2ZTI3N2ExOWE0MTdiZmU0ZmViYzBlMmExOGExMjAzMGNkM2YxZmQwYzQwODBiYzRhYWM3MDVmZDFi',
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
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }

      

      const handleActionButtonClick = (rowId: number) =>{
        console.log('The address is ',rowId)

      }

    return(
    <>
    <CommonTable columns={columns} data={data.filter((item: any) => item.label.toLowerCase().includes('patient'))}  actionButtonText="Access" onActionButtonClick={(label) => handleActionButtonClick(label)} />
    </>
    )
}