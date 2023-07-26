import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { MagnifyingGlass, Phone, PhoneCall } from 'phosphor-react';
import React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../Search';
import { CallElement } from './CallElement';
import { CallLogs } from '../../data';

const Calls = () => {
  // using theme
  const theme = useTheme();

  return (
    <Stack>
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: 320,
          backgroundColor: theme.palette.background.default,
          boxShadow: '0px 0px 2px #00000040',
        }}
      >
        {/* Header */}
        <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
          <Typography variant="h5">Call Log</Typography>

          {/* Search stack */}
          <Stack sx={{ width: '100%' }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Stack>

          {/* Create new call stack */}
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ cursor: 'pointer' }}
            // onClick
          >
            <Typography variant="subtitle2" component={Button}>
              Start new conversation
            </Typography>
            <IconButton>
              <PhoneCall style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
          <Divider />

          {/* Call Logs starts here */}
          <Stack
            direction={'column'}
            sx={{
              flexGrow: 1,
              overflow: 'scroll',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            spacing={2}
            className="scrollbar"
          >
            <Stack>
              {CallLogs.map((e) => {
                return <CallElement {...e} />;
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Calls;
