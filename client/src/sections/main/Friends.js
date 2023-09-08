import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequest,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import {
  FriendsComponent,
  FriendRequestComponent,
  UserComponent,
} from "../../components/Friends";
import { BugDroid } from "phosphor-react";

const NotDataFound = ({ type }) => {
  // using theme
  const theme = useTheme();

  return (
    <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
      <Divider />
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: 25, color: theme.palette.text.secondary }}
        >
          No {type} Found
        </Typography>
        <IconButton>
          <BugDroid size={32} />
        </IconButton>
      </Stack>
      <Divider />
    </Stack>
  );
};

const UsersList = () => {
  // dispatch from redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, [dispatch]);

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          // List of all users
          <UserComponent key={user._id} {...user} />
        ))
      ) : (
        <NotDataFound type="User" />
      )}
    </>
  );
};
const FriendsList = () => {
  // dispatch from redux
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriends());
  }, [dispatch]);

  return (
    <>
      {friends.length > 0 ? (
        friends.map((e, index) => {
          // List of all friends
          return (
            <>
              <FriendsComponent key={e._id} {...e} />
            </>
          );
        })
      ) : (
        <NotDataFound type="Friends" />
      )}
    </>
  );
};
const FriendRequestList = () => {
  // dispatch from redux
  const dispatch = useDispatch();
  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendRequest());
  }, [dispatch]);

  return (
    <>
      {friendRequests.length > 0 ? (
        friendRequests.map((e) => {
          // List of all friend requests
          return (
            <FriendRequestComponent key={e._id} id={e._id} {...e.sender} />
          );
        })
      ) : (
        <NotDataFound type="Requests" />
      )}
    </>
  );
};

const Friends = ({ open, toggleDialog }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      fullWidth
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Header tabs for Dialog */}
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>

      {/* Listing items */}
      <DialogContent
        sx={{ overflowY: "scroll", maxHeight: "25rem", minHeight: "10rem" }}
        className="scrollbar"
      >
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {/* Immediately invocked function */}
            {(() => {
              switch (value) {
                case 0:
                  // List of ALl Users
                  return <UsersList />;
                case 1:
                  // List of All Friends
                  return <FriendsList />;
                case 2:
                  // List of All Friend Requests
                  return <FriendRequestList />;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
