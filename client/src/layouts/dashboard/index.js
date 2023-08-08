// dashboard nav/sidebar

import { Stack } from '@mui/material';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';

const isAuthenticated = false;

const DashboardLayout = () => {
  if (!isAuthenticated) {
    return <Navigate to={'/auth'} />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
