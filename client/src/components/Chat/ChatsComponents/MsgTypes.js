import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

// Displaying Timelines
const Timeline = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Divider width="46%" />
      <Typography
        variant="caption"
        sx={{ color: theme.palette.text.secondary }}
      >
        {e.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

// Displaying Text Messages
const TextMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Typography
          variant="body2"
          color={e.incoming ? theme.palette.text : '#fff'}
        >
          {e.message}
        </Typography>
      </Box>
    </Stack>
  );
};

export { Timeline, TextMsg };
