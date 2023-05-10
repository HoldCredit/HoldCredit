import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";

export default function Error404() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FFE34A',
      }}
    >
      <Typography variant="h1" style={{ color: '#464646', fontWeight:'bold' }}>
        4 0 4
      </Typography>
      <Typography variant="h6" style={{ color: '#464646',  }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <br/>
      <Button variant="contained" size='large' color='error' sx={{color:'#FFE34A', backgroundColor: '#464646'}}
              onClick={() => navigate('/')}>Back Home</Button>
    </Box>
  );
}
