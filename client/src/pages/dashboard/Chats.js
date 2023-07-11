import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
  alpha,
  styled,
  useTheme,
} from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import React from 'react';
import StyledBadge from '../../components/StyledBadge';
import { ChatList } from '../../data';

// styles for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

// styles for search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// implementation of search functionality
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const ChatElement = ({ id, img, name, msg, time, unread, pinned, online }) => {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 1,
      }}
      p={2}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} spacing={2}>
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

          {/* Name and message */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography
              variant="caption"
              sx={{ color: '#637381', paddingTop: 0.8 }}
            >
              {msg}
            </Typography>
          </Stack>
        </Stack>

        {/* Time and message badge */}
        <Stack spacing={2} alignItems={'center'}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: '#637381', paddingBottom: 0.8 }}
          >
            {time}
          </Typography>
          <Badge
            color="primary"
            badgeContent={unread}
            max={9}
            sx={{ paddingBottom: 1 }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const Chats = () => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: 320,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F8FAFF'
            : theme.palette.background.paper,
        boxShadow: '0px 0px 2px #00000040',
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: '100vh' }}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>
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
        <Stack spacing={1}>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button sx={{ fontWeight: 500 }}>Archived</Button>
          </Stack>
          <Divider />
        </Stack>

        {/* Chats setion starts here */}
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
          {/* Pinned Messages */}
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: '#676767' }}>
              Pinned
            </Typography>
            <Stack
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
              }}
            >
              {ChatList.filter((e) => e.pinned).map((e) => {
                return <ChatElement {...e} />;
              })}
            </Stack>
          </Stack>

          {/* All Chats */}
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: '#676767' }}>
              All Chats
            </Typography>
            <Stack
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
              }}
            >
              {ChatList.filter((e) => !e.pinned).map((e) => {
                return <ChatElement {...e} />;
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
