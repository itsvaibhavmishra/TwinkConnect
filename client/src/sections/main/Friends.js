import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
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

const UsersList = () => {
  // dispatch from redux
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  return (
    <>
      {users.map((e) => {
        // List of all users
        return <UserComponent key={e._id} {...e} />;
      })}
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
      {friends.map((e, index) => {
        // List of all users
        return <FriendsComponent key={e._id} {...e} />;
      })}
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
      {friendRequests.map((e) => {
        // List of all users
        return <FriendRequestComponent key={e._id} id={e._id} {...e.sender} />;
      })}
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
        sx={{ overflowY: "scroll", maxHeight: "25rem" }}
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
