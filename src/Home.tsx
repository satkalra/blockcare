import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Appointments from './componenets/appointments';


interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'rgba(0,0,0, 0.7)',
  '&.Mui-selected': {
    color: '#808080',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display:'flex',  flexDirection: 'column',alignItems: 'center', marginTop:'20px' }}>
      <Box sx={{  }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Appointment" />
          <StyledTab label="Upload Data" />
        </StyledTabs>
        <Box sx={{ p: 3 }} />
        {value === 0 && <Appointments />}
      </Box>
    </Box>
  );
}
