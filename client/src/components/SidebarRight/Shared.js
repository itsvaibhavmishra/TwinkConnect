import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from './SharedComponents/SharedHeader';
import Body from './SharedComponents/SharedBody';

const Shared = () => {
  return (
    <Box sx={{ width: 320, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Header />
        <Body />
      </Stack>
    </Box>
  );
};

export default Shared;
