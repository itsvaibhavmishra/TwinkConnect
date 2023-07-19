import React from 'react';
import Chats from './Chats';
import { Stack } from '@mui/material';
import Conversation from '../../components/Chat/Conversation';
import { useSelector } from 'react-redux';
import { Contact, Shared, Starred } from '../../components/SidebarRight';

const GeneralApp = () => {
  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Chats area */}
      <Chats />

      {/* Chats conversation area */}
      <Conversation sidebar={sidebar} />

      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case 'CONTACT':
              return <Contact />; // Contacts area

            case 'STARRED':
              return <Starred />;

            case 'SHARED':
              return <Shared />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
