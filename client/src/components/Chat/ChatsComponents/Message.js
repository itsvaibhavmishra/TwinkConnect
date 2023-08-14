import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";

const Message = ({ value }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((e, index) => {
          switch (e.type) {
            case "divider":
              return <Timeline e={e} key={index} />;

            case "msg":
              switch (e.subtype) {
                case "img":
                  return <MediaMsg e={e} value={value} key={index} />;

                case "doc":
                  return <DocMsg e={e} value={value} key={index} />;

                case "link":
                  return <LinkMsg e={e} value={value} key={index} />;

                case "reply":
                  return <ReplyMsg e={e} value={value} key={index} />;

                default:
                  return <TextMsg e={e} value={value} key={index} />;
              }
            default:
              return null;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
