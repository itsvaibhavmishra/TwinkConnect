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
} from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import React from 'react';

// styles for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
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
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: 320,
        backgroundColor: '#F8FAFF',
        boxShadow: '0px 0px 2px #00000040',
      }}
    >
      <Stack p={3} spacing={2}>
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent="space-between"
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
          <Stack direction="row" alignItems={'center'} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
