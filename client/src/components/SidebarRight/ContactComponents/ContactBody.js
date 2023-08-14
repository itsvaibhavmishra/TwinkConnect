import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Bell, CaretRight, Phone, Star, VideoCamera } from "phosphor-react";
import React from "react";
import AntSwitch from "../../AntSwitch";
import Footer from "./ContactFooter";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../../../redux/slices/app";

const Body = () => {
  // redux
  const dispatch = useDispatch();

  return (
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
      {/* User Info */}
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar
          src={faker.image.avatar()}
          alt={faker.name.firstName()}
          sx={{ height: 64, width: 64 }}
        />
        <Stack spacing={0.5}>
          <Typography variant="article" fontWeight={600}>
            {faker.name.fullName()}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {faker.phone.number("+91 7#### #####")}
          </Typography>
        </Stack>
      </Stack>

      {/* Audio and Video call */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Stack spacing={1} alignItems={"center"}>
          <IconButton>
            <Phone />
          </IconButton>
          <Typography variant="over">Audio</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <Typography variant="over">Video</Typography>
        </Stack>
      </Stack>
      <Divider />

      {/* About user */}
      <Stack spacing={0.5}>
        <Typography variant="article">About</Typography>
        <Typography variant="body2">Hello from TwikChat</Typography>
      </Stack>
      <Divider />

      {/* Media links and docs */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="subtitle2">Media, links and docs</Typography>
        <Button
          onClick={() => {
            dispatch(UpdateSidebarType("SHARED"));
          }}
          endIcon={<CaretRight />}
        >
          201
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        {[1, 2, 3].map((e, index) => (
          <Box key={index}>
            <img src={faker.image.cats()} alt={faker.name.firstName()} />
          </Box>
        ))}
      </Stack>
      <Divider />

      {/* Starred Messages */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Star size={21} />
          <Typography variant="subtitle2">Starred Messages</Typography>
        </Stack>
        <IconButton
          onClick={() => {
            dispatch(UpdateSidebarType("STARRED"));
          }}
        >
          <CaretRight />
        </IconButton>
      </Stack>
      <Divider />

      {/* Mute Notifications */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Bell size={21} />
          <Typography variant="subtitle2">Mute Notifications</Typography>
        </Stack>
        <AntSwitch />
      </Stack>
      <Divider />
      <Footer />
    </Stack>
  );
};

export default Body;
