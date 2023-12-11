import { createUser } from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, avatar, activityStatus, password } =
      req.body;
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      avatar,
      activityStatus,
      password,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
