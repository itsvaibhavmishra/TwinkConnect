import User from "../models/userModel.js";
import { filterObj } from "../utils/filterObj.js";

export const upadteProfile = async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const updated_user = await User.create(filteredBody);

  res.status(200).json({
    status: "success",
    data: updated_user,
    message: "Profile Updated",
  });
};
