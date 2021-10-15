import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box sx={{ fontSize: '50px', color: 'grey.500', width: '100vw', height: '100vh', display: 'flex',flexDirection: 'column',alignItems: 'center', justifyContent: 'center' }} spacing={2} direction="row">
      <img style={{ width: '40%' }} className="" src="https://res.cloudinary.com/duaokxfsp/image/upload/v1634148880/emprende-ya/Logo/LogoEY4_q4blu4.png" alt="logoEY" />
      <CircularProgress />

    </Box>
  );
}