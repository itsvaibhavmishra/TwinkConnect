import { Stack, useTheme } from '@mui/material';
import React from 'react';

const Body = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
      }}
      className="scrollbar"
    >
      {/* Changing component */}
      <Stack
        className="scrollbar"
        sx={{
          height: '100%',
          position: 'relative',
          flexGrow: 1,
          overflowY: 'scroll',
        }}
        p={3}
        spacing={3}
      ></Stack>
    </Stack>
  );
};

export default Body;
