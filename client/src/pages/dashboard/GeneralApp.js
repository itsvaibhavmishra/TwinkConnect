import React from 'react';
import Chats from './Chats';
import { Stack } from '@mui/material';
import Conversation from './Conversation';
import Contact from '../../components/Contact';
import { useSelector } from 'react-redux';

const GeneralApp = () => {
  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Chats area */}
      <Chats />

      {/* Chats conversation area */}
      <Conversation sidebar={sidebar} />

      {sidebar.open && (
        // Contacts area
        <Contact />
      )}
    </Stack>
  );
};

export default GeneralApp;
