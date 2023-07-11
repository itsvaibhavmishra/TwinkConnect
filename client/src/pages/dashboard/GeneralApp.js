import React from 'react';
import Chats from './Chats';
import { Stack } from '@mui/material';
import Conversation from './Conversation';

const GeneralApp = () => {
  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Chats area */}
      <Chats />

      {/* Chats conversation area */}
      <Conversation />
    </Stack>
  );
};

export default GeneralApp;
