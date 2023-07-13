import { faker } from '@faker-js/faker';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { Prohibit, Trash } from 'phosphor-react';
import React from 'react';

const Footer = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="body2">1 group in common</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Avatar src={faker.image.avatar()} alt={faker.name.fullName} />
          <Stack spacing={0.5}>
            <Typography variant="subtitle2">Friend's Group</Typography>
            <Typography variant="caption">Vipu, Dhananjay, You</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Button startIcon={<Prohibit />} fullWidth variant="outlined">
          Block
        </Button>
        <Button startIcon={<Trash />} fullWidth variant="outlined">
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default Footer;
