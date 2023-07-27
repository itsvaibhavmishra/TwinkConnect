import { Stack } from '@mui/material';
import React from 'react';
import Profiles from '../../components/Profile/Profiles';

const Profile = () => {
  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Profile Panel */}
      <Profiles />
    </Stack>
  );
};

export default Profile;
