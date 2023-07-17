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

const Message = ({ value }) => {
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
                  return <MediaMsg e={e} value={value} />;

                case 'doc':
                  return <DocMsg e={e} value={value} />;

                case 'link':
                  return <LinkMsg e={e} value={value} />;

                case 'reply':
                  return <ReplyMsg e={e} value={value} />;

                default:
                  return <TextMsg e={e} value={value} />;
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
