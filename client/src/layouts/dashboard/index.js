// dashboard nav/sidebar
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Nav_Buttons } from '../../data';
import { Gear } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import TwinkLogo from '../../assets/Images/TwinkChat.png';
import ThemeSwitch from '../../components/ThemeSwitch';
import useSettings from '../../hooks/useSettings';

const DashboardLayout = () => {
  // for getting color palattes from theme
  const theme = useTheme();

  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings(); // useSettings from custom hooks

  const [isSwitchChecked, setIsSwitchChecked] = useState(
    theme.palette.mode === 'light'
  );

  useEffect(() => {
    setIsSwitchChecked(theme.palette.mode === 'light');
  }, [theme.palette.mode]);

  return (
    <Stack direction="row">
      {/* main sidebar */}
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0px 0px 2px #00000040',
          height: '100vh',
          width: 80,
        }}
      >
        {/* Stack provides flex properties in mui */}
        <Stack
          direction="column"
          sx={{ height: '100%' }}
          alignItems="center"
          spacing={3}
          justifyContent={'space-between'}
        >
          <Stack alignItems={'center'} spacing={4}>
            {/* App logo */}
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 54,
                width: 54,
                borderRadius: 1.5,
              }}
            >
              <img
                src={TwinkLogo}
                alt="TwinkChat_Logo"
                style={{ padding: '2px 0px' }}
              />
            </Box>

            {/* Navigation buttons from data/index */}
            <Stack
              spacing={3}
              alignItems="center"
              sx={{ width: 'max-content' }}
            >
              {Nav_Buttons.map((e) =>
                e.index === selected ? (
                  <Box
                    key={e.index}
                    p={0.5}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                      {e.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => setSelected(e.index)}
                    key={e.index}
                    sx={{
                      width: '80%',
                      color:
                        theme.palette.mode === 'dark'
                          ? theme.palette.text.primary
                          : '#000',
                    }}
                  >
                    {e.icon}
                  </IconButton>
                )
              )}
              {/* Adds a line like <hr> tag */}
              <Divider sx={{ width: '48px' }} />
              {selected === 3 ? (
                <Box
                  p={0.5}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => setSelected(3)}
                  sx={{
                    width: '80%',
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.text.primary
                        : '#000',
                  }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>

          {/*  theme switch button amd avatar */}
          <Stack spacing={4} alignItems={'center'}>
            <ThemeSwitch
              onChange={() => {
                onToggleMode();
              }}
              checked={isSwitchChecked}
            />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
