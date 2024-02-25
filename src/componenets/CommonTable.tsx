import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Column {
  id: string;
  label: string;
  isActionButton?: boolean;
}

interface Row {
  id: number;
  [key: string]: any;
}

interface CommonTableProps {
  columns: Column[];
  data: Row[];
  actionButtonText?: string;
  onActionButtonClick?: (rowId: number) => void;
}

const StyledTableContainer = styled(TableContainer)({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  marginTop: '16px', // Adjust the space between the table and other elements
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px 16px', // Adjust the padding
  borderBottom: '1px solid #ddd',
  fontSize: '1rem', // Default font size
  '&:last-child': {
    paddingRight: '1px', // Add extra padding to the last cell (for action button)
  },
}));

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, actionButtonText, onActionButtonClick }) => {
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
            {columns.some((column) => column.isActionButton) && (
              <StyledTableCell>{/* Empty cell for action button column header */}</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.isActionButton ? (
                    <Button
                      variant="outlined"
                      onClick={() => onActionButtonClick && onActionButtonClick(row.address)}
                    >
                      {actionButtonText || 'Action'}
                    </Button>
                  ) : (
                    row[column.id]
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CommonTable;
