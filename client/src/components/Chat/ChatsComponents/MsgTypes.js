import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { DownloadSimple, Image } from 'phosphor-react';
import React from 'react';

// Displaying Timelines
const Timeline = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Divider width="46%" />
      <Typography
        variant="caption"
        sx={{ color: theme.palette.text.secondary }}
      >
        {e.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

// Displaying Text Messages
const TextMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Typography
          variant="body2"
          color={e.incoming ? theme.palette.text : '#fff'}
        >
          {e.message}
        </Typography>
      </Box>
    </Stack>
  );
};

const MediaMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={1}>
          <img
            src={e.img}
            alt={e.message}
            style={{ maxHeight: 210, borderRadius: '10px' }}
          />
          <Typography
            variant="body2"
            color={e.incoming ? theme.palette.text : '#fff'}
          >
            {e.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const ReplyMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={'column'}
            alignItems={'center'}
            spacing={3}
            sx={{ background: theme.palette.background.paper, borderRadius: 1 }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {e.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={e.incoming ? theme.palette.text : '#fff'}
          >
            {e.reply}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const LinkMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems={'start'}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={e.preview}
              alt="e.message"
              style={{ maxHeight: 210, borderRadius: '10px' }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Vaibhaw Mishra</Typography>
              <Typography
                variant="subtitle2"
                component={Link}
                to="//https://vaibhaw.netlify.app"
                sx={{ color: theme.palette.primary.main }}
              >
                vaibhaw.netlify.app
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={e.incoming ? theme.palette.text : '#fff'}
            >
              {e.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

const DocMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack direction={'row'} justifyContent={e.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          width: 'max-content',
          backgroundColor: e.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction={'row'}
            p={2}
            spacing={3}
            alignItems={'center'}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={40} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={e.incoming ? theme.palette.text : '#fff'}
          >
            {e.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
