import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Logo from '../../assets/Images/TwinkChat.png';

const AuthLayout = () => {
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={5}>
        <Stack
          direction={'column'}
          alignItems={'center'}
          sx={{ width: '100%' }}
        >
          <img
            src={Logo}
            alt={'TwinkChat Logo'}
            style={{ height: 120, width: 120 }}
          />
        </Stack>
      </Stack>

      <Outlet />
    </Container>
  );
};

export default AuthLayout;
