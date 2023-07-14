import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../../../redux/slices/app';
import { ArrowCircleLeft } from 'phosphor-react';

const Header = () => {
  // using theme
  const theme = useTheme();

  // redux
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 2px #00000040',
        width: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack
        direction={'row'}
        sx={{ height: '100%' }}
        p={2}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={3}
      >
        <Typography variant="subtitle2">Shared Messages</Typography>
        <IconButton
          onClick={() => {
            dispatch(UpdateSidebarType('CONTACT'));
          }}
        >
          <ArrowCircleLeft />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Header;
