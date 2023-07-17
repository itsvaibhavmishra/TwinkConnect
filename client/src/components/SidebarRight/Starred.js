import { Box, Stack } from '@mui/material';
import React from 'react';
import Header from './StarredComponents/StarredHeader';
import Body from './StarredComponents/StarredBody';

const Starred = () => {
  return (
    <Box sx={{ width: 320, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Header />
        <Body />
      </Stack>
    </Box>
  );
};

export default Starred;
