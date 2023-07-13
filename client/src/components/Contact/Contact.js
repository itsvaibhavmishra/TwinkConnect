import { Box, Stack } from '@mui/material';
import Header from './ContactComponents/Header';
import Body from './ContactComponents/Body';

const Contact = () => {
  return (
    <Box sx={{ width: 320, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Header />
        <Body /> {/* Footer inside of body */}
      </Stack>
    </Box>
  );
};

export default Contact;
