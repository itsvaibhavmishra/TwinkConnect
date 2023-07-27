import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import React from 'react';
import { ChatList } from '../../data';
import ChatElement from './ChatElement';
import { Search, SearchIconWrapper, StyledInputBase } from '../Search';

const Chats = () => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: 320,
        backgroundColor: theme.palette.background.default,
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

        {/* Search section */}
        <Stack sx={{ width: '100%' }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color={theme.palette.primary.main} />
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
                backgroundColor: theme.palette.background.paper,
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
                backgroundColor: theme.palette.background.paper,
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
