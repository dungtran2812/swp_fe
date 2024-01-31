import { Box, Grid, Typography, Button } from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Quotationbanner() {
  return (
    <Box
      sx={{
        marginTop: 4,
        border: 1,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        backgroundImage: "url('https://t3.ftcdn.net/jpg/05/46/10/10/360_F_546101072_Pkig92S0bpkovV4UzXcN5nYb7ZDhd7DV.jpg')",
        backgroundSize: 'cover', // Ensure the background image covers the entire box
      }}
    >
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Typography variant='h4' sx={{ color: '#f9a11b', padding: 6, fontWeight:"bold" }}>
            Order now
          </Typography>
          <Typography variant='h6' sx={{ color: 'white', padding: 6, textAlign:'center'}}>
            To receive the fastest and most accurate interior design and construction quote.
            Please contact via Hotline: 0123456789. Thank you!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to='/Quotepage' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ backgroundColor: '#f9a11b', color: 'white', '&:hover': { backgroundColor: yellow[700] } }}
            >
              Get Quotation Now
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
