import { faker } from '@faker-js/faker';
import { Grid, Stack, Tab, Tabs } from '@mui/material';
import React from 'react';

// Media container
const Media = () => {
  return (
    <Grid container spacing={2}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 9].map((e) => {
        return (
          <Grid item xs={4}>
            <img src={faker.image.avatar()} alt={faker.name.fullName()} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const Body = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs sx={{ pt: 2 }} value={value} onChange={handleChange} centered>
        <Tab label="Media" />
        <Tab label="Links" />
        <Tab label="Docs" />
      </Tabs>

      {/* Changing component */}
      <Stack
        className="scrollbar"
        sx={{
          height: '100%',
          position: 'relative',
          flexGrow: 1,
          overflowY: 'scroll',
        }}
        p={3}
        spacing={3}
      >
        {(() => {
          switch (value) {
            case 0:
              // media section
              return <Media />;

            case 1:
              // links section
              return null;

            case 2:
              // docs section
              return null;

            default:
              break;
          }
        })()}
      </Stack>
    </>
  );
};

export default Body;
