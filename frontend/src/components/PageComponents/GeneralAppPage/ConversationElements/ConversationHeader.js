import {
  Box,
  Stack,
  useTheme,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import { VideoCamera, Phone, XCircle } from "phosphor-react";

// redux imports
import { useDispatch } from "react-redux";
import { setActiveConversation } from "../../../../redux/slices/chatSlice";

import getAvatar from "../../../../utils/createAvatar";
import StyledBadge from "../../../StyledBadge";

const ConversationHeader = ({ otherUser }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  return (
    <Box
      p={2}
      width={"100%"}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* main stack */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* avatar and name */}
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            {getAvatar(otherUser.avatar, otherUser.firstName, theme)}
          </StyledBadge>

          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{`${otherUser.firstName} ${otherUser.lastName}`}</Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        {/* header actions */}
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          {/* video call action */}
          <IconButton>
            <VideoCamera />
          </IconButton>

          {/* voice call action */}
          <IconButton>
            <Phone />
          </IconButton>

          <Divider orientation="vertical" flexItem />
          {/* search action */}
          <IconButton
            onClick={() => {
              dispatch(setActiveConversation(null));
            }}
          >
            <XCircle />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ConversationHeader;
