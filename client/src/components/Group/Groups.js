import { Box, useTheme } from '@mui/material';
import React from 'react';

const Groups = () => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: 320,
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 0px 2px #00000040',
      }}
    ></Box>
  );
};

export default Groups;
