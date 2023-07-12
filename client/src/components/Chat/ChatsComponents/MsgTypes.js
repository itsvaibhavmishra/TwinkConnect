import {
  Box,
  Divider,
  Fade,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { DownloadSimple, Image } from 'phosphor-react';
import React, { useState } from 'react';
import MsgMenu from './MsgMenu';

const MsgBox = ({ e, children }) => {
  const theme = useTheme();
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <Stack
      direction="row"
      justifyContent={e.incoming ? 'start' : 'end'}
      alignItems="center"
      spacing={0.5}
    >
      {e.incoming ? (
        <Stack
          direction="row"
          onMouseEnter={() => setShowEmojis(true)}
          onMouseLeave={() => setShowEmojis(false)}
          alignItems="center"
          spacing={0.5}
        >
          <Box
            p={1.5}
            sx={{
              width: 'max-content',
              backgroundColor: theme.palette.background.default,
              borderRadius: 1.5,
            }}
          >
            {children}
          </Box>
          {showEmojis && (
            <Fade in={showEmojis}>
              <Stack sx={{ cursor: 'pointer' }}>
                <MsgMenu incoming={e.incoming} />
              </Stack>
            </Fade>
          )}
        </Stack>
      ) : (
        <Stack
          direction="row"
          onMouseEnter={() => setShowEmojis(true)}
          onMouseLeave={() => setShowEmojis(false)}
          alignItems="center"
          spacing={0.5}
        >
          {showEmojis && (
            <Fade in={showEmojis}>
              <Stack>
                <MsgMenu incoming={e.incoming} />
              </Stack>
            </Fade>
          )}
          <Box
            p={1.5}
            sx={{
              width: 'max-content',
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            {children}
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

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
    <MsgBox e={e}>
      <Typography
        variant="body2"
        color={e.incoming ? theme.palette.text : '#fff'}
      >
        {e.message}
      </Typography>
    </MsgBox>
  );
};

const MediaMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <MsgBox e={e}>
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
    </MsgBox>
  );
};

const ReplyMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <MsgBox e={e}>
      <Stack spacing={2}>
        <Stack
          p={2}
          direction={'column'}
          alignItems={'center'}
          spacing={3}
          sx={{
            background: theme.palette.background.paper,
            borderRadius: 1,
            borderLeft: `5px solid ${theme.palette.primary.lighter}`,
          }}
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
    </MsgBox>
  );
};

const LinkMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <MsgBox e={e}>
      <Stack spacing={2}>
        <Stack
          spacing={1}
          p={1}
          alignItems={'center'}
          direction={'row'}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <img
            src={e.preview}
            alt="e.message"
            style={{ maxHeight: 100, borderRadius: '10px' }}
          />
          <Stack spacing={1}>
            <Tooltip
              title="Vaibhaw Mishra"
              placement="bottom-start"
              followCursor
              arrow
            >
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ maxWidth: 200, overflow: 'hidden' }}
                color={theme.palette.text.secondary}
              >
                Vaibhaw Mishra
              </Typography>
            </Tooltip>
            <Typography
              variant="subtitle2"
              component={Link}
              to="//https://vaibhaw.netlify.app"
              sx={{ color: theme.palette.primary.main }}
            >
              vaibhaw.netlify.app
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          color={e.incoming ? theme.palette.text : '#fff'}
        >
          {e.message}
        </Typography>
      </Stack>
    </MsgBox>
  );
};

const DocMsg = ({ e }) => {
  // using theme
  const theme = useTheme();

  return (
    <MsgBox e={e}>
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
    </MsgBox>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };
