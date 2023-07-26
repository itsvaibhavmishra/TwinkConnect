import { Stack } from '@mui/material';
import React from 'react';
import Calls from '../../components/Call/Calls';

const Call = () => {
  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Calls List Panel */}
      <Calls />
    </Stack>
  );
};

export default Call;
