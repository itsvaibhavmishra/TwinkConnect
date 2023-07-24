import { Stack } from '@mui/material';
import React from 'react';
import Groups from '../../components/Group/Groups';

const Group = () => {
  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Group List Panel */}
      <Groups />
      {/* Conversation Panel */}
    </Stack>
  );
};

export default Group;
