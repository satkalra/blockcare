import "./styles/Home.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import logo from "./assests/logo.png";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'


export default function Header () {
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false)
    const [user, setUser] = React.useState('');
    const [userAddress, setUserAddress] = React.useState('');

    const navigate = useNavigate()

    // eslint-disable-next-line
    React.useEffect(()=>{
            const username = localStorage.getItem("username");
            if(username){                
                setUser(username);
                setIsUserLoggedIn(true)
        }
        const address = localStorage.getItem('user-address')
        if (address){
            setUserAddress(address)
        }

    })

    const onPress = () =>{
        setUser('')
        setIsUserLoggedIn(false)
        localStorage.removeItem('username')
        navigate('/');
      }

    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography variant="h6" sx={{marginTop: '90px', color: '#000000'}}>
                            Empowering Healthcare, Ensuring Equity
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                            <Typography variant="h6" sx = {{marginTop: '215px', color: '#000000'}}>
                                {isUserLoggedIn? `Welcome, ${user}` : 'Welcome'}
                            </Typography>
                            <Typography variant="h6" sx = {{color: '#000000', fontSize:'10px'}}>
                                {isUserLoggedIn && `Address: ${userAddress}`}
                            </Typography>
                    </Grid>
                    <Grid item xs={5}>
                            <Typography variant="h3" sx = {{marginTop: '20px'}}>
                                <img src={logo} alt="Logo" height="150" />
                            </Typography>
                            {isUserLoggedIn && 
                            <li>
                                <button className='btn hovPurp logout' onClick={onPress}> 
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        }
                    </Grid>
                </Grid>
            </Box>
            </div>
        </>
    )
}