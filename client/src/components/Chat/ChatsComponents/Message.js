import { Box, Stack } from '@mui/material';
import { Chat_History } from '../../../data';
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from './MsgTypes';

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((e) => {
          switch (e.type) {
            case 'divider':
              return <Timeline e={e} />;

            case 'msg':
              switch (e.subtype) {
                case 'img':
                  return <MediaMsg e={e} />;

                case 'doc':
                  return <DocMsg e={e} />;

                case 'link':
                  return <LinkMsg e={e} />;

                case 'reply':
                  return <ReplyMsg e={e} />;

                default:
                  return <TextMsg e={e} />;
              }
              break;
            default:
              break;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
