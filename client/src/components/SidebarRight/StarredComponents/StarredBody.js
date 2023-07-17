import { Stack, useTheme } from '@mui/material';
import React from 'react';
import Message from '../../Chat/ChatsComponents/Message';

const Body = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.default,
        overflowY: 'scroll',
        height: '100%',
      }}
      className="scrollbar"
    >
      <Stack
        className="scrollbar"
        sx={{
          height: '100%',
          position: 'relative',
          flexGrow: 1,
          overflowY: 'scroll',
          backgroundColor: theme.palette.background.paper,
        }}
        ml={0.5}
        mb={0.5}
        p={3}
        spacing={3}
      >
        <Message value={true} />
      </Stack>
    </Stack>
  );
};

export default Body;
