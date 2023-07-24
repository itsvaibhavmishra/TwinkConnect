import {
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
import { ChatList } from '../../data';
import ChatElement from './ChatElement';

// styles for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(
    theme.palette.mode === 'light' ? '#F0F4FF' : theme.palette.background.paper,
    1
  ),
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
