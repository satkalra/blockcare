import React, { useState, useEffect } from 'react';
import CommonTable from './CommonTable';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Appointments: React.FC = () => {
    const navigate = useNavigate()
  const columns = [
    { id: 'label', label: 'Name' },
    { id: 'address', label: 'Address' },
    { id: 'action', label: '', isActionButton: true }, // This column will have an action button
  ];

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [appointments, setAppointments] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    // Reset the loading and success states when the modal is closed
    setLoading(false);
    setSuccess(false);
  };

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
  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    if (data) {
      const name = localStorage.getItem('username');
      const id = data.filter((item: any) => item.label === name);
      localStorage.setItem('user-address', id[0]['address']);
      const data2 = data.filter((item: any) => item.label.toLowerCase().includes('doctor'))
      const doctorCheck = data2.filter((item: any) => item.label === name);
      if (doctorCheck.length){
        navigate('/doctor')
        localStorage.setItem('doctor','true')
        localStorage.setItem('doc-data',JSON.stringify(data))
      }
    }
  }, [data]);

  // Render loading state if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleActionButtonClick = (rowId: number) => {
    setModalOpen(true);
    try {
      setLoading(true);
      setAppointments((prevAppointments: any) => [...prevAppointments, localStorage.getItem('user-address')]);
      localStorage.setItem('appointment', JSON.stringify(appointments));
      setLoading(false)
      setSuccess(true);
    } catch {
      setSuccess(false);
    } finally {
      // Handle the modal close here or after a specific time delay
      setTimeout(() => {
        handleModalClose();
        setSuccess(true)
      }, 1000); // Adjust the time delay as needed
    }
  };

  return (
    <div>
      <CommonTable
        columns={columns}
        data={data.filter((item: any) => item.label.toLowerCase().includes('doctor'))}
        actionButtonText="Book"
        onActionButtonClick={(label) => handleActionButtonClick(label)}
      />
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Booked</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress size={100} />
          ) : success ? (
            <CheckCircleIcon style={{ fontSize: 50, color: 'green' }} />
          ) : (
            <p>Modal content goes here...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appointments;
