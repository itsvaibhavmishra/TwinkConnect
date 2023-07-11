import { Box, Stack } from '@mui/material';
import { Chat_History } from '../../../data';
import { TextMsg, Timeline } from './MsgTypes';

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
                  // image
                  break;

                case 'doc':
                  // document
                  break;

                case 'link':
                  // link
                  break;

                case 'reply':
                  // reply message
                  break;

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
