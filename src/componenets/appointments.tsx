import React from 'react';
import CommonTable from './CommonTable';

const Appointments: React.FC = () => {
    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'specialization', label: 'Specialization' },
        { id: 'action', label: '', isActionButton: true }, // This column will have an action button
      ];
      
      const data = [
        { id: 1, name: 'Dr. John Doe', specialization: 'Cardiology' },
        { id: 2, name: 'Dr. Jane Doe', specialization: 'Dermatology' },
      ];
      
      const handleActionButtonClick = (rowId: number) => {
        console.log(`Action button clicked for row ${rowId}`);
        // Add your custom handling logic here
      };
      

  return (
    <div>
      <CommonTable columns={columns} data={data} actionButtonText="Book"  onActionButtonClick={handleActionButtonClick} />
    </div>
  );
};

export default Appointments;
