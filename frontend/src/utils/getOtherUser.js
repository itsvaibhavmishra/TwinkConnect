export const getOtherUser = (users, current_id) => {
  let chatElementProps = null;

  if (users.length > 1) {
    const otherUser = users.find((e) => e._id !== current_id);

    if (otherUser) {
      // Extract data for the other user
      const { _id, firstName, lastName, avatar } = otherUser;
      chatElementProps = { _id, firstName, lastName, avatar };
    }
  } else if (users.length === 1) {
    // If there's only one user in the conversation
    const singleUser = users[0];
    const { _id, firstName, lastName, avatar } = singleUser;
    chatElementProps = { _id, firstName, lastName, avatar };
  }

  return chatElementProps;
};
