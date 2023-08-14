import { faker } from "@faker-js/faker";
import { Grid, Stack, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import { SHARED_DOCS, SHARED_LINKS } from "../../../data";
import { DocMsg, LinkMsg } from "../../Chat/ChatsComponents/MsgTypes";

// Media container
const Media = () => {
  return (
    <Grid container spacing={2}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 9].map((e, index) => {
        return (
          <Grid item xs={4} key={index}>
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

  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.background.default,
        overflowY: "scroll",
        height: "100%",
      }}
      className="scrollbar"
    >
      <Stack
        className="scrollbar"
        sx={{
          height: "100%",
          position: "relative",
          flexGrow: 1,
          overflowY: "scroll",
          backgroundColor: theme.palette.background.paper,
        }}
        ml={0.5}
        mb={0.5}
        spacing={3}
      >
        <Tabs sx={{ pt: 2 }} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>

        {/* Changing component */}
        <Stack
          className="scrollbar"
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
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
                return SHARED_LINKS.map((e, index) => (
                  <LinkMsg key={index} e={e} value={value} />
                ));

              case 2:
                // docs section
                return SHARED_DOCS.map((e, index) => (
                  <DocMsg key={index} e={e} value={value} />
                ));

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Body;
