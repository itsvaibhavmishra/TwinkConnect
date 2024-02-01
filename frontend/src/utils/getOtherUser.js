export const getOtherUser = (users, current_id, onlineFriends) => {
  let chatElementProps = null;

  if (!users || !current_id) {
    return null;
  }

  if (users.length > 1) {
    let otherUser = users.find((e) => e._id !== current_id);

    if (otherUser) {
      const isOnline = onlineFriends?.find(
        (friend) => friend._id === otherUser._id
      );

      if (isOnline) {
        otherUser = {
          ...otherUser,
          onlineStatus: isOnline.onlineStatus,
        };
      }
      // Extract data for the other user
      chatElementProps = otherUser;
    }
  } else if (users.length === 1) {
    // If there's only one user in the conversation
    const singleUser = users[0];
    chatElementProps = singleUser;
  }

  return chatElementProps;
};
