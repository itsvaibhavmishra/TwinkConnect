import validator from "validator";
import { UserModel } from "../models/index.js";

// search friends
export const searchForFriends = async (populatedFriends, keyword, page) => {
  const pageSize = 10; // maximum users to display at once
  let friends = [];
  let totalCount = 0;

  // Extract friend IDs for the search criteria
  const friendIds = populatedFriends.friends.map((friend) => friend._id);

  // Build the search criteria
  const searchCriteria = {
    _id: { $in: friendIds }, // Only search within the friends of the current user
  };

  if (validator.isEmail(keyword)) {
    // If the keyword is an email address, search by email
    searchCriteria.email = keyword;
  } else {
    // If the keyword is not an email, search by firstName or lastName
    const regex = new RegExp(keyword, "i"); // 'i' for case-insensitive
    searchCriteria.$or = [{ firstName: regex }, { lastName: regex }];
  }

  // Perform the search
  friends = await UserModel.find(searchCriteria)
    .select("_id firstName lastName email")
    .limit(pageSize)
    .skip(page * pageSize);

  // Get the total count for pagination
  totalCount = await UserModel.countDocuments(searchCriteria);

  return { friends, totalCount };
};
