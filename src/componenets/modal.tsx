// ModalComponent.tsx
import React, { useEffect, useState } from 'react';
import { Modal, Typography } from '@mui/material';

interface ModalComponentProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, handleClose }) => {
  const [data, setData] = useState<{ someProperty: string } | null>(null);

//   useEffect(() => {
//     // Add your API call logic here
//     // Example: Fetch data based on rowData
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://api.example.com/data/${rowData?.id}`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (isOpen && rowData) {
//       fetchData();
//     }
//   }, [isOpen, rowData]);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div>
        <Typography variant="h6">Modal Content</Typography>
        {/* {data && <p>{data.someProperty}</p>} */}
      </div>
    </Modal>
  );
};

export default ModalComponent;
