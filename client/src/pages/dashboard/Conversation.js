import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { ChatFooter, ChatHeader } from '../../components/Chat';

function Conversation() {
  // using theme
  const theme = useTheme();

  return (
    // initializing height and width for conversation area
    <Box
      sx={{
        height: '100%',
        width: 'calc(100vw - 400px)',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Parent Stack */}
      <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        {/* header */}

        <ChatHeader />

        {/* Main Conversation */}
        <Box sx={{ width: '100%', flexGrow: 1 }}></Box>

        {/* footer */}

        <ChatFooter />
      </Stack>
    </Box>
  );
}

export default Conversation;
