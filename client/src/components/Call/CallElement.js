import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import StyledBadge from '../StyledBadge';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from 'phosphor-react';
import { faker } from '@faker-js/faker';

const CallElement = ({ img, name, time, incoming, missed, online }) => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      }}
      p={2}
      my={1}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          {/* Avatar and online status badge */}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          {/* Name, buttoon and time */}
          <Stack spacing={0.3}>
            {/* Name */}
            <Typography variant="subtitle2">{name}</Typography>

            {/* Icon */}
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              {incoming ? (
                <ArrowDownLeft
                  color={
                    missed
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                />
              ) : (
                <ArrowUpRight
                  color={
                    missed
                      ? theme.palette.error.main
                      : theme.palette.success.main
                  }
                />
              )}
              <Typography variant="caption">Yesterday {time}pm</Typography>
            </Stack>
          </Stack>
        </Stack>

        <IconButton>
          <Phone style={{ color: theme.palette.success.main }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

const NewCall = ({ name, img, online }) => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      }}
      p={2}
      my={1}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          {/* Avatar and online status badge */}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          {/* Name, buttoon and time */}
          <Stack spacing={0.3}>
            {/* Name */}
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} alignItems={'center'}>
          {/* Phone Call */}
          <IconButton>
            <Phone style={{ color: theme.palette.success.main }} />
          </IconButton>

          {/* Video Call */}
          <IconButton>
            <VideoCamera style={{ color: theme.palette.success.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export { CallElement, NewCall };
